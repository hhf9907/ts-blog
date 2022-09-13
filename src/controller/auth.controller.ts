import Koa from 'koa'

const jwt = require('jsonwebtoken')
import { PRIVATE_KEY } from '../app/config'
import httpStatusCode from '../constants/http.status'
import codeManager from '../sms/codeManage'
import { sendMail, sendResetPwdMail } from '../sms/sendEmail'
class AuthController {
  async login(ctx: Koa.Context, next: () => Promise<any>) {
    const { id: userId, name, nickname, avatar, notes, status, type } = ctx.user
    const token = jwt.sign({ userId, name, type }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 10,
      algorithm: 'RS256'
    })

    const data = { userId, status, type, name, nickname, avatar, notes, token }
    ctx.success(httpStatusCode.SUCCESS, data, '登陆成功')
  }

  async register(ctx: Koa.Context, next: () => Promise<any>) {
    ctx.success(httpStatusCode.SUCCESS, null, '用户注册成功')
  }

  async sendMailCode(ctx: Koa.Context, next: () => Promise<any>) {
    const { email } = ctx.request.body

    const { code, token } = codeManager.generate(email)

    try {
      await sendMail(email, code)
      ctx.success(httpStatusCode.SUCCESS, { token }, '发送验证码成功')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '发送验证码失败')
    }
  }

  async sendResetMailCode(ctx: Koa.Context, next: () => Promise<any>) {
    const { email } = ctx.request.body

    const { code, token } = codeManager.generate(email)

    try {
      await sendResetPwdMail(email, code)
      ctx.success(httpStatusCode.SUCCESS, { token }, '发送验证码成功')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '发送验证码失败')
    }
  }

  async emailLogin(ctx: Koa.Context, next: () => Promise<any>) {
    const { id: userId, name, nickname, avatar, notes, status, type } = ctx.user
    const token = jwt.sign({ userId, name, type }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 10,
      algorithm: 'RS256'
    })

    const data =  { userId, status, type, name, nickname, avatar, notes, token }
    ctx.success(httpStatusCode.SUCCESS, data, '登陆成功')
  }

  async resetPassword(ctx: Koa.Context, next: () => Promise<any>) {
    ctx.success(httpStatusCode.SUCCESS, null, '密码重置成功')
  }

  async success(ctx: Koa.Context, next: () => Promise<any>) {
    ctx.body = '授权成功jenkins哈哈哈哈哈~'
  }
}

export default new AuthController()
