import Koa from 'koa'

const jwt = require('jsonwebtoken')
import { PRIVATE_KEY } from '../app/config'
import httpStatusCode from '../constants/http.status'
import codeManager from '../sms/codeManage'
import { sendMail, sendResetPwdMail } from '../sms/sendEmail'
class AuthController {
  async login(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { id: userId, name, nickname, avatar, notes, status, type } = ctx.user
    const token = jwt.sign({ userId, name, type }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 10,
      algorithm: 'RS256'
    })

    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: { userId, status, type, name, nickname, avatar, notes, token },
      msg: '登陆成功'
    }
  }

  async register(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: null,
      msg: '用户注册成功'
    }
  }

  async sendMailCode(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { email } = ctx.request.body

    const { code, token } = codeManager.generate(email)

    try {
      await sendMail(email, code)
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: {
          token
        },
        msg: '发送验证码成功'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: {
          token
        },
        msg: '发送验证码失败'
      }
    }
  }

  async sendResetMailCode(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { email } = ctx.request.body

    const { code, token } = codeManager.generate(email)

    try {
      await sendResetPwdMail(email, code)
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: {
          token
        },
        msg: '发送验证码成功'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: {
          token
        },
        msg: '发送验证码失败'
      }
    }
  }

  async emailLogin(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { id: userId, name, nickname, avatar, notes, status, type } = ctx.user
    const token = jwt.sign({ userId, name, type }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 10,
      algorithm: 'RS256'
    })

    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: { userId, status, type, name, nickname, avatar, notes, token },
      msg: '登陆成功'
    }
  }

  async resetPassword(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: null,
      msg: '密码重置成功'
    }
  }

  async success(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    ctx.body = '授权成功jenkins~'
  }
}

export default new AuthController()
