const connection = require('../app/database')

interface IUser {
  userId: string
  name: string
  password: string
}

class UserService {
  /**
   * 创建用户
   * @param user
   * @returns
   */
  async create(user: IUser) {
    const { userId, name, password } = user
    const statement = `INSERT INTO user (id, name, nickname, password) VALUES (?, ?, ?, ?);`
    const result = await connection.execute(statement, [userId, name, name, password])

    return result[0]
  }

  /**
   * 查询用户
   * @param name
   * @returns
   */
  async getUserByName(name: string) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
  }

  /**
   * 查询用户
   * @param name
   * @returns
   */
  async getUserById(userId: string) {
    const statement = `SELECT * FROM user WHERE id = ?;`
    const result = await connection.execute(statement, [userId])

    return result[0]
  }

  /**
   * 记录最近的登录时间
   * @param userId
   * @returns
   */
  async updateLoginTime(userId: string) {
    const statement = `UPDATE user SET recent_login_time = NOW() WHERE id = ?;`
    const result = await connection.execute(statement, [userId])
    return result
  }

  async updateAvatarUrlById(avatarUrl: string | null, userId: string) {
    const statement = `UPDATE user SET avatar = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }

  // 关注用户 A -> B

  async concernUser(toUserId: string, fromUserId: string) {
    const statement = `INSERT INTO relation (to_user_id, from_user_id) VALUES (?, ?);`
    const result = await connection.execute(statement, [toUserId, fromUserId])

    return !!result[0].affectedRows
  }

  async queryConcernAndFans(userId: string) {
    const concernSql = `SELECT COUNT(id) AS concerns FROM relation WHERE to_user_id = '${userId}'`
    const fansSql = `SELECT COUNT(id) AS fans FROM relation WHERE from_user_id = '${userId}'`
    const concerns = await connection.execute(concernSql)
    const fans = await connection.execute(fansSql)

    return {
      concerns: concerns[0][0].concerns,
      fans: fans[0][0].fans
    }
  }
}

export default new UserService()
