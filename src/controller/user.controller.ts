import Koa from 'koa'
import fs from 'fs'

import fileService from '../service/file.service'
import filePath from '../constants/file-path'
import userService from '../service/user.service'

import httpStatusCode from '../constants/http.status'

class UserController {
  // 获取用户信息
  async getUserInfo(ctx: Koa.Context, next: () => Promise<any>) {
    const { userId } = ctx.user
    const result = await userService.getUserById(userId)
    const userInfo = result[0]
    // 返回结果
    ctx.success(httpStatusCode.SUCCESS, result, '获取用户信息成功~')
  }

  // 获取用户信息
  async getUserInfoById(ctx: Koa.Context, next: () => Promise<any>) {
    const { userId } = ctx.params
    const loginUserId = ctx?.user?.userId
    const result = await userService.getUserById(userId, loginUserId)
    // 返回结果
    ctx.success(httpStatusCode.SUCCESS, result, '获取用户信息成功~')
  }

  // 修改用户信息
  async updateBaseInfo(ctx: Koa.Context, next: () => Promise<any>) {
    const { userId } = ctx.user
    const { nickname, homePage, notes } = ctx.request.body

    if(!nickname.trim() || !nickname ) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '昵称不能为空~')
      return 
    }

    try {
      // 返回结果
      const result = await userService.updateBaseInfo(
        userId,
        nickname,
        homePage,
        notes
      )
      if (result) {
        ctx.success(httpStatusCode.SUCCESS, null, '修改用户信息成功~')
      }
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '修改用户信息失败~')
    }
  }

  // 修改用户信息
  async updateAccountInfo(ctx: Koa.Context, next: () => Promise<any>) {
    const { userId } = ctx.user
    const { phone, email } = ctx.request.body

    try {
      // 返回结果
      const result = await userService.updateAccountInfo(
        userId,
        phone, email
      )
      if (result) {
        ctx.success(httpStatusCode.SUCCESS, null, '修改用户信息成功~')
      }
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '修改用户信息失败~')
    }
  }

  // 获取头像信息
  async avatarInfo(ctx: Koa.Context, next: () => Promise<any>) {
    const { userId } = ctx.params

    const avatarInfo = await fileService.getAvatarByUserId(userId)

    // 提供图像信息
    ctx.response.set('content-type', avatarInfo.mimetype) // 设置文件类型
    ctx.body = fs.createReadStream(
      `${filePath.AVATAR_PATH}/${avatarInfo.filename}`
    )
  }

  // 关注用户
  async concernUser(ctx: Koa.Context, next: () => Promise<any>) {
    const { fromUserId } = ctx.params
    const { userId } = ctx.user
    if (userId.trim() === fromUserId.trim()) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '您不能关注自己哦~')
      return
    }
    try {
      const data = await userService.concernUser(userId, fromUserId)

      if (data) {
        ctx.success(httpStatusCode.SUCCESS, null, '关注成功~')
      }
    } catch (error) {
      if (error === false) {
        ctx.error(httpStatusCode.PARAMETER_ERROR, null, '您已经关注该用户~')
      } else {
        ctx.error(httpStatusCode.PARAMETER_ERROR, null, '关注失败~')
      }
    }
  }

  // 取消用户
  async cancelConcernUser(ctx: Koa.Context, next: () => Promise<any>) {
    const { fromUserId } = ctx.params
    const { userId } = ctx.user

    try {
      const data = await userService.deleteConcernUser(userId, fromUserId)

      if (data) {
        ctx.success(httpStatusCode.SUCCESS, null, '取消关注成功~')
      }
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '取消关注失败~')
    }
  }

  // 获取头像信息
  async queryConcernAndFans(ctx: Koa.Context, next: () => Promise<any>) {
    const { userId } = ctx.user
    const data = await userService.queryConcernAndFans(userId)
    ctx.success(httpStatusCode.SUCCESS, data, '查询关注与粉丝数成功~')
  }

  async queryConcernList(ctx: Koa.Context, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const { userId, pageNum } = ctx.request.query
    const loginUserId = ctx?.user?.userId
    try {
      const postList = await userService.queryConcernList(
        userId+'',
        Number(pageNum),
        loginUserId
      )
      ctx.success(httpStatusCode.SUCCESS, postList, '关注列表成功~')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '获取关注列表失败,请检查参数是否有误~')
    }
  }

  async queryFansList(ctx: Koa.Context, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const { userId, pageNum } = ctx.request.query
    const loginUserId = ctx?.user?.userId
    try {
      const postList = await userService.queryFansList(
        userId+'',
        Number(pageNum),
        loginUserId
      )
      ctx.success(httpStatusCode.SUCCESS, postList, '关注列表成功~')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '获取关注列表失败,请检查参数是否有误~')
    }
  }
  
}

export default new UserController()
