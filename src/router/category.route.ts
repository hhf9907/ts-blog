import Router from 'koa-router'
import Koa from 'koa'
import { verifyAuth,getTokenUserInfo } from '../middleware/auth.middleware'
import categoryController from '../controller/category.controller'

const categoryRouter = new Router<Koa.Context, any>({
  prefix: '/category'
})

categoryRouter.post('/create', verifyAuth, categoryController.createCategory)
categoryRouter.get(
  '/getAllCategory',
  getTokenUserInfo,
  categoryController.getAllCategory
)

module.exports = categoryRouter
