import { useCurrentMusicStore } from '@/shared/store/playerStore'
import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import { useState } from 'react'
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
  // 뮤직아이디로 인덱스를 탐색해서 보여주면 되겠구나

  // const currentMusic = useCurrentMusicStore((state) => state.currentMusic)
  // currentMusic(currentItems)
  // const { currentMusicData } = useCurrentMusicStore()
  // const { currentItems } = currentMusicData
  // console.log('playMusic', currentItems)
  // console.log('currentItems', currentItems[musicIndex].musicTitle)
  const [isPlay, setIsPlay] = useState()
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
        // onPlay={() => {
        //   currentMusic(currentItems)
        // }}
      />
    </div>
  )
}

export default Player

// 검색 페이지네이션 후 값을 못받아옴
// 페이지 전환시 노래가 유지안됨

// 일단 0번 인덱스를 띄우고 다음을 누르면 다음인덱스가 나오면됨
// 제목을 누르면 아이디를 전달해서 아이디값으로 데이터를 출력하고
// 근데 또... 그 노래가 끝나면 순서대로 재생되어야하자노아
