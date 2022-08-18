const Router = require('koa-router')
const authRouter = new Router()

const { login, success, register } = require('../controller/auth.controller')
const {
  verifyLogin,
  verifyRegister,
  verifyAuth
} = require('../middleware/auth.middleware')

authRouter.post('/login', verifyLogin, login)
authRouter.post('/register', verifyRegister, register)
authRouter.get('/test', verifyAuth, success)
authRouter.routes()

module.exports = authRouter
