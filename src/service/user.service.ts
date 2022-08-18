const connection = require('../app/database')

interface IUser {
  userId: string
  name: string
  password: string
}

class UserService {
  async create(user: IUser) {
    const { userId, name, password } = user
    const statement = `INSERT INTO users (user_id, name, password) VALUES (?, ?, ?);`
    const result = await connection.execute(statement, [userId, name, password])

    return result[0]
  }

  async getUserByName(name: string) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
  }

  async updateAvatarUrlById(avatarUrl: string | null, userId: string) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

export default new UserService()
