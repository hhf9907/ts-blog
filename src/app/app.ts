import Koa from 'koa'

const bodyParser = require('koa-body')
const cors = require('koa2-cors')

import useRoutes from '../router'
import errorHandler from './error-handle'

 
const app = new Koa()


app.use(bodyParser())

// 注册路由
useRoutes(app)

// 解析body
app.use(
  bodyParser({
    multipart: true
  })
)

//跨域
app.use(
  cors({
    origin: function () {
      //设置允许来自指定域名请求
      return '*' // 允许来自所有域名请求
      // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 20, //指定本次预检请求的有效期，单位为秒。
    // credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)

app.on('error', errorHandler)

export default app