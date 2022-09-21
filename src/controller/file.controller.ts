import Koa from 'koa'
import fs from 'fs'

import fileService from '../service/file.service'
import userService from '../service/user.service'
import httpStatusCode from '../constants/http.status'
import { appConfig } from '../app/config'
import filePath from '../constants/file-path'

import { getUploadToken } from '../qiniu/index'
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
        fileNames.push(
          `${appConfig.HOST}/file/files/${filename}`
        )
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
}

export default new FileController()
