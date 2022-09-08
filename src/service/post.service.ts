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
    categoryIds: string,
    editorType = 1
  ) {
    const statement = `INSERT INTO post (id, user_id, post_name, post_intro, content, creator, category_ids, edit_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    const result = await connection.execute(statement, [
      postId,
      userId,
      postName,
      postIntro,
      content,
      name,
      categoryIds,
      editorType
    ])
    return result[0].insertId
  }

  async update(
    postId: string,
    postName: string,
    postIntro: string,
    content: string,
    userId: string,
    name: string,
    categoryIds: string,
    editorType = 1
  ) {
    const statement = `UPDATE post SET user_id = ?, post_name = ?, post_intro = ?, content = ?, creator = ?, category_ids = ? , edit_type = ? WHERE id = ?`
    const result = await connection.execute(statement, [
      userId,
      postName,
      postIntro,
      content,
      name,
      categoryIds,
      editorType,
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

  async getPostById(postId: string, userId='') {
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
    edit_type AS editorType,
    p.category_ids AS categoryIds, 
    p.create_time AS createTime,
    if((r.to_user_id='${userId}') ,1,0) AS isRelation, 
    ( SELECT COUNT(*) FROM comment  WHERE p.id = post_id) + ( SELECT COUNT(*) FROM comment_reply WHERE p.id = post_id) AS commentNum
    FROM post AS p
    LEFT JOIN relation AS r  ON r.from_user_id = p.user_id AND r.to_user_id='${userId}'
    LEFT JOIN user AS u ON p.user_id = u.id 
    WHERE p.id = ?;`
    const result = await connection.execute(statement, [postId])

    return result[0]
  }

  async queryPostList(params: queryCategoryParams, userId = '') {
    const pageNum = Number(params.pageNum)
    const pageSize = Number(params.pageSize)

    // 条件
    const whereStr = `
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
    `
    // 查询文章列表的sql
    const statement = `SELECT
    p.id AS postId, 
    u.name AS username, 
    u.nickname,
    u.avatar,
    p.user_id AS userId, 
    p.post_name AS postName, 
    p.post_intro AS postIntro,
    if((c.user_id='${userId}' && c.post_id=p.id) ,1,0) AS isCollect, 
    ( SELECT COUNT(*) FROM comment  WHERE p.id = post_id) + ( SELECT COUNT(*) FROM comment_reply WHERE p.id = post_id) AS commentNum,
    creator, pv,
    p.category_ids AS categoryIds, 
    p.create_time AS createTime
    FROM post AS p
    LEFT JOIN collect AS c  ON c.post_id = p.id AND c.user_id='${userId}'
    LEFT JOIN user AS u ON p.user_id = u.id 
    ${whereStr}
    ORDER BY ${Number(params.queryType) === 1 ? 'p.create_time' : 'p.pv'} DESC
    LIMIT ${(pageNum - 1) * pageSize}, ${pageSize};
    `
    // 查询总数的sql
    const query = `SELECT count(*) AS count 
    FROM post AS p
    ${whereStr}`

    const result = await connection.execute(statement)
    const result1 = await connection.execute(query)
    const count = result1[0][0].count
    return {
      list: result[0],
      count: count,
      pages: Math.ceil(count / 10) // 向上取整
    }
  }

  async queryPostListByUserId(queryType = 1, pageNum = 1, userId = '', loginUserId='') {
    console.log(loginUserId)
    // 查询文章列表的sql
    const statement = `SELECT
    p.id AS postId, 
    u.name AS username, 
    u.nickname,
    u.avatar,
    p.user_id AS userId, 
    p.post_name AS postName, 
    p.post_intro AS postIntro,
    if((c.user_id='${loginUserId}') ,1,0) AS isCollect, 
    ( SELECT COUNT(*) FROM comment  WHERE p.id = post_id) + ( SELECT COUNT(*) FROM comment_reply WHERE p.id = post_id) AS commentNum,
    creator, pv,
    p.category_ids AS categoryIds, 
    p.create_time AS createTime
    FROM post AS p
    LEFT JOIN collect AS c  ON c.post_id = p.id AND c.user_id='${loginUserId}'
    LEFT JOIN user AS u ON p.user_id = u.id 
    WHERE p.user_id = '${userId}'
    ORDER BY ${queryType === 1 ? 'p.create_time' : 'p.pv'} DESC
    LIMIT ${(pageNum - 1) * 10}, 10;
    `
    // 查询总数的sql
    const query = `SELECT count(*) AS count 
    FROM post AS p
    WHERE p.user_id = '${userId}'`

    const result = await connection.execute(statement)
    const result1 = await connection.execute(query)
    const count = result1[0][0].count
    return {
      list: result[0],
      count: count,
      pages: Math.ceil(count / 10) // 向上取整
    }
  }

  async queryPostListByCollections(queryType = 1, pageNum = 1, userId = '', loginUserId='') {
    // 查询文章列表的sql
    const statement = `SELECT
    p.id AS postId, 
    u.name AS username, 
    u.nickname,
    u.avatar,
    p.user_id AS userId, 
    p.post_name AS postName, 
    p.post_intro AS postIntro,
    if((SELECT COUNT(*) FROM collect AS c1 WHERE p.id = post_id AND user_id = '${loginUserId}') ,1,0) AS isCollect,
    ( SELECT COUNT(*) FROM comment  WHERE p.id = post_id) + ( SELECT COUNT(*) FROM comment_reply WHERE p.id = post_id) AS commentNum,
    creator, pv,
    p.category_ids AS categoryIds, 
    p.create_time AS createTime
    FROM collect AS c
    LEFT JOIN post AS p  ON c.post_id = p.id
    LEFT JOIN user AS u ON p.user_id = u.id
    WHERE c.user_id = '${userId}'
    ORDER BY ${queryType === 1 ? 'p.create_time' : 'p.pv'} DESC
    LIMIT ${(pageNum - 1) * 10}, 10;
    `
    // 查询总数的sql
    const query = `SELECT count(*) AS count 
    FROM collect AS c
    WHERE c.user_id = '${userId}'`

    const result = await connection.execute(statement)
    const result1 = await connection.execute(query)
    const count = result1[0][0].count
    return {
      list: result[0],
      count: count,
      pages: Math.ceil(count / 10) // 向上取整
    }
  }

  async userPostPvTotal(userId: string) {
    const statement = `SELECT SUM(pv) AS pvTotal FROM post WHERE user_id = ?`
    const result = await connection.execute(statement, [userId])
    return result[0][0]
  }

  async collectPost(userId: string, postId: string) {
    const query = `SELECT id FROM collect WHERE user_id='${userId}' AND post_id='${postId}'`
    const queryRes = await connection.execute(query)

    if (queryRes[0].length) {
      // 关注过返回false
      return Promise.reject(false)
    }

    const statement = `INSERT INTO collect (user_id, post_id) VALUES (?, ?);`
    const result = await connection.execute(statement, [userId, postId])

    return !!result[0].affectedRows
  }

  /**
   * 取消收藏
   * @param userId
   * @param postId
   * @returns
   */
  async cancelCollectPost(userId: string, postId: string) {
    const statement = `DELETE FROM collect WHERE user_id='${userId}' AND post_id='${postId}'`
    const result = await connection.execute(statement, [userId, postId])

    return result
  }
}

export default new PostService()
