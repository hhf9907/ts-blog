import Koa from 'koa'

const jwt = require('jsonwebtoken')
import { PRIVATE_KEY } from '../app/config'
import httpStatusCode from '../constants/http.status'

class AuthController {
  async login(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { user_id, name, avatar, notes } = ctx.user
    const token = jwt.sign({ user_id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    ctx.body = { user_id, name, avatar, notes, token }
  }

  async register(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    ctx.body = {
      code: httpStatusCode.SUCCESS,
      data: null,
      msg: '用户注册成功'
    }
  }

  async success(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    ctx.body = '授权成功~'
  }
}

module.exports = new AuthController()
