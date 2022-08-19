import Router from 'koa-router'
const userRouter = new Router({
  prefix: '/user'
})

const { verifyAuth } = require('../middleware/auth.middleware')

const { avatarInfo, getUserInfo } = require('../controller/user.controller')

// 获取用户头像
userRouter.get('/:userId/avatar', avatarInfo)

userRouter.get('/info', verifyAuth, getUserInfo)

module.exports = userRouter
