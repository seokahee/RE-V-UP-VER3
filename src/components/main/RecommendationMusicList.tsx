'use client'

import { getGenreMusicData } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import GenreMusicItem from './GenreMusicItem'

const RecommendationMusicList = ({
  musicPreferenceData,
}: {
  musicPreferenceData: number[]
}) => {
  const [position, setPosition] = useState(0)

  const MOVE_POINT = 136 + 24 //임시값 - 슬라이드로 이동할 값

  //mbti 있을 때
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getGenreMusicData(musicPreferenceData),
    queryKey: ['mainGenreMusic', musicPreferenceData],
    enabled: !!musicPreferenceData,
  })

  const onClickPrevHandler = () => {
    if (position < 0) {
      setPosition((prev) => prev + MOVE_POINT)
    }
  }

  const onClickNextHandler = () => {
    setPosition((prev) => prev - MOVE_POINT)
  }

  return (
    <section className='p-4'>
      <h2>이런 음악은 어떠신가요? 🎶</h2>
      <div className='relative flex overflow-hidden'>
        <ul
          className='flex flex-nowrap'
          style={{
            transition: 'all 0.4s ease-in-out',
            transform: `translateX(${position}px)`,
          }}
        >
          {data?.map((item) => {
            return <GenreMusicItem key={item.musicId} item={item} />
          })}
        </ul>
        <div>
          {position !== ((data?.length as number) - 1) * -MOVE_POINT && (
            <button
              type='button'
              className='absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black text-white'
              onClick={onClickNextHandler}
            >
              NEXT
            </button>
          )}
          {position !== 0 && (
            <button
              type='button'
              className='absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black text-white'
              onClick={onClickPrevHandler}
            >
              PREV
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default RecommendationMusicList
