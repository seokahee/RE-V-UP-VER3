'use client'

import { useState } from 'react'
import { getToday } from '@/util/util'
import { useSession } from 'next-auth/react'
import { addComment } from '@/shared/comment/commentApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const CommentForm = ({ boardId }: { boardId: string }) => {
  const [comment, setComment] = useState<string>('')
  const queryClient = useQueryClient()
  const { data: userSessionInfo } = useSession()
  const userId = userSessionInfo?.user.uid as string

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
      setComment('')
    },
  })

  const onCommentSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    if (userId === '') {
      alert('로그인 후 이용해 주세요')
      return
    }

    if (!comment) {
      alert('댓글을 입력해 주세요!')
      return
    }

    const newComment = {
      userId: userId,
      boardId: boardId,
      commentLikeList: [],
      commentDate: getToday(),
      commentContent: comment,
    }
    addCommentMutation.mutate(newComment)
    alert('댓글 등록이 완료됐습니다.')
  }
  return (
    <>
      <p>댓글 달기</p>
      <div>
        <form onSubmit={onCommentSubmitHandler}>
          <label className='relative '>
            <input
              type='text'
              placeholder='댓글을 작성해주세요'
              className='w-96 border-2 border-rose-600'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className='absolute bottom-0 right-0'>
              <button>등록하기▷</button>
            </div>
          </label>
        </form>
      </div>
    </>
  )
}

export default CommentForm
