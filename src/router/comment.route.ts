import Router from 'koa-router'
import Koa from 'koa'
import commentController from '../controller/comment.controller'
import { verifyPermission, verifyAuth,getTokenUserInfo } from '../middleware/auth.middleware'

const commentRouter = new Router<Koa.Context, any>({
  prefix: '/comment'
})

commentRouter.post('/createComment', verifyAuth, commentController.commentPost)
commentRouter.post(
  '/createReplyComment',
  verifyAuth,
  commentController.replyCommentPost
)
commentRouter.delete(
  '/deleteReplyComment/:comment_replyId',
  verifyAuth,
  verifyPermission,
  commentController.deleteReplyComment
)
commentRouter.delete(
  '/deleteComment/:commentId',
  verifyAuth,
  verifyPermission,
  commentController.deleteComment
)
commentRouter.get('/queryComment', getTokenUserInfo, commentController.queryComment) // 获取评论不需要登录

module.exports = commentRouter
