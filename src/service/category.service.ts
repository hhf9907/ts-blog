const connection = require('../app/database')

interface CategoryInfo {
  categoryName: string
  creator: string
}

class CategoryService {
  async create(categoryInfo: CategoryInfo) {
    const statement = `INSERT INTO category (category_name, creator) VALUES (?, ?);`
    const result = await connection.execute(statement, [
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
    const statement = `SELECT id AS categoryId, category_name AS categoryName, creator, create_time AS createTime FROM category ;`
    const result = await connection.execute(statement)
    return result[0]
  }

  /**
   * 查询
   * @param name
   * @returns
   */
  async getCategoryByName(name: string) {
    const statement = `SELECT * FROM category WHERE category_name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
}

export default new CategoryService()
