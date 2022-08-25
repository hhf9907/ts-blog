const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

console.log(process.env.NODE_ENV)

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private.key')
)

const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

// const HOST = process.env.NODE_ENV === 'production' ? 'coderhhf' : 'http://localhost',
enum appConfig {
  HOST = 'http://localhost',
  PORT = 3000
}

enum mysqlConfig {
  HOST = '127.0.0.1',
  DATABASE = 'ts_blog',
  USER = 'root',
  PASSWORD = 'root'
}

export { PRIVATE_KEY, PUBLIC_KEY, mysqlConfig, appConfig }
