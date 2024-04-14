'use client'

import { useState } from 'react'
import { getToday } from '@/util/util'
import { useSession } from 'next-auth/react'
import { addComment } from '@/shared/comment/commentApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import submitIcon from '@/../public/images/Icon.svg'
import Image from 'next/image'

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
      <div className='inline-flex w-[732px] items-center justify-start gap-8 rounded-xl border-2 border-white border-opacity-10 bg-white bg-opacity-10 p-3'>
        <form onSubmit={onCommentSubmitHandler} className='flex items-center'>
          <input
            type='text'
            placeholder='댓글을 작성해주세요'
            className='w-[620px] appearance-none bg-transparent focus:outline-none'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button className='flex flex-row items-center' type='submit'>
            <p className='mr-2'>등록하기</p>
            <Image src={submitIcon} alt='등록 아이콘' width={8} height={14} />
          </button>
        </form>
      </div>
    </>
  )
}

export default CommentForm
