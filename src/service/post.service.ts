const connection = require('../app/database')

interface queryCategoryParams {
  pageNum: string | number
  pageSize: string | number
  keyword: string | number | null | undefined
  queryType?: string | number
  categoryId?: string | number | null | undefined
}

class PostService {
  async create(
    postId: string,
    postName: string,
    postIntro: string,
    content: string,
    userId: string,
    name: string,
    categoryIds: string
  ) {
    const statement = `INSERT INTO post (id, user_id, post_name, post_intro, content, creator, category_ids) VALUES (?, ?, ?, ?, ?, ?, ?)`
    const result = await connection.execute(statement, [
      postId,
      userId,
      postName,
      postIntro,
      content,
      name,
      categoryIds
    ])

    return result
  }

  async update(
    postId: string,
    postName: string,
    postIntro: string,
    content: string,
    userId: string,
    name: string
  ) {
    const statement = `UPDATE post SET user_id = ?, post_name = ?, post_intro = ?, content = ?, creator = ? WHERE id = ?`
    const result = await connection.execute(statement, [
      userId,
      postName,
      postIntro,
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

  async incrementPv(postId: string) {
    const statement = `UPDATE post SET pv = pv + 1 WHERE id = ?;`
    const result = await connection.execute(statement, [postId])

    return !!result[0].changedRows
  }

  async getPostById(postId: string) {
    const statement = `SELECT 
    p.id AS postId, 
    p.user_id AS userId, 
    p.post_name AS postName, 
    u.name AS username, 
    u.nickname,
    u.avatar,
    p.post_intro AS postIntro, 
    p.content,
    p.pv,
    p.category_ids AS categoryIds, 
    p.create_time AS createTime
    FROM post AS p
    LEFT JOIN user AS u ON p.user_id = u.id 
    WHERE p.id = ?;`
    const result = await connection.execute(statement, [postId])

    return result[0]
  }

  async queryPostList(params: queryCategoryParams) {
    const pageNum = Number(params.pageNum)
    const pageSize = Number(params.pageSize)
    const statement = `SELECT SQL_CALC_FOUND_ROWS
    p.id AS postId, 
    u.name AS username, 
    u.nickname,
    u.avatar,
    p.user_id AS userId, 
    p.post_name AS postName, 
    p.post_intro AS postIntro, 
    creator, pv,
    p.category_ids AS categoryIds, 
    p.create_time AS createTime
    FROM post AS p
    LEFT JOIN user AS u ON p.user_id = u.id 
    ${params.keyword || params.categoryId ? 'WHERE ' : ''}
    ${
      // 关键字查询
      params.keyword
        ? `(
          p.post_name LIKE '%${params.keyword}%' || 
          p.post_intro LIKE '%${params.keyword}%' || 
          p.content LIKE '%${params.keyword}%' || 
          p.creator LIKE '%${params.keyword}%'
        )`
        : ``
    }
    ${params.keyword && params.categoryId ? 'AND' : ''}
    ${
      // 查询分类
      params.categoryId
        ? `(p.category_ids LIKE '%,${params.categoryId},%' || 
          p.category_ids LIKE '%${params.categoryId},%' || 
          p.category_ids LIKE '%,${params.categoryId}%'
          )`
        : ``
    }
    ORDER BY ${Number(params.queryType) === 1 ? 'p.create_time' : 'p.pv'} DESC
    LIMIT ${(pageNum - 1) * pageSize}, ${pageSize};
    `

    const query = `select FOUND_ROWS() as count;`
    const result = await connection.execute(statement)
    const result1 = await connection.execute(query)
    const count = result1[0][0].count
    return {
      list: result[0],
      count: count,
      pages: Math.ceil(count / 10) // 向上取整
    }
  }
}

export default new PostService()
