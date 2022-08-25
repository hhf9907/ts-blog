import mysql from 'mysql2'

import { mysqlConfig } from './config'

const connections = mysql.createPool({
  host: mysqlConfig.HOST,
  database: mysqlConfig.DATABASE,
  user: mysqlConfig.USER,
  password: mysqlConfig.PASSWORD
})

connections.getConnection((err: NodeJS.ErrnoException, conn: mysql.PoolConnection) => {
  conn.connect((err: mysql.QueryError | null) => {
    if (err) {
      console.log('连接失败:', err)
    } else {
      console.log('数据库连接成功~')
    }
  })
  
})

module.exports = connections.promise();

export {}
