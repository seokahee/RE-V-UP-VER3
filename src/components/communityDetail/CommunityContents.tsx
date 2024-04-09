'use client'

import { FormEvent, MouseEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import {
  deleteCommunityMutation,
  readCommunityDetail,
} from '@/shared/communitydetail/detailApi'
import { COMMUNITY_QUERY_KEY } from '@/query/communityDetail/communityQueryKey'
import Image from 'next/image'
import { onDateHandler } from '@/util/util'
import LikeButton from './LikeButton'

const CommunityContents = () => {
  const router = useRouter()
  const { id } = useParams()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const {
    data: readDetailData,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryKey: [COMMUNITY_QUERY_KEY.READ_BOARD, id],
    queryFn: () => readCommunityDetail(id.toString()),
  })

  const onDeleteBoardHandler = async (e: MouseEvent) => {
    e.preventDefault()
    await deleteCommunityMutation(id)
  }

  const onBackButtonHandler = () => {
    router.back()
  }

  if (isPending && isLoading) {
    return <div>정보를 가져오고 있습니다..로딩바자리임</div>
  }
  if (error) {
    return <div>정보를 가져오지 못하고 있습니다. 로딩바자뤼</div>
  }
  return (
    <div>
      {readDetailData?.map(
        ({
          boardId,
          boardTitle,
          date,
          content,
          likeList,
          userInfo,
          comment,
          musicInfo,
        }) => {
          const { nickname, userImage } = userInfo!
          const { musicTitle, artist, thumbnail } = musicInfo!
          if (!likeList || !date || !comment || !thumbnail) return
          return (
            <div>
              <button onClick={onBackButtonHandler}>이전으로 가기</button>
              <button type='button' onClick={onDeleteBoardHandler}>
                삭제
              </button>
              <div key={boardId}>
                <div>{boardTitle}</div>
                <div>{nickname}</div>
                <figure>
                  {userImage ? (
                    <Image
                      src={`${userImage}`}
                      alt='유저 이미지'
                      width={56}
                      height={56}
                    />
                  ) : null}
                </figure>
                <div>{onDateHandler(date)}</div>
                <figure>
                  <Image
                    src={thumbnail}
                    alt='노래 앨범 이미지'
                    width={56}
                    height={56}
                  />
                </figure>
                <div>{musicTitle}</div>
                <div>{artist}</div>
                <div>{content}</div>
                <div>
                  <LikeButton />
                  {likeList.length}
                </div>
                <div>{comment.length}</div>
              </div>
            </div>
          )
        },
      )}
    </div>
  )
}

export default CommunityContents
