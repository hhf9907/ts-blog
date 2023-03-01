import Router from 'koa-router'
import Koa from 'koa'
import statisticsController from '../controller/statistics.controller'
import { verifyPermission, verifyAuth } from '../middleware/auth.middleware'

const statisticsRouter = new Router<Koa.Context, any>({
  prefix: '/statistics'
})

statisticsRouter.get('/queryPvTopFive', statisticsController.queryPvTopFive)

statisticsRouter.get('/queryLoginCount', statisticsController.queryLoginCount)

module.exports = statisticsRouter