import Router from 'koa-router'

const commentRouter = new Router({
  prefix: '/comment'
})

const {
  commentPost,
  replyCommentPost,
  queryComment
} = require('../controller/comment.controller')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

commentRouter.post('/createComment', verifyAuth, commentPost)
commentRouter.post('/createReplyComment', verifyAuth, replyCommentPost)
commentRouter.get('/queryComment', verifyAuth, queryComment)

module.exports = commentRouter
