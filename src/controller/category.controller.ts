import Koa from 'koa'

import httpStatusCode from '../constants/http.status'

import service from '../service/category.service'
import errorTypes from '../constants/error-types'

class CategoryController {
  async createCategory(ctx: Koa.Context, next: () => Promise<any>) {
    const { categoryName }: { categoryName: string } = ctx.request.body
    const { name }: { name: string } = ctx.user

    // 1.判断分类名称是否已经传
    if (!categoryName || !categoryName.trim()) {
      const error = new Error(errorTypes.PARAMS_IS_REQUIRED)
      return ctx.app.emit('error', error, ctx, '请输入分类名称~')
    }
    

    // 2.判断分类是否存在的
    const result = await service.getCategoryByName(categoryName)

    const category = result[0]
    if (category) {
      const error = new Error(errorTypes.CATEGORY_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    // 3.插入数据
    const categoryInfo = {
      categoryName,
      creator: name
    }

    try {
      await service.create(categoryInfo)
      ctx.success(httpStatusCode.SUCCESS, null, '分类创建成功')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '分类创建失败')
    }
  }

  async getAllCategory(ctx: Koa.Context, next: () => Promise<any>) {
    try {
      const result = await service.getAllCategory()
      ctx.success(httpStatusCode.SUCCESS, result, '查询分类成功')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '查询分类失败')
    }
  }

  async success(ctx: Koa.Context, next: () => Promise<any>) {
    ctx.body = '授权成功~'
  }
}

export default new CategoryController()
