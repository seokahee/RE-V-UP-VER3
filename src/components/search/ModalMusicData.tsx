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
      className={` flex w-[100%] cursor-pointer justify-start gap-[12px] space-x-3 rounded-[16px]  px-5 py-4 ${
        selectedCardIndex === index && isChooseMusic
          ? 'bg-[#685BFF]'
          : 'bg-[rgba(255,255,255,0.1)]'
      } `}
      onClick={() => onAddMusicBoardHandler(index)}
    >
      <div className='flex gap-[16px]'>
        <div className='flex'>
          <div>
            <Image
              src={item.thumbnail}
              alt='Album Thumbnail'
              width={48}
              height={48}
              className='rounded-lg'
            />
          </div>
          <div className='flex'>
            <div>
              <div className='font-bold'>Title {item.musicTitle}</div>
              <div className='text-[rgba(255,255,255,0.5)]'>
                Artist {item.artist}
              </div>
            </div>
            <div className='text-[rgba(255,255,255,0.5)]'>{item.runTime}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalMusicData
