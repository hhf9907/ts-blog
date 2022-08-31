import Router from 'koa-router'

import { verifyAuth } from '../middleware/auth.middleware'
import userController from '../controller/user.controller'

const userRouter = new Router({
  prefix: '/user'
})

// 获取用户头像
userRouter.get('/:userId/avatar', userController.avatarInfo)

userRouter.get('/info', verifyAuth, userController.getUserInfo)

userRouter.post('/concern/:fromUserId', verifyAuth, userController.concernUser)

userRouter.get('/queryConcernAndFans', verifyAuth, userController.queryConcernAndFans)

module.exports = userRouter
