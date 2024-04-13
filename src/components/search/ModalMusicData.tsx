'use client'

import Image from 'next/image'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import type { MusicInfoType } from '@/types/musicPlayer/types'

const ModalMusicData = ({
  item,
  index,
}: {
  item: MusicInfoType
  index: number
}) => {
  const {
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
      className={`flex h-[104px] cursor-pointer items-center justify-center gap-[12px] space-x-3 rounded-[16px] px-5 py-4 ${
        selectedCardIndex === index && isChooseMusic
          ? 'bg-[#685BFF]'
          : 'bg-#D9D9D9-800'
      } `}
      onClick={() => onAddMusicBoardHandler(index)}
    >
      {/* 이미지 */}
      <div className='flex gap-[16px]'>
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
          <div className='text-gray-600'>{item.runTime}</div>
        </div>
      </div>
    </div>
  )
}

export default ModalMusicData
