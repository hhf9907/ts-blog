import Router from 'koa-router'
import Koa from 'koa'
const multiparty = require('koa2-multiparty');

import { verifyAuth } from '../middleware/auth.middleware'
import {
  avatarHandler,
  pictureResize,
  pictureHandler
} from '../middleware/file.middleware'
import fileController from '../controller/file.controller'

const uploadRouter = new Router<Koa.Context, any>()

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

uploadRouter.get(
  '/upload/getUploadToken',
  verifyAuth,
  fileController.getUploadToken
)

uploadRouter.get('/upload/fileChunk', multiparty(), fileController.validationFileChunk)

uploadRouter.post('/upload/fileChunk', multiparty(), fileController.handleFileChunk)

uploadRouter.post('/upload/chunkMerge', multiparty(), fileController.handleFileChunkMerge)

module.exports = uploadRouter
