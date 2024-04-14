import { useCurrentMusicStore } from '@/shared/store/playerStore'

import Image from 'next/image'
import React, { useEffect } from 'react'

const Pl = () => {
  const { currentMusic } = useCurrentMusicStore()
  const { currentPlayList, musicIndex }: any = currentMusic

  if (
    !currentPlayList ||
    currentPlayList.length === 0 ||
    musicIndex === undefined
  ) {
    return
  }
  useEffect(() => {
    currentMusic(currentPlayList, musicIndex)
  }, [currentMusic, currentPlayList, musicIndex])

  return (
    <div>
      <div className='mt-[40px] flex flex-col items-center gap-[8px] p-[0px]'>
        <div className=' text-center text-[20px] font-bold leading-[150%]  tracking-tighter text-white opacity-80'>
          {currentPlayList[musicIndex].musicTitle}
        </div>

        <div className='text-center text-[18px] leading-[150%] tracking-tighter text-white opacity-50'>
          {currentPlayList[musicIndex].artist}
        </div>
      </div>
      <div className='relative ml-[44px] mr-[44px] mt-[41px]'>
        {/* <div className='relative'>
      <Image
        src={musicThumbnail}
        alt='Album Circle'
        width={300}
        height={300}
      />
    </div> */}
        <div className='absolute left-[41px] top-[41px] h-[200px] w-[200px] '>
          <Image
            src={currentPlayList[musicIndex].thumbnail}
            alt='Album Thumbnail'
            width={200}
            height={200}
            className='rounded-full'
          />
        </div>
      </div>
      {/* <div className='mx-auto flex items-center px-[24px]'>
    <div className='flex w-[316px] justify-between'>
      <button onClick={onLyricsToggle}>
        {isLyrics ? (
          <div>
            <Image
              src={musicList}
              alt='Lyrics'
              width={48}
              height={48}
            />

            <div>{currentPlayList[musicIndex].lyrics}</div>
          </div>
        ) : (
          <Image
            src={musicLyricsButton}
            alt='Lyrics'
            width={48}
            height={48}
          />
        )}
      </button>
      <button type='button' onClick={onInsertMyPlayListHandler}>
        <Image
          src={myPlayListButton}
          alt='Album Circle'
          width={48}
          height={48}
        />
      </button>
    </div>
  </div> */}
    </div>
  )
}

export default React.memo(Pl)
