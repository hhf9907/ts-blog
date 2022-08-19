import Router from 'koa-router'
const uploadRouter = new Router({
  prefix: '/upload'
})

const { verifyAuth } = require('../middleware/auth.middleware')
const {
  avatarHandler
} = require('../middleware/file.middleware')

const { saveAvatarInfo } = require('../controller/file.controller')


uploadRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)


module.exports = uploadRouter
