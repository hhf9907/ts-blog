import Koa from 'koa'
import fs from 'fs'

import fileService from '../service/file.service'
import userService from '../service/user.service'
import httpStatusCode from '../constants/http.status'
import { appConfig } from '../app/config'
import filePath from '../constants/file-path'
class FileController {
  async saveAvatarInfo(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // 1.获取图像相关的信息
    const { filename, mimetype, size } = ctx.req.file
    
    const { userId } = ctx.user

    // 2.将图像信息数据保存到数据库中
    await fileService.createAvatar(filename, mimetype, size, userId)

    // 3.将图片地址保存到user表中
    const avatarUrl = `${appConfig.HOST}:${appConfig.PORT}/user/${userId}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, userId)

    // 4.返回结果
    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: avatarUrl,
      msg: '头像上传成功~'
    }
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
          `${appConfig.HOST}:${appConfig.PORT}/file/files/${filename}`
        )
      }

      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: fileNames,
        msg: '图片上传成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '图片上传失败~'
      }
    }
  }

  async fileInfo(ctx: Koa.DefaultContext, next: () => Promise<any>) {
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
}

export default new FileController()
