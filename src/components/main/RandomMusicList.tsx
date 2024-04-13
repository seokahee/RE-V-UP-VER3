'use client'

import { getRandomMusicData } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import GenreMusicItem from './GenreMusicItem'
import Image from 'next/image'

import SlideButton from './SlideButton'
import SectionTitle from './SectionTitle'

const RandomMusicList = () => {
  const [position, setPosition] = useState(0)

  const MOVE_POINT = 136 + 24 //임시값 - 슬라이드로 이동할 값

  //없을 때
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getRandomMusicData(),
    queryKey: ['mainGenreMusic'],
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
    <section className='my-8'>
      <SectionTitle>이런 음악은 어떠신가요?🎶</SectionTitle>
      <div className='relative flex overflow-hidden'>
        <ul
          className='flex flex-nowrap py-1'
          style={{
            transition: 'all 0.4s ease-in-out',
            transform: `translateX(${position}px)`,
          }}
        >
          {data?.map((item) => {
            return <GenreMusicItem key={item.musicId} item={item} />
          })}
        </ul>
        <SlideButton
          position={position}
          movePoint={MOVE_POINT}
          length={data?.length ? data?.length : 0}
          onClickNextHandler={onClickNextHandler}
          onClickPrevHandler={onClickPrevHandler}
        />
      </div>
    </section>
  )
}

export default RandomMusicList
