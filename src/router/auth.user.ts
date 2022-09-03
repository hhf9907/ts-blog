import Router from 'koa-router'

import authController from '../controller/auth.controller'
import {
  verifyLogin,
  verifyRegister,
  verifyAuth,
  verifyMailCode,
  verifyResetMailCode
} from '../middleware/auth.middleware'

const authRouter = new Router()

authRouter.post('/login', verifyLogin, authController.login)
authRouter.post('/register', verifyRegister, authController.register)
authRouter.post('/sendEmailCode', authController.sendMailCode)
authRouter.post('/emailLogin', verifyMailCode, authController.login)

authRouter.post('/sendResetEmailCode', authController.sendResetMailCode)
authRouter.post('/resetPassword', verifyResetMailCode, authController.resetPassword)

authRouter.get('/test', verifyAuth, authController.success)
authRouter.get('/test1', authController.success)
// authRouter.routes()

module.exports = authRouter
