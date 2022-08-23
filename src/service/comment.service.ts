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
    const statement = `SELECT SQL_CALC_FOUND_ROWS
      id commentId,
      post_id postId,
      user_id userId,
      content content,
      create_time createTime
    FROM comment
    WHERE post_id = ?
    ORDER BY commentId DESC
    LIMIT ${(pageNum - 1) * 10}, 10;
    `
    const query = `select FOUND_ROWS() as count;`
    const result = await connection.execute(statement, [postId])
    const result1 = await connection.execute(query)
    const count = result1[0][0].count
    return {
      list: result[0],
      count: count,
      pages: Math.ceil(count / 10)
    }
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
    `
    // LIMIT ${(pageNum - 1) * 10}, 10 
    const result = await connection.execute(statement, [commentId])
    return result[0]
  }

  // 删除评论
  async deleteComment(commentId: number) {
    const statement = `DELETE FROM comment WHERE id = ?`
    const result = await connection.execute(statement, [commentId])
    return result
  }

  // 根据postId删除评论
  async deleteCommentByPostId(postId: string) {
    const statement = `DELETE FROM comment WHERE post_id = ?`
    const result = await connection.execute(statement, [postId])
    return result
  }

  // 根据postId删除评论
  async deleteReplyByPostId(postId: string) {
    const statement = `DELETE FROM comment_reply WHERE post_id = ?`
    const result = await connection.execute(statement, [postId])
    return result
  }

  // 根据commentId删除评论
  async deleteReplyByCommentId(commentId: number) {
    const statement = `DELETE FROM comment_reply WHERE comment_id = ?`
    const result = await connection.execute(statement, [commentId])
    return result
  }

  // 删除评论
  async deleteReplyComment(replyCommentId: number) {
    const statement = `DELETE FROM comment_reply WHERE id = ?`
    const result = await connection.execute(statement, [replyCommentId])
    return result
  }
}

export default new CommentService()
