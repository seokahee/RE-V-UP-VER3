'use client'

import { MusicInfoType } from '@/types/musicPlayer/types'
import Image from 'next/image'
import { useState } from 'react'

const ModalMusicData = ({ item }: { item: MusicInfoType }) => {
  const onAddMusicBoardHandler = async () => {
    setChooseMusics(item)
  }
  return (
    <div
      key={item.musicId}
      className='flex gap-[2px] items-center space-x-3 cursor-pointer'
      onClick={onAddMusicBoardHandler}
    >
      {/* 이미지 */}
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
  )
}

export default ModalMusicData
