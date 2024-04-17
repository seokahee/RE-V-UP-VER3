import musicList from '@/../public/images/musicList.svg'
import musicLyricsButton from '@/../public/images/musicLyricsButton.svg'
import musicShuffle from '@/../public/images/musicShuffle.svg'
import musicShuffleOff from '@/../public/images/musicShuffleOff.svg'
import musicThumbnail from '@/../public/images/musicThumbnail.svg'
import musicThumbnailDefault from '@/../public/images/musicThumbnailDefault.svg'
import myPlayListButton from '@/../public/images/myPlayListButton.svg'
import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import { useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './AudioCss.css'
import FaForward from './playerIcons/FaForward'
import MyLoopIcon from './playerIcons/MyLoopIcon'
import MyLoopOffIcon from './playerIcons/MyLoopOffIcon'
import MyNextIcon from './playerIcons/MyNextIcon'
import MyPauseIcon from './playerIcons/MyPauseIcon'
import MyPlayIcon from './playerIcons/MyPlayIcon'
import MyPreviousIcon from './playerIcons/MyPreviousIcon'

const Player = ({
  currentPlaying,
  setCurrentPlaying,
  isLyrics,
  isRandom,
  currentPlayList,
  musicIndex,
  onPreviousHandler,
  onNextTrackHandler,
  onLyricsToggle,
  onInsertMyPlayListHandler,
  onRandomMusicHandler,
}: PlayerProps) => {
  useEffect(() => {
    if (!currentPlaying && currentPlayList.length > 0 && musicIndex !== null) {
      setCurrentPlaying(currentPlayList[musicIndex])
    } else if (currentPlaying && currentPlayList.length === 0) {
      setCurrentPlaying(null)
    }
  }, [musicIndex, currentPlayList, currentPlaying])

  const customIcons = {
    play: <MyPlayIcon />,
    pause: <MyPauseIcon />,
    previous: <MyPreviousIcon onPreviousHandler={onPreviousHandler} />,
    next: <MyNextIcon onNextTrackHandler={onNextTrackHandler} />,
    loop: <MyLoopIcon />,
    loopOff: <MyLoopOffIcon />,
    progressJump: <FaForward />,
  }
  const onplayHandler = (arg: any) => {
    setCurrentPlaying(arg)
  }

  return (
    <div>
      <div className='flex flex-col items-center'>
        <div className='mt-[40px] flex flex-col items-center gap-[8px] p-[0px]'>
          <div className=' text-center text-[20px] font-bold leading-[150%]  tracking-tighter text-white opacity-80'>
            {currentPlaying?.musicTitle}
          </div>

          <div className='text-center text-[18px] leading-[150%] tracking-tighter text-white opacity-50'>
            {currentPlaying?.artist}
          </div>
        </div>

        <div className='relative ml-[44px] mr-[44px] mt-[41px]'>
          {currentPlaying ? (
            <div className='relative h-[300px] w-[300px]'>
              <Image
                src={musicThumbnail}
                alt='Album Circle'
                width={300}
                height={300}
                className='h-[300px] w-[300px] rounded-full shadow-[0px_1px_30px_-5px_rgba(210,137,176,0.5)]'
              />
            </div>
          ) : (
            <div className='relative h-[300px] w-[300px]'>
              <Image
                src={musicThumbnailDefault}
                alt='Album Circle'
                width={300}
                height={300}
                className='h-[300px] w-[300px] rounded-full '
              />
            </div>
          )}
          {currentPlaying ? (
            <div className='absolute left-[50px] top-[50px] h-[200px] w-[200px] '>
              <Image
                src={currentPlaying.thumbnail}
                alt='Album Thumbnail'
                width={200}
                height={200}
                className='h-[200px] w-[200px] rounded-full'
              />
            </div>
          ) : null}
        </div>

        <div className='mx-auto flex items-center px-[24px]'>
          <div className='flex w-[316px] justify-between'>
            <button onClick={onLyricsToggle} className='h-[48px] w-[48px]'>
              {isLyrics ? (
                <Image src={musicList} alt='Lyrics' width={48} height={48} />
              ) : (
                <Image
                  src={musicLyricsButton}
                  alt='Lyrics'
                  width={48}
                  height={48}
                  className='rounded-full border-2  border-black border-opacity-10 shadow-[0px_4px_1px_-1px_rgba(0,0,0,0.2),_0px_4px_8px_rgba(0,0,0,0.1),_0px_0px_0px_1px_rgba(255,255,255,0.15),_inset_0px_2px_0px_rgba(255,255,255,0.1),_inset_0px_-1px_2px_rgba(0,0,0,0.2),_inset_0px_-4px_1px_rgba(0,0,0,0.2)]'

                  // className='rounded-full border-4 border-black border-opacity-10 bg-white bg-opacity-10 shadow shadow-inner'
                  // className='shadow-outline-white h-[48px] w-[48px] rounded-full  bg-gradient-to-br from-zinc-600 shadow-md'
                  // className='h-[48px] w-[48px] rounded-full border-2 border-black border-opacity-10 bg-white bg-opacity-5 shadow shadow-inner'
                />
              )}
            </button>
            <button type='button' onClick={onInsertMyPlayListHandler}>
              <Image
                src={myPlayListButton}
                alt='Album Circle'
                width={48}
                height={48}
                className='shadow-outline-white h-[48px] w-[48px] rounded-full  bg-gradient-to-br from-zinc-600 shadow-md'
              />
            </button>
          </div>
        </div>
      </div>

      <div className='flex items-center'>
        <AudioPlayer
          src={currentPlaying ? currentPlaying.musicSource : ''}
          volume={0.5}
          loop={false}
          onEnded={onNextTrackHandler}
          showSkipControls={true}
          customIcons={customIcons}
          onPlay={() => {
            onplayHandler(currentPlaying)
          }}
        />
        <Image
          src={isRandom ? musicShuffleOff : musicShuffle}
          alt='shuffle'
          width={50}
          height={60}
          onClick={onRandomMusicHandler}
          className='absolute translate-x-[295px] translate-y-[87px] cursor-pointer'
        />
      </div>
    </div>
  )
}

export default Player
// 함수가 정상적으로 작동하지 않을경우(상태유지 불가 등) 함수 호출부, 사용하는곳부터 뒤져보기!!!!!!!!!!!!!!!!
