const connection = require('../app/database');

interface fileType {
  id: number
  filename: string
  mimetype: string
  size: number
  user_id: string
}

class FileService {
  async createAvatar(
    filename: string,
    mimetype: string,
    size: string,
    userId: string
  ) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId
    ])
    return result
  }

  async getAvatarByUserId(userId: string)  {
    const statement = `SELECT * FROM avatar WHERE user_id = ? order by id desc;`
    const [result] = await connection.execute(statement, [userId])
    return result[0] 
  }

  async createFile(
    filename: string,
    mimetype: string,
    size: string,
    userId: string,
    momentId: string
  ) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      momentId
    ])
    return result
  }

  async getFileByFilename(filename: string) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

export default new FileService();