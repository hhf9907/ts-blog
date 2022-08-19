
import errorTypes from '../constants/error-types'
import httpStatusCode from '../constants/http.status'
import Koa from 'koa'

const errorHandler = (error: any, ctx: Koa.Context) => {
  let status, message

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = httpStatusCode.PARAMETER_ERROR // Bad Request
      message = '用户名或者密码不能为空~'
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409 // conflict
      message = '用户名已经存在~'
      break
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = httpStatusCode.PARAMETER_ERROR // 参数错误
      message = '用户名不存在~'
      break
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = httpStatusCode.PARAMETER_ERROR // 参数错误
      message = '密码是错误的~'
      break
    case errorTypes.UNAUTHORIZATION:
      status = httpStatusCode.AUTH_ERROR // 参数错误
      message = '无效的token~'
      break
    case errorTypes.UNPERMISSION:
      status = httpStatusCode.AUTH_ERROR // 参数错误
      message = '您不具备操作的权限~'
      break
    case errorTypes.CATEGORY_ALREADY_EXISTS:
      status = 409 // conflict
      message = '分类已经存在~'
      break
    default:
      status = httpStatusCode.NOT_FOUND
      message = 'NOT FOUND'
  }

  ctx.status = 200
  ctx.body = {
    code: status,
    data: null,
    msg: message
  }
}

export default errorHandler;
