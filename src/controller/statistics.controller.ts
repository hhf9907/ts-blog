import Koa from 'koa'
import httpStatusCode from '../constants/http.status'
import statisticsService from '../service/statistics.service'

class StatisticsController {
  async queryPvTopFive(ctx: Koa.Context, next: () => Promise<any>) {
    try {
      const result = await statisticsService.queryPvTopFive()
      if (result) {
        ctx.success(httpStatusCode.SUCCESS, result, '查询浏览量成功~')
      }
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '查询浏览量失败,请检查参数是否有误~')
    }
  }

  async queryLoginCount(ctx: Koa.Context, next: () => Promise<any>) {
    try {
      const result = await statisticsService.queryLoginCount()
      if (result) {
        ctx.success(httpStatusCode.SUCCESS, result, '查询近30天登录人数成功~')
      }
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '查询近30天登录人数失败~')
    }
  }

  
}

export default new StatisticsController()