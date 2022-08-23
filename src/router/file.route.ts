import Router from 'koa-router'
const uploadRouter = new Router()

const { verifyAuth } = require('../middleware/auth.middleware')
const {
  avatarHandler,
  pictureResize,
  pictureHandler
} = require('../middleware/file.middleware')

const {
  saveAvatarInfo,
  savePictureInfo,
  fileInfo
} = require('../controller/file.controller')


uploadRouter.post('/upload/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
uploadRouter.post(
  '/upload/picture',
  verifyAuth,
  pictureHandler,
  pictureResize,
  savePictureInfo
)
// 动态配图的服务
uploadRouter.get('/file/files/:filename', fileInfo)

module.exports = uploadRouter
