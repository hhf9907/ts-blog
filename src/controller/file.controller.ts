import Koa from 'koa'
import fs from 'fs'

const multiparty = require('multiparty')
const path = require('path')
const fse = require('fs-extra')
const url = require('url')

import fileService from '../service/file.service'
import userService from '../service/user.service'
import httpStatusCode from '../constants/http.status'
import { appConfig } from '../app/config'
import filePath from '../constants/file-path'

import { getUploadToken } from '../qiniu/index'

const extractExt = (filename: any) =>
  filename.slice(filename.lastIndexOf('.'), filename.length) // 提取后缀名

const UPLOAD_CHUNK = path.resolve(__dirname, '../..', 'uploads/chunk-file') // 大文件存储目录
const UPLOAD_DIR = path.resolve(__dirname, '../..', 'uploads/merge-file') // 大文件存储目录

const pipeStream = (path: string, writeStream: any) =>
  new Promise((resolve: Function) => {
    const readStream = fse.createReadStream(path)
    readStream.on('end', () => {
      fse.unlinkSync(path)
      resolve()
    })
    readStream.pipe(writeStream)
  })

// 合并切片
/**
 *
 * @param {*} filePath 文件目录
 * @param {*} fileHash identifier值
 * @param {*} size 切片的个数
 */
const mergeFileChunk = async (filePath: string, fileHash: string, size: any) => {
  const chunkDir = path.resolve(UPLOAD_CHUNK, fileHash)
  const fileDir = path.resolve(UPLOAD_DIR, fileHash)
  const chunkPaths = await fse.readdir(chunkDir)

  // 目录不存在，创建文件目录
  if (!fse.existsSync(fileDir)) {
    await fse.mkdirs(fileDir)
  }
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a: any, b: any) => a - b)
  await Promise.all(
    chunkPaths.map((chunkPath: string, index: number) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    )
  )
  fse.rmdirSync(chunkDir) // 合并后删除保存切片的目录
}

class FileController {
  async saveAvatarInfo(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // 1.获取图像相关的信息
    const { filename, mimetype, size } = ctx.req.file

    const { userId } = ctx.user

    // 2.将图像信息数据保存到数据库中
    await fileService.createAvatar(filename, mimetype, size, userId)

    // 3.将图片地址保存到user表中
    const avatarUrl = `${appConfig.HOST}/user/${userId}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, userId)

    // 4.返回结果
    ctx.success(httpStatusCode.SUCCESS, avatarUrl, '头像上传成功~')
  }

  // 获取头像信息
  async avatarInfo(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)

    // 提供图像信息
    ctx.response.set('content-type', avatarInfo.mimetype) // 设置文件类型
    ctx.body = fs.createReadStream(
      `${filePath.AVATAR_PATH}/${avatarInfo.filename}`
    )
  }

  // 保存图像相关信息
  async savePictureInfo(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // 1.获取图像信息
    const files = ctx.req.files
    const fileNames = []
    const { userId } = ctx.user
    // 2.将所有的文件信息保存到数据库中
    try {
      for (let file of files) {
        const { filename, mimetype, size } = file
        await fileService.createFile(filename, mimetype, size, userId)
        fileNames.push(`${appConfig.HOST}/file/files/${filename}`)
      }

      ctx.success(httpStatusCode.SUCCESS, fileNames, '图片上传成功~')
    } catch (error) {
      console.log('error')
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '图片上传失败~')
    }
  }

  async fileInfo(ctx: Koa.Context, next: () => Promise<any>) {
    let { filename } = ctx.params
    const fileInfo = await fileService.getFileByFilename(filename)
    const { type } = ctx.query
    const types = ['small', 'middle', 'large']
    if (types.some((item) => item === type)) {
      filename = filename + '-' + type
    }

    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${filePath.PICTURE_PATH}/${filename}`)
  }

  async getUploadToken(ctx: Koa.Context, next: () => Promise<any>) {
    const qiniuToken = await getUploadToken()

    try {
      ctx.success(httpStatusCode.SUCCESS, qiniuToken, '获取七牛云token成功~')
    } catch (error) {
      console.log('error')
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '获取七牛云token失败~')
    }
  }

  async handleFileChunk(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { headers } = ctx.request
    const files = ctx.req.files
    const fields = ctx.req.body
    // console.log(files.file, fields.identifier, fields.filename)
    const chunk = files.file
    const hash = fields.identifier
    const chunkfilename = fields.chunkNumber
    const filename = fields.filename
    const chunkNumber = fields.chunkNumber
    const totalChunks = fields.totalChunks

    // console.log('handleFileChunk -> filename', filename)
    const filePath = path.resolve(UPLOAD_DIR, `${hash}/${filename}`)
    const chunkDir = path.resolve(UPLOAD_CHUNK, hash)

    // 文件存在直接返回
    if (fse.existsSync(filePath)) {
      ctx.body = {
        code: 201,
        data: {
          presence: true,
          identifier: hash,
          url:  `http://${headers.host}/target/${hash}/${filename}`,
        },
        msg: '文件已存在~'
      }
    }

    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    }
    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    try {
      await fse.move(chunk.path, path.resolve(chunkDir, chunkfilename))
    } catch (error) {
      console.log('handleFileChunk -> error', error)
    }

    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: {
        needMerge: totalChunks === chunkNumber,
        identifier: hash
      },
      msg: 'success~'
    }
  }

  async validationFileChunk(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    console.log('validationFileChunk')
    const { identifier, filename } = ctx.request.query
    const { headers } = ctx.request

    const filePath = path.resolve(UPLOAD_DIR, `${identifier}/${filename}`)
    const chunkDir = path.resolve(UPLOAD_CHUNK, identifier)

    let chunkPaths = []
    try {
      chunkPaths = await fse.readdir(chunkDir)
    } catch (error) {}

    if (fse.existsSync(filePath)) {
      console.log(UPLOAD_CHUNK)
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: {
          presence: true,
          identifier: identifier,
          url: `http://${headers.host}/merge-file/${identifier}/${filename}`,
          uploadedChunks: chunkPaths
        },
        msg: 'success~'
      }
    } else {
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: {
          presence: false,
          identifier: identifier,
          uploadedChunks: chunkPaths
        },
        msg: 'success~'
      }
    }
  }
  async handleFileChunkMerge(
    ctx: Koa.DefaultContext,
    next: () => Promise<any>
  ) {
    const data = ctx.request.body
    const { identifier, filename, fileChunkNum } = data
    const { headers } = ctx.request
    console.log(identifier, filename, fileChunkNum)
    // const ext = extractExt(fileName)
    const filePath = path.resolve(UPLOAD_DIR, `${identifier}/${filename}`)
    console.log(filePath)
    await mergeFileChunk(filePath, identifier, fileChunkNum)
    ctx.success(
      httpStatusCode.SUCCESS,
      {
        url: `http://${headers.host}/merge-file/${identifier}/${filename}`
      },
      '合并成功~'
    )
  }
}

export default new FileController()
