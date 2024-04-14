'use client'
import { useQuery } from '@tanstack/react-query'
import { getComments } from '@/shared/comments/commentsApi'
import Image from 'next/image'
import { onDateTimeHandler } from '@/util/util'

const CommentsList = () => {
  const { data: commentsData } = useQuery({
    queryFn: () => getComments(),
    queryKey: ['comments'],
  })

  return (
    <div>
      {commentsData?.map((item) => (
        <div>
          <span className='flex h-5 w-5 overflow-hidden rounded-full bg-slate-200'>
            {item.userInfo?.userImage && (
              <Image
                src={item.userInfo.userImage}
                alt=''
                width={20}
                height={20}
              />
            )}
          </span>
          닉네임 :{item.userInfo?.nickname}
          <br />
          {item.commentContent} <br />
          {onDateTimeHandler(item.commentDate)} <br />
        </div>
      ))}
    </div>
  )
}

export default CommentsList
