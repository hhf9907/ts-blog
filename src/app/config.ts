const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
import { getIpAddress } from '../utils/util'

dotenv.config()

console.log(process.env.NODE_ENV)

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private.key')
)

const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

// const HOST = process.env.NODE_ENV === 'production' ? 'coderhhf' : 'http://localhost',
const IPv4 = getIpAddress()

console.log('ip地址：', IPv4)
// 43.139.46.91  1.12.251.216
const appConfig = {
  // HOST: 'http://' + IPv4,
  HOST: 'https://blog-api.coderhhf.cn',
  PORT: 3000
}

const fileConfig = {
  // HOST: 'http://' + IPv4,
  HOST: 'https://blog-api.coderhhf.cn'
}


enum mysqlConfig {
  HOST = '1.12.251.216',
  DATABASE = 'ts_blog',
  USER = 'root',
  PASSWORD = 'root'
}

export { PRIVATE_KEY, PUBLIC_KEY, mysqlConfig, appConfig, fileConfig }
