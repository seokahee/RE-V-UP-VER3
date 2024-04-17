'use client'

import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import type { MusicInfoType } from '@/types/musicPlayer/types'
import Image from 'next/image'

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
      className={` flex w-[387px] cursor-pointer gap-[12px] space-x-3 rounded-[16px]  px-5 py-4 ${
        selectedCardIndex === index && isChooseMusic
          ? 'bg-[#685BFF]'
          : 'bg-[rgba(255,255,255,0.1)]'
      } `}
      onClick={() => onAddMusicBoardHandler(index)}
    >
      <section className='flex w-full justify-between'>
        <article className='flex gap-[16px]'>
          <div className='flex  items-center gap-[16px]'>
            <div className='h-[48px] w-[48px] rounded-full'>
              <Image
                src={item.thumbnail}
                alt='Album Thumbnail'
                width={48}
                height={48}
                className='rounded-full'
              />
            </div>
            <section className='flex flex-col justify-between '>
              <div className=' font-bold'>Title {item.musicTitle}</div>
              <div className='text-[rgba(255,255,255,0.5)]'>
                Artist {item.artist}
              </div>
            </section>
          </div>
        </article>
        <article className='flex'>
          <div className=' flex items-center text-[rgba(255,255,255,0.5)]'>
            <p>{item.runTime}</p>
          </div>
        </article>
      </section>
    </div>
  )
}

export default ModalMusicData
