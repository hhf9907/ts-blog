import Koa from 'koa'
import Jimp from 'jimp'

const path = require('path')
const Multer = require('koa-multer');

import filePath from '../constants/file-path'

const avatarUpload = Multer({
  dest: filePath.AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar');

const pictureUpload = Multer({
  dest: filePath.PICTURE_PATH
})
const pictureHandler = pictureUpload.array('picture', 9);

const pictureResize = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<any>
) => {
  try {
    // 1.获取所有的图像信息
    const files = ctx.req.files

    // 2.对图像进行处理(sharp/jimp)
    const imgTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
    for (let file of files) {
      if (imgTypes.includes(file.mimetype)) {
        const destPath = path.join(file.destination, file.filename)
        try {
          const image = await Jimp.read(file.path)
          image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
          image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
          image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
        } catch (error) {
          continue
        }
      }
    }

    await next()
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}