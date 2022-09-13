const connection = require('../app/database')

class StatisticsService {
  // 查询浏览量pv top 5
  async queryPvTopFive() {
    const statement = `
    SELECT post_name AS postName, pv
    FROM post
    ORDER  BY pv DESC 
    LIMIT 0,5
    `
    const result = await connection.execute(statement)

    return result[0]
  }

  // 查询近30天登录的人数
  async queryLoginCount() {
    const statement = `
    SELECT
    DATE_FORMAT( recent_login_time, '%Y-%m-%d' ) days,
    count( * ) count
    FROM
    ( SELECT * FROM user WHERE DATE_SUB( CURDATE( ), INTERVAL 30 DAY ) <= date( recent_login_time ) ) AS a
    GROUP BY
    days
    ORDER BY
    days
    `
    const result = await connection.execute(statement)

    return result[0]
  }
}

export default new StatisticsService()