const fs = require('fs')
import Koa from 'koa'

const useRoutes = function (app: Koa) {
  fs.readdirSync(__dirname).forEach((file: string) => {
    if (file === 'index.ts') return
    const router = require(`./${file}`)
    console.log(file)
    app.use(router.routes())
    app.use(router.allowedMethods())
  })
}

export default useRoutes
