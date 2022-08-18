const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private.key')
)

const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

enum mysqlConfig {
  HOST = '127.0.0.1',
  PORT = '3306',
  DATABASE = 'ts_blog',
  USER = 'root',
  PASSWORD = 'root'
}

export { PRIVATE_KEY, PUBLIC_KEY, mysqlConfig }
