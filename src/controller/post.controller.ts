import Koa from 'koa'
import httpStatusCode from '../constants/http.status'
import { generatePostId } from '../utils/password-handle'
import postService from '../service/post.service'
import commentService from '../service/comment.service'

import dynamicService from '../service/dynamic.service'
import dynamicType from '../constants/dynamic.type'

class PostController {
  async createPost(ctx: Koa.Context, next: () => Promise<any>) {
    // 1.文章信息
    const { postName, postIntro, content, categoryIds, editorType } =
      ctx.request.body
    const postId = generatePostId()
    const { userId, name } = ctx.user
    try {
      await postService.create(
        postId,
        postName,
        postIntro,
        content,
        userId,
        name,
        categoryIds,
        editorType
      )
      dynamicService.create(userId, dynamicType.CREATE_POST, postId, `发布了文章:${postName}`)
      
      ctx.success(httpStatusCode.SUCCESS, null, '发布文章成功~')
    } catch (error) {
      
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '发布文章失败~')
    }
  }

  async updatePost(ctx: Koa.Context, next: () => Promise<any>) {
    // 1.文章信息
    const { postId, postName, postIntro, content, categoryIds, editorType } =
      ctx.request.body
    const { userId, name } = ctx.user
    const result = await postService.update(
      postId,
      postName,
      postIntro,
      content,
      userId,
      name,
      categoryIds,
      editorType
    )
    if (result) {
      ctx.success(httpStatusCode.SUCCESS, null, '修改文章成功~')
    } else {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '修改文章失败, 文章不存在~')
    }
  }

  async deletePost(ctx: Koa.Context, next: () => Promise<any>) {
    // 1.文章信息
    const { postId } = ctx.params
    try {
      await postService.delete(postId)

      // 删除评论
      await commentService.deleteCommentByPostId(postId)
      await commentService.deleteReplyByPostId(postId)

      ctx.success(httpStatusCode.SUCCESS, null, '删除文章成功~')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '删除文章失败~')
    }
  }

  async getPost(ctx: Koa.Context, next: () => Promise<any>) {
    // 1.文章信息
    const { postId } = ctx.params
    const userId = ctx?.user?.userId
    try {
      const postInfo = await postService.getPostById(postId, userId)
      await postService.incrementPv(postId)
      
      ctx.success(httpStatusCode.SUCCESS, postInfo[0], '获取文章成功~')
    } catch (error) {
      
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '获取文章失败~')
    }
  }

  // 查询文章列表
  async getPostList(ctx: Koa.Context, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const {
      pageNum,
      pageSize,
      keyword = '',
      queryType = 1,
      categoryId
    } = ctx.request.query

    const params = {
      pageNum: Number(pageNum),
      pageSize: Number(pageSize),
      keyword: String(keyword),
      queryType: String(queryType),
      categoryId: Number(categoryId)
    }

    const userId = ctx?.user?.userId

    try {
      const postList = await postService.queryPostList(params, userId)
      
      ctx.success(httpStatusCode.SUCCESS, postList, '获取文章列表成功~')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '获取文章列表失败,请检查参数是否有误~')
    }
  }

  // 查询用户文章列表
  async queryPostListByUserId(
    ctx: Koa.Context,
    next: () => Promise<any>
  ) {
    // queryType 1 最新， 2 最热
    const { queryType, userId, pageNum } = ctx.request.query
    const loginUserId = ctx?.user?.userId
    try {
      const postList = await postService.queryPostListByUserId(
        Number(queryType),
        Number(pageNum),
        userId+'',
        loginUserId
      )
      ctx.success(httpStatusCode.SUCCESS, postList, '获取文章列表成功~')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '获取文章列表失败,请检查参数是否有误~')
    }
  }

  // 查询用户收藏文章列表
  async queryPostListByCollections(
    ctx: Koa.Context,
    next: () => Promise<any>
  ) {
    // queryType 1 最新， 2 最热
    const { queryType, userId, pageNum } = ctx.request.query
    const loginUserId = ctx?.user?.userId
    try {
      const postList = await postService.queryPostListByCollections(
        Number(queryType),
        Number(pageNum),
        userId+'',
        loginUserId
      )
      ctx.success(httpStatusCode.SUCCESS, postList, '获取文章列表成功~')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '获取文章列表失败,请检查参数是否有误~')
    }
  }

  // 统计浏览数
  async getPostPvTotal(ctx: Koa.Context, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const { userId } = ctx.request.query

    try {
      const pvTotal = await postService.userPostPvTotal(String(userId))
      
      ctx.success(httpStatusCode.SUCCESS, pvTotal, '获取文章总浏览数成功~')
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '获取文章总浏览数,请检查参数是否有误~')
    }
  }

  async collectPost(ctx: Koa.Context, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const { postId } = ctx.params
    const { userId } = ctx.user

    try {
      const result = await postService.collectPost(userId, postId)
      dynamicService.create(userId, dynamicType.COLLECT_POST, postId, `收藏了该文章`)
      if (result) {
        ctx.success(httpStatusCode.SUCCESS, null, '收藏成功~')
      }
    } catch (error) {
      if (error === false) {
        ctx.error(httpStatusCode.PARAMETER_ERROR, null, '您已经收藏该文章~')
      } else {
        ctx.error(httpStatusCode.PARAMETER_ERROR, null, '收藏失败,请检查参数是否有误~')
      }
    }
  }

  async cancelCollectPost(ctx: Koa.Context, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const { postId } = ctx.params
    const { userId } = ctx.user

    try {
      const result = await postService.cancelCollectPost(userId, postId)
      if (result) {
        ctx.success(httpStatusCode.SUCCESS, null, '取消收藏成功~')
      }
    } catch (error) {
      ctx.error(httpStatusCode.PARAMETER_ERROR, null, '收取消藏失败,请检查参数是否有误~')
    }
  }
}

export default new PostController()
