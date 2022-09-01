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
      data: result,
      msg: '获取用户信息成功~'
    }
  }

  // 获取用户信息
  async getUserInfoById(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { userId } = ctx.params
    const result = await userService.getUserById(userId)
    // 返回结果
    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: result,
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

  // 关注用户
  async concernUser(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { fromUserId } = ctx.params
    const { userId } = ctx.user
    if (userId === fromUserId) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '您不能关注自己哦~'
      }
    }
    try {
      const data = await userService.concernUser(userId, fromUserId)

      if (data) {
        ctx.body = {
          code: httpStatusCode.SUCCESS,
          data: null,
          msg: '关注成功~'
        }
      }
    } catch (error) {
      if (error === false) {
        ctx.body = {
          code: httpStatusCode.PARAMETER_ERROR,
          data: null,
          msg: '您已经关注该用户~'
        }
      } else {
        ctx.body = {
          code: httpStatusCode.PARAMETER_ERROR,
          data: null,
          msg: '关注失败~'
        }
      }
    }
  }

  // 取消用户
  async cancelConcernUser(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { fromUserId } = ctx.params
    const { userId } = ctx.user

    try {
      const data = await userService.deleteConcernUser(userId, fromUserId)

      if (data) {
        ctx.body = {
          code: httpStatusCode.SUCCESS,
          data: null,
          msg: '取消关注成功~'
        }
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '取消关注失败~'
      }
    }
  }

  // 获取头像信息
  async queryConcernAndFans(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { userId } = ctx.user
    const data = await userService.queryConcernAndFans(userId)
    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: data,
      msg: '查询关注与粉丝数成功~'
    }
  }
}

export default new UserController()
