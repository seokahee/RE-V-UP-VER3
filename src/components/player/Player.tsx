import addCurrMusic from '@/../public/images/community-detail-Image/add-current-music.svg'
import addMyPlayList from '@/../public/images/community-detail-Image/add-my-playlist.svg'
import musicLyricsButton from '@/../public/images/musicLyricsButton.svg'
import musicShuffle from '@/../public/images/musicShuffle.svg'
import musicShuffleOff from '@/../public/images/musicShuffleOff.svg'
import musicThumbnail from '@/../public/images/musicThumbnail.svg'
import musicThumbnailDefault from '@/../public/images/musicThumbnailDefault.svg'
import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import { useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { ADD_CURRENT_MUSIC_SHADOW } from '../communityDetail/communityCss'
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
            {currentPlaying ? currentPlaying.musicTitle : 'V-UP'}
          </div>

          <div className='text-center text-[18px] leading-[150%] tracking-tighter text-white opacity-50'>
            {currentPlaying ? currentPlaying.artist : '-'}
          </div>
        </div>

        <div className='relative ml-[44px] mr-[44px] mt-[41px]'>
          {currentPlaying ? (
            <div className=' h-[300px] w-[300px]'>
              <Image
                src={musicThumbnail}
                alt='Album Circle'
                width={300}
                height={300}
                className='rounded-full shadow-[0px_0px_16px_rgba(210,137,176,0.5)]'
              />
            </div>
          ) : (
            <div className=' h-[300px] w-[300px]'>
              <Image
                src={musicThumbnailDefault}
                alt='Album Circle'
                width={300}
                height={300}
                className='rounded-full shadow-[0px_4px_4px_-5px_rgba(0,0,0,0.25)]'
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
                className='rounded-full'
              />
            </div>
          ) : null}
        </div>

        <div className='mx-auto flex items-center px-[24px]'>
          <div className='flex w-[316px] justify-between'>
            <button onClick={onLyricsToggle} className='h-[48px] w-[48px]'>
              {isLyrics ? (
                <Image
                  src={addCurrMusic}
                  alt='Lyrics'
                  width={48}
                  height={48}
                  className={`flex items-center justify-center rounded-[100%] border border-solid border-[#292929] bg-[#292929] p-[8px] ${ADD_CURRENT_MUSIC_SHADOW} `}
                />
              ) : (
                <Image
                  src={musicLyricsButton}
                  alt='Lyrics'
                  width={48}
                  height={48}
                  className={`flex  items-center justify-center rounded-[100%] border border-solid border-[#292929] bg-[#292929] p-[8px] ${ADD_CURRENT_MUSIC_SHADOW}`}
                />
              )}
            </button>
            <button
              type='button'
              className={`flex h-[48px] w-[48px] items-center justify-center rounded-[100%] border border-solid border-[#292929] bg-[#292929] p-[8px] ${ADD_CURRENT_MUSIC_SHADOW}`}
              onClick={onInsertMyPlayListHandler}
            >
              <Image
                src={addMyPlayList}
                alt='마이플레이리스트에 저장 아이콘'
                width={24}
                height={24}
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
          className='absolute translate-x-[318px] translate-y-[87px] cursor-pointer'
        />
      </div>
    </div>
  )
}

export default Player
// 함수가 정상적으로 작동하지 않을경우(상태유지 불가 등) 함수 호출부, 사용하는곳부터 뒤져보기!!!!!!!!!!!!!!!!
