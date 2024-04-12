'use client'

import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import { MusicInfoType } from '@/types/musicPlayer/types'
import Image from 'next/image'
import { useState } from 'react'

const ModalMusicData = ({
  item,
  index,
}: {
  item: MusicInfoType
  index: number
}) => {
  const {
    chooseMusic,
    setChooseMusic,
    isChooseMusic,
    setIsChooseMusic,
    selectedCardIndex,
    setSelectedCardIndex,
  } = useMusicSearchedStore()

  const onAddMusicBoardHandler = async (index: number | null) => {
    if (selectedCardIndex === index && isChooseMusic) {
      setSelectedCardIndex(null)
      setIsChooseMusic(false)
      setChooseMusic(null)
    } else {
      setSelectedCardIndex(index)
      setIsChooseMusic(true)
      setChooseMusic(item)
    }
  }

  return (
    <div
      key={item.musicId}
      className={`flex gap-[12px] items-center space-x-3 justify-center h-[104px] px-5 py-4 rounded-[16px] cursor-pointer ${
        selectedCardIndex === index && isChooseMusic
          ? 'bg-[#685BFF]'
          : 'bg-#D9D9D9-800'
      } `}
      onClick={() => onAddMusicBoardHandler(index)}
    >
      <div className='flex'>
        <div>
          <Image
            src={item.thumbnail}
            alt='Album Thumbnail'
            width={100}
            height={100}
            className='rounded-lg'
          />
        </div>
        {/* 정보 */}
        <div className='flex flex-col'>
          <div className='font-bold'>Title {item.musicTitle}</div>
          <div className='text-gray-600'>Artist {item.artist}</div>
          <div className='text-gray-600'>{item.release}</div>
        </div>
      </div>
      {/* 이미지 */}
    </div>
  )
}

export default ModalMusicData
