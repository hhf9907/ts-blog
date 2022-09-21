import Router from 'koa-router'

import { verifyAuth } from '../middleware/auth.middleware'
import {
  avatarHandler,
  pictureResize,
  pictureHandler
} from '../middleware/file.middleware'
import fileController from '../controller/file.controller'

const uploadRouter = new Router()

uploadRouter.post(
  '/upload/avatar',
  verifyAuth,
  avatarHandler,
  fileController.saveAvatarInfo
)
uploadRouter.post(
  '/upload/picture',
  verifyAuth,
  pictureHandler,
  pictureResize,
  fileController.savePictureInfo
)
// 动态配图的服务
uploadRouter.get('/file/files/:filename', fileController.fileInfo)

uploadRouter.get('/upload/getUploadToken', verifyAuth, fileController.getUploadToken)

module.exports = uploadRouter
