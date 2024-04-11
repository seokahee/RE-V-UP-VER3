'use client'

import Image from 'next/image'
import { getToday } from '@/util/util'
import { useStore } from '@/shared/store'
import { useQuery } from '@tanstack/react-query'
import { onCommentHandler } from '@/util/util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getComments,
  deleteComment,
  updateComment,
  addLikeComment,
} from '@/shared/comment/commentApi'
import { useState } from 'react'

const CommentsList = ({ boardId }: { boardId: string }) => {
  const { userInfo } = useStore()
  const queryClient = useQueryClient()
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editedText, setEditedText] = useState<string>('')

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
    setEditMode(false)
  }

  const likeCommentMutation = useMutation({
    mutationFn: addLikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    },
  })

  const onLikeHandler = (commentId: string) => {
    const userId = userInfo.uid
    if (!userId) {
      alert('로그인 후 이용해 주세요')
      return
    }

    alert('좋아요 테스트중')
    likeCommentMutation.mutate({ commentId, userId })
  }

  const onChangeEditmode = () => {
    setEditMode(true)
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
            <div className='basis-1/2'>{item.commentContent}</div>
            <div>
              {item.commentLikeList?.includes(item.userInfo.userId) ? '1' : '2'}
            </div>
            <div className='basis-1/2'>
              {item.userInfo?.userId === userInfo.uid ? (
                <>
                  <button
                    onClick={() => onDeleteCommentHandler(item.commentId)}
                  >
                    삭제
                  </button>
                  <button onClick={onChangeEditmode}>수정하기</button>
                  <button onClick={() => onLikeHandler(item.commentId)}>
                    좋아요 {item.commentLikeList.length}
                  </button>{' '}
                </>
              ) : (
                <>
                  <button onClick={() => onLikeHandler(item.commentId)}>
                    좋아요 {item.commentLikeList.length}
                  </button>{' '}
                </>
              )}
              {editMode && (
                <>
                  <input
                    type='text'
                    defaultValue={item.commentContent}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button
                    onClick={() => onUpdateCommentHandler(item.commentId)}
                  >
                    완료
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
