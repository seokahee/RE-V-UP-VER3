import React, { useState } from 'react'
import Image from 'next/image'
import { getToday } from '@/util/util'
import { useQuery } from '@tanstack/react-query'
import { onDateTimeHandler } from '@/util/util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getComments,
  deleteComment,
  updateComment,
  addLikeComment,
} from '@/shared/comment/commentApi'
import { useSession } from 'next-auth/react'

const CommentsList = ({ boardId }: { boardId: string }) => {
  const { data: userSessionInfo } = useSession()
  const queryClient = useQueryClient()
  const [editedCommentId, setEditedCommentId] = useState<string | null>(null)
  const [editedText, setEditedText] = useState<string>('')

  const userId = userSessionInfo?.user.uid as string

  const { data: commentsData } = useQuery({
    queryFn: () => getComments(boardId),
    queryKey: ['comment'],
  })

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

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    },
  })

  const onUpdateCommentHandler = (commentId: string) => {
    if (editedText === '') {
      alert('수정된 내용이 없습니다')
      return
    }
    alert('수정 하시겠습니까?')
    const editedComment = {
      commentDate: getToday(),
      commentContent: editedText,
    }
    updateCommentMutation.mutate({ commentId, editedComment })
    setEditedCommentId(null)
    setEditedText('')
  }

  const likeCommentMutation = useMutation({
    mutationFn: addLikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    },
  })

  const onLikeHandler = (commentId: string) => {
    if (!userId) {
      alert('로그인 후 이용해 주세요')
      return
    }

    alert('좋아요 테스트중')
    likeCommentMutation.mutate({ commentId, userId })
  }

  return (
    <div>
      {commentsData?.map((item) => (
        <div key={item.commentId} className=''>
          <div className='flex flex-row  '>
            <div className='flex flex-row basis-1/2'>
              <p>
                {item.userInfo?.userImage && (
                  <Image
                    src={item.userInfo.userImage}
                    alt=''
                    width={20}
                    height={20}
                  />
                )}
              </p>
              <p className='basis-1/2'>{item.userInfo?.nickname}</p>
            </div>
            <div>{onDateTimeHandler(item.commentDate)}</div>
          </div>
          {editedCommentId === item.commentId ? (
            <div>
              <input
                type='text'
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <button onClick={() => onUpdateCommentHandler(item.commentId)}>
                수정 완료
              </button>
            </div>
          ) : (
            <div>
              <p>{item.commentContent}</p>
              <div>
                {item.userInfo?.userId === userId ? (
                  <>
                    <button
                      onClick={() => onDeleteCommentHandler(item.commentId)}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        setEditedCommentId(item.commentId)
                        setEditedText(item.commentContent)
                      }}
                    >
                      수정하기
                    </button>
                    <button onClick={() => onLikeHandler(item.commentId)}>
                      {item.commentLikeList.includes(userId) ? (
                        <>
                          <p>좋아요 취소</p>
                          <p>{item.commentLikeList.length}</p>
                        </>
                      ) : (
                        <>
                          <p>좋아요</p>
                          <p>{item.commentLikeList.length}</p>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button onClick={() => onLikeHandler(item.commentId)}>
                    {item.commentLikeList.includes(userId) ? (
                      <>
                        <p>좋아요 취소</p>
                        <p>{item.commentLikeList.length}</p>
                      </>
                    ) : (
                      <>
                        <p>좋아요</p>
                        <p>{item.commentLikeList.length}</p>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CommentsList
