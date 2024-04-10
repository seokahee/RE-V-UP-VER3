import { PlayerProps } from '@/types/musicPlayer/types'
import Image from 'next/image'
import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const Player = ({
  isRandom,
  currentPlayList,
  randomIndex,
  currentIndex,
  onPreviousHandler,
  onNextTrackHandler,
}: PlayerProps) => {
  const isCurrentPlayList = isRandom
    ? currentPlayList[randomIndex]
    : currentPlayList[currentIndex]
  return (
    <div>
      <div>
        <div>{isCurrentPlayList.musicTitle}</div>
        <div>{isCurrentPlayList.artist}</div>
        <Image
          src={isCurrentPlayList.thumbnail}
          alt='Album Thumbnail'
          width={100}
          height={100}
        />
        <div>{isCurrentPlayList.lyrics}</div>
      </div>
      <AudioPlayer
        loop={false}
        // 볼륨 나중에 0.5로 변경할것!, 테스트중으로 자동 재생설정함
        volume={0.3}
        showSkipControls={true}
        onClickPrevious={onPreviousHandler}
        onClickNext={onNextTrackHandler}
        src={isCurrentPlayList.musicSource}
        onEnded={onNextTrackHandler}
      />
    </div>
  )
}

export default Player
