import musicList from '@/../public/images/musicList.svg'
import musicLyricsButton from '@/../public/images/musicLyricsButton.svg'
import musicShuffle from '@/../public/images/musicShuffle.svg'
import musicShuffleOff from '@/../public/images/musicShuffleOff.svg'
import musicThumbnail from '@/../public/images/musicThumbnail.svg'
import myPlayListButton from '@/../public/images/myPlayListButton.svg'
import { CurrentPlayListType, PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import { useState } from 'react'
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
  isLyrics,
  currentPlayList,
  musicIndex,
  isRandom,
  onPreviousHandler,
  onNextTrackHandler,
  onLyricsToggle,
  onInsertMyPlayListHandler,
  onRandomMusicHandler,
}: PlayerProps) => {
  const [playList, setPlayList] = useState<CurrentPlayListType[]>([])
  const [currentPlaying, setCurrentPlaying] = useState()
  const isPlayList = currentPlayList?.length > 0

  const customIcons = {
    play: <MyPlayIcon />,
    pause: <MyPauseIcon />,
    previous: <MyPreviousIcon onPreviousHandler={onPreviousHandler} />,
    next: <MyNextIcon onNextTrackHandler={onNextTrackHandler} />,
    loop: <MyLoopIcon />,
    loopOff: <MyLoopOffIcon />,
    progressJump: <FaForward />,
  }

  return (
    <div>
      {isPlayList && (
        <div className='flex flex-col items-center'>
          <div className='mt-[40px] flex flex-col items-center gap-[8px] p-[0px]'>
            <div className=' text-center text-[20px] font-bold leading-[150%]  tracking-tighter text-white opacity-80'>
              {currentPlayList[musicIndex].musicTitle}
            </div>

            <div className='text-center text-[18px] leading-[150%] tracking-tighter text-white opacity-50'>
              {currentPlayList[musicIndex].artist}
            </div>
          </div>
          <div className='relative ml-[44px] mr-[44px] mt-[41px]'>
            <div className='relative h-[300px] w-[300px]'>
              <Image
                src={musicThumbnail}
                alt='Album Circle'
                width={300}
                height={300}
                className='h-[300px] w-[300px]'
              />
            </div>
            <div className='absolute left-[50px] top-[50px] h-[200px] w-[200px] '>
              <Image
                src={currentPlayList[musicIndex].thumbnail}
                alt='Album Thumbnail'
                width={200}
                height={200}
                className='h-[200px] w-[200px] rounded-full'
              />
            </div>
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
                  />
                )}
              </button>
              <button
                type='button'
                onClick={onInsertMyPlayListHandler}
                className='h-[48px] w-[48px]'
              >
                <Image
                  src={myPlayListButton}
                  alt='Album Circle'
                  width={48}
                  height={48}
                />
              </button>
            </div>
          </div>
          <div className='rhap_controls-section'>
            <AudioPlayer
              src={isPlayList ? currentPlayList[musicIndex].musicSource : ''}
              volume={0.1}
              loop={false}
              autoPlay={true}
              autoPlayAfterSrcChange={true}
              onEnded={onNextTrackHandler}
              showSkipControls={true}
              customIcons={customIcons}
            />

            <Image
              src={isRandom ? musicShuffleOff : musicShuffle}
              alt='Lyrics'
              width={55}
              height={60}
              onClick={onRandomMusicHandler}
              className='shuffleButton'
            />
          </div>
        </div>
        // <Pl />
      )}
    </div>
  )
}

export default Player
// 함수가 정상적으로 작동하지 않을경우(상태유지 불가 등) 함수 호출부, 사용하는곳부터 뒤져보기!!!!!!!!!!!!!!!!
