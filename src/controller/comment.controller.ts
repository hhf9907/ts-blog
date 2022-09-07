import Koa from 'koa'
import fs from 'fs'

import commentService from '../service/comment.service'

import httpStatusCode from '../constants/http.status'

import dynamicService from '../service/dynamic.service'
import dynamicType from '../constants/dynamic.type'

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
      dynamicService.create(userId, dynamicType.COMMENT_POST, postId, `评论了文章:${content}`)
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
        data: result,
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
    const { postId, pageNum = 1 } = ctx.request.query
    try {
      const result = await commentService.queryComment(postId, pageNum)

      for (let comment of result.list) {
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
        msg: '查询评论失败~'
      }
    }
  }

  async deleteComment(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // 1.文章信息
    const { commentId } = ctx.params
    console.log(commentId)
    try {
      await commentService.deleteComment(commentId)
      await commentService.deleteReplyByCommentId(commentId)
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: null,
        msg: '删除评论成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '删除评论失败~'
      }
    }
  }

  async deleteReplyComment(ctx: Koa.DefaultContext, next: () => Promise<any>) {
    // 1.文章信息
    const { comment_replyId } = ctx.params
    try {
      await commentService.deleteReplyComment(comment_replyId)
      ctx.body = {
        code: httpStatusCode.SUCCESS,
        data: null,
        msg: '删除评论成功~'
      }
    } catch (error) {
      ctx.body = {
        code: httpStatusCode.PARAMETER_ERROR,
        data: null,
        msg: '删除评论失败~'
      }
    }
  }
}

export default new CommentController()
