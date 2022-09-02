import Koa from 'koa'
import codeManager from '../sms/codeManage'
import errorTypes from '../constants/error-types'
import userService from '../service/user.service'
import userStatus from '../constants/user.status'
import userTypes from '../constants/user.type'

const verifyMailCode = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<any>
) => {
  console.log('验证邮箱登录的middleware')

  // 1.获取所有信息
  const { email, code, token } = ctx.request.body

  // 2.判断用户是否存在的
  const result = await userService.getUserByEmail(email)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.验证 验证码
  const bool = codeManager.verify(email, code, token)

  if (bool) {
    // 4.判断用户状态是否正常
    if (user.status !== userStatus.NORMAL) {
      const error = new Error(errorTypes.USER_ERROR)
      const msg =
        user.status === userStatus.FREEZE
          ? '当前用户已被冻结,请联系管理人员解封~'
          : '当前用户已被永久封号~'
      return ctx.app.emit('error', error, ctx, msg)
    }

    // 5. 登录成功修改登录时间
    await userService.updateLoginTime(user.id)

    ctx.user = user

    await next()
  } else {
    const error = new Error(errorTypes.PARAMS_IS_REQUIRED)
    ctx.app.emit('error', error, ctx, '验证码错误')
  }
}

export {
  verifyMailCode
}