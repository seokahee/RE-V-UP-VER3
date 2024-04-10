'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  addLikedUser,
  getClickLikedUser,
  removeLikedUser,
} from '@/shared/communitydetail/detailApi'
import { useStore } from '@/shared/store'
import touchFullLike from '@/../public/images/likeFullHeart.svg'
import { Props } from '@/types/communityDetail/detailTypes'

const LikeButton = ({ boardId }: Props) => {
  const { userInfo } = useStore()
  const { uid } = userInfo
  const [like, setLike] = useState<boolean | null>(null)
  const [likeList, setLikeList] = useState<string[]>([])

  useEffect(() => {
    const likedStatus = async () => {
      const clickLikedUser = await getClickLikedUser(boardId)

      if (
        clickLikedUser &&
        clickLikedUser?.likeList &&
        clickLikedUser.likeList.includes(uid)
      ) {
        setLike(true)
      } else {
        setLike(false)
      }
      setLikeList(clickLikedUser?.likeList || [])
    }

    likedStatus()
  }, [uid, boardId])

  const onLikeToggleHandler = async () => {
    if (!uid) {
      alert('로그인 후 이용해 주세요.')
      return
    }

    if (like) {
      await removeLikedUser(likeList, boardId, uid)
      setLike(false)
      setLikeList((prevLikeList) => prevLikeList.filter((id) => id !== uid))
    } else {
      await addLikedUser(likeList, boardId, uid)
      setLike(true)
      setLikeList((prevLiketest) => [...prevLiketest, uid])
    }
    const updatedLikeList = like
      ? likeList.filter((id) => id !== uid)
      : [...likeList, uid]
    setLikeList(updatedLikeList)
    setLike(!like)
  }

  return (
    <div>
      <div>
        {like ? (
          <figure onClick={onLikeToggleHandler}>
            <Image
              src={touchFullLike}
              alt='좋아요버튼'
              width={24}
              height={24}
            />
          </figure>
        ) : (
          <div
            onClick={onLikeToggleHandler}
            className='w-[24px] heigth-[24px] text-[24px]'
          >
            <button>♡</button>
          </div>
        )}
        <p className='ml-[5px]'>{likeList !== null ? likeList?.length : 0}</p>
      </div>
    </div>
  )
}

export default LikeButton
