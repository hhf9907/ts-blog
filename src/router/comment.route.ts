import Router from 'koa-router'

const commentRouter = new Router({
  prefix: '/comment'
})

const {
  commentPost,
  replyCommentPost,
  queryComment,
  deleteReplyComment,
  deleteComment
} = require('../controller/comment.controller')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

commentRouter.post('/createComment', verifyAuth, commentPost)
commentRouter.post('/createReplyComment', verifyAuth, replyCommentPost)
commentRouter.delete(
  '/deleteReplyComment/:comment_replyId',
  verifyAuth,
  verifyPermission,
  deleteReplyComment
)
commentRouter.delete(
  '/deleteComment/:commentId',
  verifyAuth,
  verifyPermission,
  deleteComment
)
commentRouter.get('/queryComment', queryComment) // 获取评论不需要登录

module.exports = commentRouter
