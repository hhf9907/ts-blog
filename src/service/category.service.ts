const connection = require('../app/database')

interface CategoryInfo {
  id: string
  categoryName: string
  creator: string
}

class CategoryService {
  async create(categoryInfo: CategoryInfo) {
    const statement = `INSERT INTO categorys (id, category_name, creator, update_time, create_time) VALUES (?, ?, ?, NOW(),NOW());`
    const result = await connection.execute(statement, [
      categoryInfo.id,
      categoryInfo.categoryName,
      categoryInfo.creator
    ])
    return result[0]
  }

  /**
   * 查询全部分类
   * @param name
   * @returns
   */
  async getAllCategory() {
    const statement = `SELECT id AS categoryId, category_name AS categoryName, creator, create_time AS createTime FROM categorys ;`
    const result = await connection.execute(statement)
    return result[0]
  }

  /**
   * 查询
   * @param name
   * @returns
   */
  async getCategoryByName(name: string) {
    const statement = `SELECT * FROM categorys WHERE category_name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
}

export default new CategoryService()
