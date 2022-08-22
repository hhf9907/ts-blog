import Koa from 'koa'
import fs from 'fs'

import commentService from '../service/comment.service'

import httpStatusCode from '../constants/http.status'

class CommentController {
  // 获取用户信息
  async commentPost(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { userId } = ctx.user
    const { postId, content } = ctx.request.body
    const data = {
      userId,
      postId,
      content
    }
    try {
      const result = await commentService.createComment(data)
      if (result) {
        // 返回结果
        ctx.body = {
          code: httpStatusCode.SUCCESS,
          data: null,
          msg: '评论发表成功~'
        }
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '评论失败，当前文章不存在~'
      }
    }
  }

  async replyCommentPost(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { userId } = ctx.user
    const { commentId, postId, content } = ctx.request.body
    const data = {
      commentId,
      userId,
      postId,
      content
    }
    try {
      const result = await commentService.createReplyComment(data)

      // 返回结果
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: null,
        msg: '回复评论成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '评论失败,当前评论不存在~'
      }
    }
  }

  async queryComment(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    const { postId } = ctx.request.query
    try {
      const result = await commentService.queryComment(postId)

      for(let comment of result) {
        const reply = await commentService.queryReplyComment(comment.commentId)
        comment.replyComments = reply
      }

      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: result,
        msg: '查询评论成功~'
      }
   
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '评论失败,当前评论不存在~'
      }
    }
  }
}

module.exports = new CommentController()