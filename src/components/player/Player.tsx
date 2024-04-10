import { useCurrentMusicStore } from '@/shared/store/playerStore'
import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const Player = ({
  currentItems,
  musicIndex,
  onPreviousHandler,
  onNextTrackHandler,
}: PlayerProps) => {
  // const { currentMusicData } = useCurrentMusicStore()
  // const { currentItems } = currentMusicData
  // console.log('currentItems', currentItems)

  // const currentMusicIndex = currentItems.find((arr) => {
  //   return arr.musicId === currentItems[musicIndex].musicId
  // })
  // console.log('currentMusicIndex', currentMusicIndex?.musicId)
  // if (!currentMusicIndex) {
  //   return
  // }
  // // 현재 인덱스의 뮤직 아이디와 실행중인 음악의 뮤직 아이디가 같은경우
  // // 뮤직데이터의 뮤직아이디 추출방법
  // // 실행중 음악의 뮤직 아이디 추출방법
  // // 뫄뫄가 있으면 실행해라

  // 현재 실행중인 노래 데이터를 쥬스탄드에 담아

  const currentMusic = useCurrentMusicStore((state) => state.currentMusic)
  // currentMusic(currentItems)
  console.log('currentItems', currentItems[musicIndex].musicSource)

  return (
    <div>
      <div>
        <div>{currentItems[musicIndex].musicTitle}</div>
        <div>{currentItems[musicIndex].artist}</div>
        <Image
          src={currentItems[musicIndex].thumbnail}
          alt='Album Thumbnail'
          width={100}
          height={100}
        />
        <div>{currentItems[musicIndex].lyrics}</div>
      </div>
      <AudioPlayer
        loop={false}
        // 볼륨 나중에 0.5로 변경할것!, 테스트중으로 자동 재생설정함
        volume={0.1}
        showSkipControls={true}
        onClickPrevious={onPreviousHandler}
        onClickNext={onNextTrackHandler}
        src={currentItems[musicIndex].musicSource}
        onEnded={onNextTrackHandler}
      />
    </div>
  )
}

export default Player
