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
    const result = await connection.execute(statement, [
      userId,
      name,
      name,
      password
    ])

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
    const statement = `SELECT
    id AS userId, name, nickname, avatar, notes, phone, email,
    home_page AS homePage,
    (
      SELECT
      COUNT(r.id) 
      FROM relation AS r 
      WHERE r.to_user_id = '${userId}'
    ) AS concerns,
    (
      SELECT
      COUNT(r.id) 
      FROM relation AS r 
      WHERE r.from_user_id = '${userId}'
    ) AS fans,
    (
      SELECT
      SUM(p.pv) 
      FROM post AS p 
      WHERE p.user_id = '${userId}'
    ) AS pvTotal ,
    (
      SELECT
      COUNT(c.id) 
      FROM collect AS c 
      WHERE c.user_id = '${userId}'
    ) AS collectTotal 
    FROM user WHERE id = ?;`
    const result = await connection.execute(statement, [userId])

    return result[0][0]
  }

  async updateBaseInfo(userId: string, nickname: string, homePage: string, notes: string) {
    const statement = `UPDATE user SET nickname=?, home_page=?, notes=? WHERE id = ?;`
    const result = await connection.execute(statement, [nickname, homePage, notes, userId])
    return result
  }

  async updateAccountInfo(userId: string, phone: string, email: string) {
    const statement = `UPDATE user SET phone=?, email=? WHERE id = ?;`
    const result = await connection.execute(statement, [phone, email, userId])
    return result
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
    const query = `SELECT id FROM relation WHERE to_user_id='${toUserId}' AND from_user_id='${fromUserId}'`
    const queryRes = await connection.execute(query)

    if (queryRes[0].length) {
      // 关注过返回false
      return Promise.reject(false)
    }

    const statement = `INSERT INTO relation (to_user_id, from_user_id) VALUES (?, ?);`
    const result = await connection.execute(statement, [toUserId, fromUserId])

    return !!result[0].affectedRows
  }

  async deleteConcernUser(toUserId: string, fromUserId: string) {
    const statement = `DELETE FROM relation WHERE to_user_id='${toUserId}' AND  from_user_id='${fromUserId}'`
    const result = await connection.execute(statement, [toUserId, fromUserId])
    console.log(result)
    return result
  }

  async queryConcernAndFans(userId: string) {
    const statement = `
    SELECT 
    COUNT(if(from_user_id='${userId}',true,null)) AS fans,
    COUNT(if(to_user_id='${userId}',true,null)) AS concerns
    FROM relation
    `
    const result = await connection.execute(statement)
    return {
      concerns: result[0][0].concerns,
      fans: result[0][0].fans
    }
  }
}

export default new UserService()
