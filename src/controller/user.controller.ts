import Koa from 'koa'
import fs from 'fs'

import fileService from '../service/file.service'
import filePath from '../constants/file-path'
import userService from '../service/user.service'

import httpStatusCode from '../constants/http.status'

class UserController {
  // 获取用户信息
  async getUserInfo(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { userId } = ctx.user
    const result = await userService.getUserById(userId)
    const userInfo = result[0]
    // 返回结果
    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: {
        userId: userInfo.id,
        name: userInfo.name,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        notes: userInfo.notes,
        phone: userInfo.phone,
        email: userInfo.email,
        concerns: userInfo.concerns
      },
      msg: '获取用户信息成功~'
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
}

export default new UserController()
