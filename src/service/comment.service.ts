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

    const replyId = result[0].insertId
    // 插入成功返回给用户
    const query = `SELECT 
    c.id commentReplyId,
    c.comment_id commentId,
      u.avatar avatar,
      u.nickname nickname,
      c.post_id postId,
      c.user_id userId,
      c.content content,
      c.create_time createTime
    FROM comment_reply AS c
    LEFT JOIN user AS u ON c.user_id = u.id
    WHERE c.id = ?
    `
    const reply = await connection.execute(query, [replyId])
    return reply[0][0]
  }

  // 查询评论
  async queryComment(postId: string, pageNum = 1) {
    const statement = `SELECT
      c.id commentId,
      c.post_id postId,
      c.user_id userId,
      u.avatar avatar,
      u.nickname nickname,
      c.content content,
      c.create_time createTime
    FROM comment AS c
    LEFT JOIN user AS u ON c.user_id = u.id
    WHERE post_id = ?
    ORDER BY commentId DESC
    LIMIT ${(pageNum - 1) * 10}, 10;
    `
    const query = `SELECT
     COUNT(*) as count ,
     COUNT(*) + (SELECT COUNT(*) FROM comment_reply AS r WHERE r.post_id = '${postId}') AS commentTotal
     FROM  comment AS c 
     WHERE c.post_id = ?;`
    const result = await connection.execute(statement, [postId])
    const result1 = await connection.execute(query, [postId])
    const count = result1[0][0].count
    const commentTotal = result1[0][0].commentTotal
    return {
      list: result[0],
      count: count,
      commentTotal: commentTotal,
      pages: Math.ceil(count / 10)
    }
  }

  // 查询回复评论
  // 查询评论
  async queryReplyComment(commentId: string) {
    const statement = `SELECT 
    c.id commentReplyId,
    c.comment_id commentId,
      u.avatar avatar,
      u.nickname nickname,
      c.post_id postId,
      c.user_id userId,
      c.content content,
      c.create_time createTime
    FROM comment_reply AS c
    LEFT JOIN user AS u ON c.user_id = u.id
    WHERE comment_id = ?
    ORDER BY commentReplyId DESC
    `
    const queryCountSql = `SELECT 
      COUNT(id) as count
      FROM comment_reply
      WHERE comment_id = ?
    `
    // LIMIT ${(pageNum - 1) * 10}, 10 
    const result = await connection.execute(statement, [commentId])
    const result1 = await connection.execute(queryCountSql, [commentId])
    const count = result1[0][0].count
    return {
      list: result[0],
      count: count,
      pages: Math.ceil(count / 10)
    }
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
