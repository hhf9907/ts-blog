import Koa from 'koa'

const bodyParser = require('koa-body')

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


app.on('error', errorHandler)

export default app