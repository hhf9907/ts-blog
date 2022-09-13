import { TSuccess, TError } from '../middleware/response.middleware'
// 为 Context 类型扩展自定义属性
declare module 'koa' {
  interface DefaultState {
    stateProperty: boolean
  }

  interface DefaultContext {
    success: TSuccess
    error: TError
  }
}
