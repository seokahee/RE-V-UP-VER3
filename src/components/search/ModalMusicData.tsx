import { MusicInfoType } from '@/types/musicPlayer/types'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'

const ModalMusicData = ({
  item,
  setIsModal,
}: {
  item: MusicInfoType
  setIsModal: Dispatch<SetStateAction<boolean>>
}) => {
  const onAddMusicBoardHandler = () => {}
  return (
    <div
      key={item.musicId}
      className='flex flex-col gap-2'
      onClick={onAddMusicBoardHandler}
    >
      <div>
        <Image
          src={item.thumbnail}
          alt='Album Thumbnail'
          width={100}
          height={100}
        />
        <div>제목 {item.musicTitle}</div>
        <div>가수 {item.artist}</div>
        <div>발매일 {item.release}</div>
        <div className='flex mt-5 gap-3'>
          <button onClick={() => setIsModal(false)}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default ModalMusicData
