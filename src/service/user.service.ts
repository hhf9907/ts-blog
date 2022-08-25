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
    const statement = `INSERT INTO user (id, name, nickname, password, update_time, create_time) VALUES (?, ?, ?, ?, NOW(),NOW());`
    const result = await connection.execute(statement, [userId, name,name, password])

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
}

export default new UserService()
