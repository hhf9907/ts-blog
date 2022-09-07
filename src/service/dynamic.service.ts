const connection = require('../app/database')

class DynamicService {
  async create(userId: string, type: string, correlationId: string, description: string) {
    const statement = `INSERT INTO dynamic (user_id, type, correlation_id, description) VALUES (?, ?, ?, ?)`
    const result = await connection.execute(statement, [
      userId,
      type,
      correlationId,
      description
    ])

    return result
  }
}


export default new DynamicService()
