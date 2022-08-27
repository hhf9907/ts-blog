import Router from 'koa-router'

import postController from '../controller/post.controller'
import { verifyPermission, verifyAuth } from '../middleware/auth.middleware'

const postRouter = new Router({
  prefix: '/post'
})

postRouter.post('/create', verifyAuth, postController.createPost)
postRouter.put(
  '/update/:postId',
  verifyAuth,
  verifyPermission,
  postController.updatePost
)
postRouter.get('/getPostById/:postId', postController.getPost)
postRouter.get('/list', postController.getPostList)
postRouter.delete(
  '/:postId',
  verifyAuth,
  verifyPermission,
  postController.deletePost
)
module.exports = postRouter
