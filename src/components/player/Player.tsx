import { useCurrentMusicStore } from '@/shared/store/playerStore'
import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const Player = ({
  // musicIndex,
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

  const { currentMusicData } = useCurrentMusicStore()
  const { currentPlayList, musicIndex } = currentMusicData

  // console.log('playMusic', currentItems)
  // console.log('currentItems', currentItems[musicIndex].musicTitle)
  const [onPlay, setOnPlay] = useState(0)
  // const [currentMusicIndex, setCurrentMusicIndex] = useState(musicIndex)
  const [isPlaying, setIsPlaying] = useState(false)
  // const onPlayMusic = () => {
  //   // const audioElement =currentItems[musicIndex]
  //   // setOnPlay(audioElement)
  // }
  //   const onPlayMusic=()=>{
  // console.log("object",);
  //   }

  // const { currentPageData } = useCurrentMusicPageStore()
  // const { musicIndex, currentPage } = currentPageData
  console.log('musicIndex', musicIndex)

  // const onMusicPlayHandler = () => {
  //   setIsPlaying(true)
  //   setCurrentMusicIndex(musicIndex)
  //   console.log('여어어ㅓ 현재 재생되는곡인걸', currentMusicIndex)
  // }
  console.log('scr임이이이이이ㅣ이임', currentPlayList[musicIndex])
  return (
    <div>
      <div>
        <div>{currentPlayList[musicIndex].musicTitle}</div>
        <div>{currentPlayList[musicIndex].artist}</div>
        <Image
          src={currentPlayList[musicIndex].thumbnail}
          alt='Album Thumbnail'
          width={100}
          height={100}
        />
        <div>{currentPlayList[musicIndex].lyrics}</div>
      </div>
      <AudioPlayer
        loop={false}
        // 볼륨 나중에 0.5로 변경할것!, 테스트중으로 자동 재생설정함
        volume={0.1}
        showSkipControls={true}
        onClickPrevious={onPreviousHandler}
        onClickNext={onNextTrackHandler}
        src={currentPlayList[musicIndex].musicSource}
        onEnded={onNextTrackHandler}
        // onCanPlay={()=>{onPlayMusic(currentItems[musicIndex])}}
        // onCanPlay={onPlayMusic}
        // onPlay={onMusicPlayHandler}
      />
    </div>
  )
}

export default Player

// 다음 이전 자동으로 넘어갈 때 페이지가 같이 넘어가도록 해야함
// 현재 재생목록에 현재 페이지에 현재 인덱스의 데이터를 추출해야함
