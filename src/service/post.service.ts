const connection = require('../app/database')

class PostService {
  async create(
    postId: string,
    postName: string,
    postTitle: string,
    content: string,
    userId: string,
    name: string
  ) {
    const statement = `INSERT INTO post (id, user_id, post_name, post_title, content, creator) VALUES (?, ?, ?, ?, ?, ?)`
    const result = await connection.execute(statement, [
      postId,
      userId,
      postName,
      postTitle,
      content,
      name
    ])

    return result
  }

  async update(
    postId: string,
    postName: string,
    postTitle: string,
    content: string,
    userId: string,
    name: string
  ) {
    const statement = `UPDATE post SET user_id = ?, post_name = ?, post_title = ?, content = ?, creator = ? WHERE id = ?`
    const result = await connection.execute(statement, [
      userId,
      postName,
      postTitle,
      content,
      name,
      postId
    ])

    return !!result[0].changedRows
  }

  async delete(postId: string) {
    const statement = `DELETE FROM post WHERE id = ?`
    const result = await connection.execute(statement, [postId])

    return result
  }

  async getPostById(postId: string) {
    const statement = `SELECT 
    id AS postId, 
    user_id AS userId, 
    post_name AS postName, 
    post_title AS postTitle, 
    content, creator,
    category_ids AS categoryIds, 
    create_time AS createTime
    FROM post WHERE id = ?;`
    const result = await connection.execute(statement, [postId])

    return result[0]
  }
}

export default new PostService()
