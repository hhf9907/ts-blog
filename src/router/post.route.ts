import Router from 'koa-router'
import Koa from 'koa'
import postController from '../controller/post.controller'
import { verifyPermission, verifyAuth, getTokenUserInfo } from '../middleware/auth.middleware'

const postRouter = new Router<Koa.Context, any>({
  prefix: '/post'
})

postRouter.post('/create', verifyAuth, postController.createPost)
postRouter.put(
  '/update/:postId',
  verifyAuth,
  verifyPermission,
  postController.updatePost
)
postRouter.get('/getPostById/:postId', getTokenUserInfo, postController.getPost)
postRouter.get('/list', getTokenUserInfo, postController.getPostList)
postRouter.get('/getPostListByUserId',getTokenUserInfo, postController.queryPostListByUserId)
postRouter.get('/getPostListByCollections',getTokenUserInfo, postController.queryPostListByCollections)

postRouter.delete(
  '/:postId',
  verifyAuth,
  verifyPermission,
  postController.deletePost
)
postRouter.get(
  '/getPostPvTotal',
  postController.getPostPvTotal
)
postRouter.post(
  '/collect/:postId',
  verifyAuth,
  postController.collectPost
)
postRouter.post(
  '/cancelCollect/:postId',
  verifyAuth,
  postController.cancelCollectPost
)

module.exports = postRouter
