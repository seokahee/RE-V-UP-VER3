import { comment, isEditComment, newComment } from '@/types/comment/type'
import { supabase } from '../supabase/supabase'

export const getComments = async (boardId: string): Promise<comment[]> => {
  let { data: comment, error } = await supabase
    .from('comment')
    .select('*,userInfo(userId, nickname, userImage)')
    .order('commentDate', { ascending: true })
    .eq('boardId', boardId)
  if (error) {
    throw error.message
  }
  return comment as comment[]
}

export const addComment = async (newComment: newComment) => {
  const { data, error } = await supabase
    .from('comment')
    .insert(newComment)
    .select()
  if (error) {
    console.log(error.message)
  }
  return data
}

export const deleteComment = async (commentId: string) => {
  const { error } = await supabase
    .from('comment')
    .delete()
    .eq('commentId', commentId)
  if (error) {
    console.log(error.message)
  }
}

export const updateComment = async ({
  commentId,
  editedComment,
}: {
  commentId: string
  editedComment: isEditComment
}) => {
  const { data, error } = await supabase
    .from('comment')
    .update(editedComment)
    .eq('commentId', commentId)
    .select()
  if (error) {
    console.log(error.message)
  }
  return data
}

export const addLikeComment = async ({
  userId,
  commentId,
}: {
  userId: string
  commentId: string
}) => {
  try {
    let { data: commentLiked, error } = await supabase
      .from('comment')
      .select('commentLikeList')
      .eq('commentId', commentId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    if (!commentLiked) {
      return null
    }

    if (commentLiked.commentLikeList?.includes(userId)) {
      const likeListStatus = commentLiked.commentLikeList?.filter(
        (likedId) => likedId !== userId,
      )

      const { data, error: likeError } = await supabase
        .from('comment')
        .update({
          commentLikeList: likeListStatus,
        })
        .eq('commentId', commentId)

      if (likeError) {
        throw new Error(likeError.message)
      }

      return data
    }

    const updatedLikeList: string[] = [
      ...(commentLiked.commentLikeList || []),
      userId,
    ]

    const { data: updatedData, error: updateError } = await supabase
      .from('comment')
      .update({
        commentLikeList: updatedLikeList,
      })
      .eq('commentId', commentId)

    if (updateError) {
      throw new Error(updateError.message)
    }

    return updatedData
  } catch (error) {
    console.error('Error occurred:', error)
    return null
  }
}
