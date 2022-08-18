const connection = require('../app/database')

class AuthService {
  async checkResource(tableName: string, id: string, userId: string) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [id, userId])
    return result.length === 0 ? false : true
  }
}


export default new AuthService()
