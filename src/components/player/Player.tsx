import musicLyricsButton from '@/../public/images/musicLyricsButton.svg'
import musicThumbnail from '@/../public/images/musicThumbnail.svg'
import musicList from '@/../public/images/musicList.svg'
import myPlayListButton from '@/../public/images/myPlayListButton.svg'
import playerPreviousButton from '@/../public/images/playerPreviousButton.svg'
import playerNextButton from '@/../public/images/playerNextButton.svg'
import playerPlayButton from '@/../public/images/playerPlayButton.svg'
import playerPauseButton from '@/../public/images/playerPauseButton.svg'
import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './AudioCss.css'
import { useRef, useState } from 'react'
const Player = ({
  isLyrics,
  currentPlayList,
  musicIndex,
  onPreviousHandler,
  onNextTrackHandler,
  onLyricsToggle,
  onInsertMyPlayListHandler,
}: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const isPlay = currentPlayList?.length > 0
  const audioRef = useRef(null)

  const onPlayHandler = () => {
    // if (isPlaying && isPlay && audioRef.current) {
    //   audioRef.current.onPlay()
    //   setIsPlaying(!isPlaying)
    // }
  }
  return (
    <div>
      {isPlay && (
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
            <div className='relative'>
              <Image
                src={musicThumbnail}
                alt='Album Circle'
                width={300}
                height={300}
              />
            </div>
            <div className='absolute left-[41px] top-[41px] h-[200px] w-[200px] '>
              <Image
                src={currentPlayList[musicIndex].thumbnail}
                alt='Album Thumbnail'
                width={200}
                height={200}
                className=' rounded-full '
              />
            </div>
          </div>
          <div className='mx-auto flex items-center px-[24px]'>
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
          </div>
        </div>
      )}
      <AudioPlayer
        ref={audioRef}
        autoPlay={false}
        loop={false}
        volume={0.1}
        src={isPlay ? currentPlayList[musicIndex].musicSource : ''}
        onEnded={onNextTrackHandler}
      />
      이전곡 버튼
      <button onClick={onPreviousHandler}>
        <Image
          src={playerPreviousButton}
          alt='Previous'
          width={48}
          height={48}
        />
      </button>
      {/* 재생버튼 */}
      <button onClick={onPlayHandler}>
        <Image
          src={isPlaying ? playerPauseButton : playerPlayButton}
          alt={isPlaying ? 'Pause' : 'Play'}
          width={48}
          height={48}
        />
      </button>
      {/* 다음곡 버튼 */}
      <button onClick={onNextTrackHandler}>
        <Image src={playerNextButton} alt='Next' width={48} height={48} />
      </button>
    </div>
  )
}

export default Player
