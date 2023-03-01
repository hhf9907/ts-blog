import Router from 'koa-router'
import Koa from 'koa'
import { verifyAuth, getTokenUserInfo } from '../middleware/auth.middleware'
import userController from '../controller/user.controller'

const userRouter = new Router<Koa.Context, any>({
  prefix: '/user'
})

// 获取用户头像
userRouter.get('/:userId/avatar', userController.avatarInfo)

// 查询当前登录用户的信息
userRouter.get('/info', verifyAuth, userController.getUserInfo)

// 根据userId查询信息
userRouter.get('/getUserInfo/:userId', getTokenUserInfo, userController.getUserInfoById)

// 关注
userRouter.post('/concern/:fromUserId', verifyAuth, userController.concernUser)

// 取消关注
userRouter.post('/cancelConcern/:fromUserId', verifyAuth, userController.cancelConcernUser)

// 修改基础信息
userRouter.put('/updateBaseInfo', verifyAuth, userController.updateBaseInfo)

// 修改账户绑定信息
userRouter.put('/updateAccountInfo', verifyAuth, userController.updateAccountInfo)

// 查询关注和粉丝数
userRouter.get('/queryConcernAndFans', verifyAuth, userController.queryConcernAndFans)

// 查询关注列表
userRouter.get('/queryConcernList', getTokenUserInfo, userController.queryConcernList)

// 查询粉丝列表
userRouter.get('/queryFansList', getTokenUserInfo, userController.queryFansList)

module.exports = userRouter
