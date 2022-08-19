import Koa from 'koa'

const jwt = require('jsonwebtoken')

const { PUBLIC_KEY } = require('../app/config')
import authService from '../service/auth.service'
import userService from '../service/user.service'
import { md5password, generateUserId } from '../utils/password-handle'
import errorTypes from '../constants/error-types'

const verifyLogin = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<any>
) => {
  console.log('验证登录的middleware~')

  // 1.获取用户名和密码
  const { name, password } = ctx.request.body
  console.log(name, password)
  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户是否存在的
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  // 4.判断密码是否和数据库中的密码是一致(加密)
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', error, ctx)
  }

  // 5. 登录成功修改登录时间
  await userService.updateLoginTime(user.id)

  ctx.user = user

  await next()
}

// 注册用户
const verifyRegister = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<any>
) => {
  console.log('验证注册的middleware~')

  // 1.获取用户名和密码
  const { name, password } = ctx.request.body
  console.log(name, password)
  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户是否存在的
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (user) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  // 4.注册账号
  const userInfo = {
    userId: generateUserId(),
    name,
    password: md5password(password)
  }

  const reg_result = await userService.create(userInfo)
  ctx.user = user
  await next()
}

const verifyAuth = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<any>
) => {
  console.log('验证授权的middleware~')
  // 1.获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization

  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

/**
 * 1.很多的内容都需要验证权限: 修改/删除动态, 修改/删除评论
 * 2.接口: 业务接口系统/后端管理系统
 *  一对一: user -> role
 *  多对多: role -> menu(删除动态/修改动态)
 */
const verifyPermission = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<any>
) => {
  console.log('验证权限的middleware~')
  // 1.获取参数 { commentId: '1' }
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  const { id } = ctx.user

  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkResource(
      tableName,
      resourceId,
      id
    )
    if (!isPermission) throw new Error()
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
}

// const verifyPermission = (tableName) => {
//   return async (ctx, next) => {
//     console.log("验证权限的middleware~");

//     // 1.获取参数
//     const { momentId } = ctx.params;
//     const { id } = ctx.user;

//     // 2.查询是否具备权限
//     try {
//       const isPermission = await authService.checkResource(tableName, momentId, id);
//       if (!isPermission) throw new Error();
//       await next();
//     } catch (err) {
//       const error = new Error(errorTypes.UNPERMISSION);
//       return ctx.app.emit('error', error, ctx);
//     }
//   }
// }

module.exports = {
  verifyLogin,
  verifyRegister,
  verifyAuth,
  verifyPermission
}
