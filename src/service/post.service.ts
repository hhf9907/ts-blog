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
    name: string
  ) {
    const statement = `INSERT INTO post (id, user_id, post_name, post_intro, content, creator) VALUES (?, ?, ?, ?, ?, ?)`
    const result = await connection.execute(statement, [
      postId,
      userId,
      postName,
      postIntro,
      content,
      name
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

  async getPostById(postId: string) {
    const statement = `SELECT 
    id AS postId, 
    user_id AS userId, 
    post_name AS postName, 
    post_intro AS postIntro, 
    content, creator,
    category_ids AS categoryIds, 
    create_time AS createTime
    FROM post WHERE id = ?;`
    const result = await connection.execute(statement, [postId])

    return result[0]
  }

  async queryPostList(params: queryCategoryParams) {
    const pageNum = Number(params.pageNum)
    const pageSize = Number(params.pageSize)
    const statement = `SELECT SQL_CALC_FOUND_ROWS
    id AS postId, 
    user_id AS userId, 
    post_name AS postName, 
    post_intro AS postIntro, 
    content, creator, pv,
    category_ids AS categoryIds, 
    create_time AS createTime
    FROM post 
    ${params.keyword || params.categoryId ? 'WHERE ' : ''}
    ${
      // 关键字查询
      params.keyword
        ? `(
          post_name LIKE '%${params.keyword}%' || 
          post_intro LIKE '%${params.keyword}%' || 
          content LIKE '%${params.keyword}%' || 
          creator LIKE '%${params.keyword}%'
        )`
        : ``
    }
    ${params.keyword && params.categoryId ? 'AND' : ''}
    ${
      // 查询分类
      params.categoryId
        ? `(category_ids LIKE '%,${params.categoryId},%' || 
          category_ids LIKE '%${params.categoryId},%' || 
          category_ids LIKE '%,${params.categoryId}%'
          )`
        : ``
    }
    ORDER BY ${Number(params.queryType) === 1 ? 'create_time' : 'pv'} DESC
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
