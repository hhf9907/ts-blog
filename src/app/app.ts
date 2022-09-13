import Koa from 'koa'
import bodyParser from 'koa-body'
import useRoutes from '../router'
import errorHandler from './error-handle'
import koaResponse from '../middleware/response.middleware';


const app = new Koa()


app.use(bodyParser())
app.use(koaResponse);

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