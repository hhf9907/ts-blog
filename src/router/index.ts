const fs = require('fs')
import Koa from 'koa'
const cors = require('koa2-cors')

const useRoutes = function (app: Koa) {
  app.use(cors())
  fs.readdirSync(__dirname).forEach((file: string) => {
    if (file === 'index.ts') return
    const router = require(`./${file}`)

    app.use(router.routes())
    app.use(router.allowedMethods())
  })

}

export default useRoutes
