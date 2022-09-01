import Router from 'koa-router'

import { verifyAuth } from '../middleware/auth.middleware'
import userController from '../controller/user.controller'

const userRouter = new Router({
  prefix: '/user'
})

// 获取用户头像
userRouter.get('/:userId/avatar', userController.avatarInfo)

userRouter.get('/info', verifyAuth, userController.getUserInfo)

userRouter.get('/getUserInfo/:userId', userController.getUserInfoById)

userRouter.post('/concern/:fromUserId', verifyAuth, userController.concernUser)

userRouter.post('/cancelConcern/:fromUserId', verifyAuth, userController.cancelConcernUser)


userRouter.get('/queryConcernAndFans', verifyAuth, userController.queryConcernAndFans)

module.exports = userRouter
