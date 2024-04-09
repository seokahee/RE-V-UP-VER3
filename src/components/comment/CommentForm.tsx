'use client'

import { useState } from 'react'
import { getToday } from '@/util/util'
import { useStore } from '@/shared/store'
import { addComment } from '@/shared/comment/commentApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const CommentForm = () => {
  const { userInfo } = useStore()
  const queryClient = useQueryClient()
  const [comment, setComment] = useState<string>('')

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

    if (userInfo.uid === '') {
      alert('로그인 후 이용해 주세요')
      return
    }

    if (!comment) {
      alert('댓글을 입력해 주세요!')
      return
    }

    //boardId : 일단 원래있는 데이터 가져와끌어오기
    const newComment = {
      userId: userInfo.uid,
      boardId: 'b165ff75-9818-47b6-95fb-e2cc268ed410',
      commentLikeList: [],
      commentDate: getToday(),
      commentContent: comment,
    }
    addCommentMutation.mutate(newComment)
    alert('등록이 완료됐습니다.')
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
