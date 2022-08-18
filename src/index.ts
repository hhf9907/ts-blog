import app from './app/app'

// 配置信息
import serverConfig from './utils/server.config'


app.listen(serverConfig.PORT, () => {
  console.log(`监听${serverConfig.PORT}端口`)
})
