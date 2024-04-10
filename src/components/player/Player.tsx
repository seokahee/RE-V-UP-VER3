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
  return (
    <div>
      <div>
        <div>
          {isRandom
            ? currentPlayList[randomIndex].musicTitle
            : currentPlayList[currentIndex].musicTitle}
        </div>
        <div>
          {isRandom
            ? currentPlayList[randomIndex].artist
            : currentPlayList[currentIndex].artist}
        </div>
        <Image
          src={
            isRandom
              ? currentPlayList[randomIndex].thumbnail
              : currentPlayList[currentIndex].thumbnail
          }
          alt='Album Thumbnail'
          width={100}
          height={100}
        />
        <div>
          {isRandom
            ? currentPlayList[randomIndex].lyrics
            : currentPlayList[currentIndex].lyrics}
        </div>
      </div>
      <AudioPlayer
        loop={false}
        // 볼륨 나중에 0.5로 변경할것!, 테스트중으로 자동 재생설정함
        volume={0.3}
        showSkipControls={true}
        onClickPrevious={onPreviousHandler}
        onClickNext={onNextTrackHandler}
        src={
          isRandom
            ? currentPlayList[randomIndex].musicSource
            : currentPlayList[currentIndex].musicSource
        }
        onEnded={onNextTrackHandler}
      />
    </div>
  )
}

export default Player
