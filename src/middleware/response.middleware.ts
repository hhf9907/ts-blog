import * as Koa from 'koa'
import httpStatusCode from '../constants/http.status'

export type TSuccess = (
  code: httpStatusCode,
  data?: any,
  msg?: string
) => void
export type TError = (
  code: httpStatusCode,
  data?: any,
  msg?: string | '参数有误',
  status?: number
) => void

const koaResponse = async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.success = (
    code = httpStatusCode.SUCCESS,
    data = null,
    msg= 'success'
  ) => {
    ctx.status = 200
    ctx.body = {
      code,
      data,
      msg
    }
  }

  ctx.error = (
    code = httpStatusCode.PARAMETER_ERROR,
    data = null,
    msg = '参数有误，请检查参数',
    status = httpStatusCode.SUCCESS
  ) => {
    ctx.status = status
    ctx.body = {
      code,
      msg,
      data
    }
  }

  await next()
}

export default koaResponse
