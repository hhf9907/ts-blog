import Router from 'koa-router'
const categoryRouter = new Router({
  prefix: '/category'
})

const { verifyAuth } = require('../middleware/auth.middleware')

const {
  createCategory,
  getAllCategory
} = require('../controller/category.controller')

categoryRouter.post('/create', verifyAuth, createCategory)
categoryRouter.get('/getAllCategory', verifyAuth, getAllCategory)

module.exports = categoryRouter
