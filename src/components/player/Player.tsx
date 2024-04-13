import musicLyricsButton from '@/../public/images/musicLyricsButton.svg'
import musicThumbnail from '@/../public/images/musicThumbnail.svg'
import musicList from '@/../public/images/musicList.svg'
import myPlayListButton from '@/../public/images/myPlayListButton.svg'
import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const Player = ({
  isLyrics,
  currentPlayList,
  musicIndex,
  onPreviousHandler,
  onNextTrackHandler,
  onLyricsToggle,
  onInsertMyPlayListHandler,
}: PlayerProps) => {
  const isPlay = currentPlayList?.length > 0

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
                className=''
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
              {isLyrics && <div>{currentPlayList[musicIndex].lyrics}</div>}
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
        autoPlay={false}
        loop={false}
        // 볼륨 나중에 0.5로 변경할것!, 테스트중으로 자동 재생설정함
        volume={0.1}
        showSkipControls={true}
        onClickPrevious={onPreviousHandler}
        onClickNext={onNextTrackHandler}
        src={isPlay ? currentPlayList[musicIndex].musicSource : ''}
        onEnded={onNextTrackHandler}
      />
    </div>
  )
}

export default Player
