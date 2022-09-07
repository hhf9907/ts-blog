import Koa from 'koa'
import httpStatusCode from '../constants/http.status'
import { generatePostId } from '../utils/password-handle'
import postService from '../service/post.service'
import commentService from '../service/comment.service'

import dynamicService from '../service/dynamic.service'
import dynamicType from '../constants/dynamic.type'

class PostController {
  async createPost(ctx: Koa.DefaultContext, next: () => Promise<any>) {
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
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: null,
        msg: '发布文章成功~'
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '发布文章失败~'
      }
    }
  }

  async updatePost(ctx: Koa.DefaultContext, next: () => Promise<any>) {
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
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: null,
        msg: '修改文章成功~'
      }
    } else {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '修改文章失败, 文章不存在~'
      }
    }
  }

  async deletePost(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // 1.文章信息
    const { postId } = ctx.params
    try {
      await postService.delete(postId)

      // 删除评论
      await commentService.deleteCommentByPostId(postId)
      await commentService.deleteReplyByPostId(postId)

      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: null,
        msg: '删除文章成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '删除文章失败~'
      }
    }
  }

  async getPost(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // 1.文章信息
    const { postId } = ctx.params
    try {
      const postInfo = await postService.getPostById(postId)
      await postService.incrementPv(postId)
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: postInfo[0],
        msg: '获取文章成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '获取文章失败~'
      }
    }
  }

  // 查询文章列表
  async getPostList(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const {
      pageNum,
      pageSize,
      keyword = '',
      queryType = 1,
      categoryId
    } = ctx.request.query

    const params = {
      pageNum,
      pageSize,
      keyword,
      queryType,
      categoryId
    }

    const userId = ctx?.user?.userId

    try {
      const postList = await postService.queryPostList(params, userId)
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: postList,
        msg: '获取文章列表成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '获取文章列表失败,请检查参数是否有误~'
      }
    }
  }

  // 查询用户文章列表
  async queryPostListByUserId(
    ctx: Koa.DefaultContext,
    next: () => Promise<any>
  ) {
    // queryType 1 最新， 2 最热
    const { queryType, userId, pageNum } = ctx.request.query
    const loginUserId = ctx?.user?.userId
    try {
      const postList = await postService.queryPostListByUserId(
        queryType,
        pageNum,
        userId,
        loginUserId
      )
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: postList,
        msg: '获取文章列表成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '获取文章列表失败,请检查参数是否有误~'
      }
    }
  }

  // 统计浏览数
  async getPostPvTotal(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const { userId } = ctx.request.query

    try {
      const pvTotal = await postService.userPostPvTotal(userId)
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: pvTotal,
        msg: '获取文章总浏览数成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '获取文章总浏览数,请检查参数是否有误~'
      }
    }
  }

  async collectPost(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const { postId } = ctx.params
    const { userId } = ctx.user

    try {
      const result = await postService.collectPost(userId, postId)
      dynamicService.create(userId, dynamicType.COLLECT_POST, postId, `收藏了该文章`)
      if (result) {
        ctx.body = {
          code: httpStatusCode.SUCCESS,
          data: null,
          msg: '收藏成功~'
        }
      }
    } catch (error) {
      if (error === false) {
        ctx.body = {
          code: httpStatusCode.PARAMETER_ERROR,
          data: null,
          msg: '您已经收藏该文章~'
        }
      } else {
        ctx.body = {
          code: httpStatusCode.PARAMETER_ERROR,
          data: null,
          msg: '收藏失败,请检查参数是否有误~'
        }
      }
    }
  }

  async cancelCollectPost(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // queryType 1 最新， 2 最热
    const { postId } = ctx.params
    const { userId } = ctx.user

    try {
      const result = await postService.cancelCollectPost(userId, postId)
      if (result) {
        ctx.body = {
          code: httpStatusCode.SUCCESS,
          data: null,
          msg: '取消收藏成功~'
        }
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '收取消藏失败,请检查参数是否有误~'
      }
    }
  }
}

export default new PostController()
