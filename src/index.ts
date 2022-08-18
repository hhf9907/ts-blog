import app from './app/app'

// 配置信息
import { appConfig } from '../src/app/config'


app.listen(appConfig.PORT, () => {
  console.log(`监听${appConfig.PORT}端口`)
})
