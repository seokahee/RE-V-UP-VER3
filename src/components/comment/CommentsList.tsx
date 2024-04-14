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
import edit from '@/../public/images/pencil-01.svg'
import deleteIcon from '@/../public/images/Frame 532.svg'
import emptyHeart from '@/../public/images/Property 1=heart-rounded.svg'
import heart from '@/../public/images/heart-rounded.svg'

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
    alert('선택한 댓글을 삭제하시겠습니까?')
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

    likeCommentMutation.mutate({ commentId, userId })
  }

  return (
    <div className='border-t-2 border-black'>
      {commentsData?.map((item) => (
        <div key={item.commentId}>
          <div className='inline-flex  w-full flex-col items-start justify-start gap-4 border-b border-white border-opacity-10 py-4'>
            <div className=' flex w-full flex-row '>
              <div className='flex basis-1/2 flex-row gap-2'>
                <p className='h-6 w-6 overflow-hidden rounded-full border-2 border-white'>
                  {item.userInfo?.userImage && (
                    <Image
                      src={item.userInfo.userImage}
                      alt=''
                      width={20}
                      height={20}
                      className='rounded-full object-cover'
                    />
                  )}
                </p>
                <p>{item.userInfo?.nickname}</p>
              </div>{' '}
              <div className='flex basis-1/2 justify-end '>
                {onDateTimeHandler(item.commentDate)}
              </div>
            </div>
            <div className=' flex w-full flex-row '>
              {/**유저 이미지, 닉네임, 날짜 */}
              {editedCommentId === item.commentId ? (
                <div className=' flex w-full '>
                  <div className='flex basis-1/2'>
                    {' '}
                    <input
                      type='text'
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className='w-[620px] appearance-none bg-transparent focus:outline-none'
                    />
                  </div>
                  <div className='flex basis-1/2 justify-end'>
                    {' '}
                    <button
                      onClick={() => onUpdateCommentHandler(item.commentId)}
                    >
                      수정 완료
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex w-full flex-row '>
                  <div className='flex basis-1/2'>
                    <p>{item.commentContent}</p>
                  </div>
                  <div className='flex basis-1/2 justify-end'>
                    {item.userInfo?.userId === userId && (
                      <>
                        <button
                          onClick={() => {
                            setEditedCommentId(item.commentId)
                            setEditedText(item.commentContent)
                          }}
                        >
                          <Image
                            src={edit}
                            alt='수정 아이콘'
                            width={18}
                            height={18}
                          />
                        </button>{' '}
                        <button
                          onClick={() => onDeleteCommentHandler(item.commentId)}
                        >
                          <Image
                            src={deleteIcon}
                            alt='삭제 아이콘'
                            width={24}
                            height={24}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className='flex items-center'>
              <button onClick={() => onLikeHandler(item.commentId)}>
                {item.commentLikeList.includes(userId) ? (
                  <>
                    <Image src={heart} alt='찬 하트' width={24} height={24} />
                    <p>{item.commentLikeList.length}</p>
                  </>
                ) : (
                  <>
                    <Image
                      src={emptyHeart}
                      alt='빈 하트'
                      width={24}
                      height={24}
                    />
                    <p>{item.commentLikeList.length}</p>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
      <br />
    </div>
  )
}

export default CommentsList
