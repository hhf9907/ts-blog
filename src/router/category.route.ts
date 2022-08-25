import Router from 'koa-router'

import { verifyAuth } from '../middleware/auth.middleware'
import categoryController from '../controller/category.controller'

const categoryRouter = new Router({
  prefix: '/category'
})

categoryRouter.post('/create', verifyAuth, categoryController.createCategory)
categoryRouter.get(
  '/getAllCategory',
  verifyAuth,
  categoryController.getAllCategory
)

module.exports = categoryRouter
