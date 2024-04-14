import musicList from '@/../public/images/musicList.svg'
import musicLyricsButton from '@/../public/images/musicLyricsButton.svg'
import musicShuffle from '@/../public/images/musicShuffle.svg'
import musicShuffleOff from '@/../public/images/musicShuffleOff.svg'
import musicThumbnail from '@/../public/images/musicThumbnail.svg'
import dd from '@/../public/images/dd.svg'
import myPlayListButton from '@/../public/images/myPlayListButton.svg'
import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './AudioCss.css'
import MyLoopIcon from './playerIcons/MyLoopIcon'
import MyLoopOffIcon from './playerIcons/MyLoopOffIcon'
import MyNextIcon from './playerIcons/MyNextIcon'
import MyPauseIcon from './playerIcons/MyPauseIcon'
import MyPlayIcon from './playerIcons/MyPlayIcon'
import MyPreviousIcon from './playerIcons/MyPreviousIcon'
import ProgressContainer from './playerIcons/ProgressContainer'
import FaForward from './playerIcons/FaForward'
// import AudioPlayer, { RHAP_UI ,} from 'react-h5-audio-player'

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
  const isPlayList = currentPlayList?.length > 0

  const customIcons = {
    play: <MyPlayIcon />, // 내가 원하는 재생 아이콘
    pause: <MyPauseIcon />, // 내가 원하는 일시정지 아이콘
    previous: <MyPreviousIcon onPreviousHandler={onPreviousHandler} />, // 내가 원하는 이전 트랙
    next: <MyNextIcon onNextTrackHandler={onNextTrackHandler} />, // 내가 원하는 다음 트랙
    loop: <MyLoopIcon />, // 내가 원하는 반복 아이콘
    loopOff: <MyLoopOffIcon />, // 내가 원하는 반복 해제 아이콘
    progressJump: <FaForward />,
  }

  const CustomAudioPlayer = () => {
    return (
      <div className='rhap_controls-section'>
        <AudioPlayer
          src={isPlayList ? currentPlayList[musicIndex].musicSource : ''}
          volume={0.1}
          loop={false}
          autoPlay={true}
          autoPlayAfterSrcChange={true}
          onEnded={onNextTrackHandler}
          showSkipControls={true}
          className='custom-audio-player'
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
    )
  }

  return (
    <div>
      {isPlayList && (
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
                className='rounded-full'
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
      <CustomAudioPlayer />
    </div>
  )
}

export default Player
