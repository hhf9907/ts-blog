import Router from 'koa-router'
import Koa from 'koa'
import authController from '../controller/auth.controller'
import {
  verifyLogin,
  verifyRegister,
  verifyAuth,
  getTokenUserInfo,
  verifyMailCode,
  verifyResetMailCode
} from '../middleware/auth.middleware'

const authRouter = new Router<Koa.Context, any>()

authRouter.post('/login', verifyLogin, authController.login)
authRouter.post('/register', verifyRegister, authController.register)
authRouter.post('/sendEmailCode',getTokenUserInfo, authController.sendMailCode)
authRouter.post('/emailLogin', verifyMailCode, authController.login)

authRouter.post('/sendResetEmailCode',getTokenUserInfo, authController.sendResetMailCode)
authRouter.post('/resetPassword', verifyResetMailCode, authController.resetPassword)

authRouter.get('/test', verifyAuth, authController.success)
authRouter.get('/test1',getTokenUserInfo, authController.success)
// authRouter.routes()

module.exports = authRouter
