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
    const statement = `INSERT INTO users (user_id, name, password, update_time, create_time) VALUES (?, ?, ?, NOW(),NOW());`
    const result = await connection.execute(statement, [userId, name, password])

    return result[0]
  }

  /**
   * 查询用户
   * @param name 
   * @returns 
   */
  async getUserByName(name: string) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
  }

  /**
   * 记录最近的登录时间
   * @param userId 
   * @returns 
   */
  async updateLoginTime(userId: string) {
    const statement = `UPDATE users SET recent_login_time = NOW() WHERE user_id = ?;`
    const result = await connection.execute(statement, [userId])
    return result
  }

  async updateAvatarUrlById(avatarUrl: string | null, userId: string) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

export default new UserService()
