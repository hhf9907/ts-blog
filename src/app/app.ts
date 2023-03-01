import Koa from 'koa'
import fileServe from 'koa-static';
import path from 'path'
import bodyParser from 'koa-body'

import useRoutes from '../router'
import errorHandler from './error-handle'
import koaResponse from '../middleware/response.middleware'

const cors = require('koa2-cors')
const app = new Koa()

app.use(bodyParser())
app.use(koaResponse)

app.use(cors())

// 注册路由
useRoutes(app)

// 解析body
app.use(
  bodyParser({
    multipart: true
  })
)

app.use(fileServe(path.join(__dirname, '../../uploads/')))

app.on('error', errorHandler)

export default app
