'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getToday } from '@/util/util'
import { useStore } from '@/shared/store'
import { useQuery } from '@tanstack/react-query'
import { onCommentHandler } from '@/util/comment/util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getComments,
  deleteComment,
  updateComment,
  addLikeComment,
  cancelLikeComment,
} from '@/shared/comment/commentApi'

const CommentsList = () => {
  const { userInfo } = useStore()
  const queryClient = useQueryClient()
  const [isLike, setIsLike] = useState<boolean>(false)

  //댓글 목록 조회
  const { data: commentsData } = useQuery({
    queryFn: () => getComments(),
    queryKey: ['comments'],
  })

  //댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    },
  })

  const onDeleteCommentHandler = (commentId: string) => {
    deleteCommentMutation.mutate(commentId)
    alert('삭제 하시겠습니까?')
  }

  //댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    },
  })

  const onUpdateCommentHandler = (commentId: string) => {
    const editedComment = {
      commentDate: getToday(),
      commentContent: '수정 테스트',
    }
    updateCommentMutation.mutate({ commentId, editedComment })
    alert('수정 하시겠습니까?')
  }

  //좋아요
  const likeCommentMutation = useMutation({
    mutationFn: addLikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like'] })
    },
  })

  const onLikeHandler = (commentId: string) => {
    const userId = userInfo.uid
    alert('좋아요')
    likeCommentMutation.mutate({ commentId, userId })
  }

  //좋아요 취소
  const cancelLikeCommentMutation = useMutation({
    mutationFn: cancelLikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like'] })
    },
  })

  const onCancleLikeHandler = (commentId: string) => {
    const userId = userInfo.uid

    alert('취소')
    cancelLikeCommentMutation.mutate({ commentId, userId })
  }

  return (
    <div>
      {commentsData?.map((item) => (
        <div
          key={item.commentId}
          className='border border-solid border-black w-[750px] h-24 p-4'
        >
          <div className=' flex flex-row'>
            <div className=' basis-1/2 flex flex-row'>
              <p className='w-5 h-5 flex overflow-hidden rounded-full bg-slate-200'>
                {item.userInfo?.userImage && (
                  <Image
                    src={item.userInfo.userImage}
                    alt=''
                    width={20}
                    height={20}
                  />
                )}
              </p>
              <p>{item.userInfo?.nickname}</p>
            </div>
            <div className='basis-1/2'>
              {onCommentHandler(item.commentDate)}
            </div>
          </div>
          <div className='flex flex-row'>
            <div className='basis-1/2'> {item.commentContent}</div>
            <div className='basis-1/2'>
              {item.userInfo?.userId === userInfo.uid ? (
                <>
                  <button
                    onClick={() => onDeleteCommentHandler(item.commentId)}
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => onUpdateCommentHandler(item.commentId)}
                  >
                    수정
                  </button>
                  <br />
                  <button onClick={() => onLikeHandler(item.commentId)}>
                    좋아요 {item.commentLikeList.length}
                  </button>{' '}
                  <br />
                  <button onClick={() => onCancleLikeHandler(item.commentId)}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => onLikeHandler(item.commentId)}>
                    좋아요 {item.commentLikeList.length}
                  </button>{' '}
                  <br />
                  <button onClick={() => onCancleLikeHandler(item.commentId)}>
                    취소
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentsList
