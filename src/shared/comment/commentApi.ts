import { comment, isEditComment, newComment } from '@/types/comment/type'
import { supabase } from '../supabase/supabase'

//댓글 조회
export const getComments = async (): Promise<comment[]> => {
  let { data: comment, error } = await supabase
    .from('comment')
    .select(
      'commentId,commentContent,commentDate,commentLikeList,userInfo(userId, nickname, userImage)',
    )
  if (error) {
    throw error.message
  }
  return comment as comment[]
}

//추가
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

//댓글 삭제
export const deleteComment = async (commentId: string) => {
  const { error } = await supabase
    .from('comment')
    .delete()
    .eq('commentId', commentId)
  if (error) {
    console.log(error.message)
  }
}

//댓글 수정
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

//댓글 좋아요
export const addLikeComment = async ({
  userId,
  commentId,
}: {
  userId: string
  commentId: string
}) => {
  try {
    // 댓글이 존재하는지 확인하고 좋아요 목록을 가져옵니다.
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

    console.log('commentLiked', commentLiked)

    //이미 좋아요를 누른 경우
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

    //좋아요를 누르지 않은 경우
    const updatedLikeList: (string | null)[] = [
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

//좋아요 취소
// export const cancelLikeComment = async ({
//   userId,
//   commentId,
// }: {
//   userId: string
//   commentId: string
// }) => {
//   let { data: commentLiked, error } = await supabase
//     .from('comment')
//     .select('commentLikeList,userInfo(userId)')
//     .eq('commentId', commentId)
//     .single()

//   if (error) {
//     console.log(error.message)
//   }

//   if (!commentLiked) {
//     console.log('좋아요 한 유저가 없습니다.')
//     return null
//   }

//   const likeListStatus = commentLiked.commentLikeList?.filter(
//     (likedId) => likedId !== userId,
//   )

//   const { data, error: likeError } = await supabase
//     .from('comment')
//     .update({
//       commentLikeList: likeListStatus,
//     })
//     .eq('commentId)', commentId)
//   return data
// }

//대댓글(?)
