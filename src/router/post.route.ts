import Router from 'koa-router'

const postRouter = new Router({
  prefix: '/post'
})

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPostList
} = require('../controller/post.controller')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

postRouter.post('/create', verifyAuth, createPost)
postRouter.put('/update', verifyAuth, verifyPermission, updatePost)
postRouter.get('/getPostById/:postId', getPost)
postRouter.get('/list', getPostList)
postRouter.delete('/:postId', verifyAuth, verifyPermission, deletePost)
module.exports = postRouter