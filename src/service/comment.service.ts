const connection = require('../app/database')

class CommentService {
  // 创建评论
  async createComment(payload: any) {
    const { postId, userId, content } = payload
    const statement = `INSERT INTO comment (post_id, user_id, content) VALUES (?, ?, ?)`
    const result = await connection.execute(statement, [
      postId,
      userId,
      content
    ])
    return !!result[0].affectedRows
  }

  // 回复评论
  async createReplyComment(payload: any) {
    const { commentId, postId, userId, content } = payload
    const statement = `INSERT INTO comment_reply (comment_id, post_id, user_id, content) VALUES (?, ? , ?, ?)`
    const result = await connection.execute(statement, [
      commentId,
      postId,
      userId,
      content
    ])
    return !!result[0].affectedRows
  }

  // 查询评论
  async queryComment(postId: string, pageNum = 1) {
    const statement = `SELECT 
                        id commentId,
                        post_id postId,
                        user_id userId,
                        content content,
                        create_time createTime
                      FROM comment
                      WHERE post_id = ?
                      ORDER BY commentId DESC
                      LIMIT ${(pageNum - 1) * 10}, 10 
                      
                      `
    const result = await connection.execute(statement, [postId])
    return result[0]
  }

  // 查询回复评论
  // 查询评论
  async queryReplyComment(commentId: string, pageNum = 1) {
    const statement = `SELECT 
                        id commentReplyId,
                        comment_id commentId,
                        post_id postId,
                        user_id userId,
                        content content,
                        create_time createTime
                      FROM comment_reply
                      WHERE comment_id = ?
                      ORDER BY commentReplyId DESC
                      LIMIT ${(pageNum - 1) * 10}, 10 
                      
                      `
    const result = await connection.execute(statement, [commentId])
    return result[0]
  }
}

export default new CommentService()