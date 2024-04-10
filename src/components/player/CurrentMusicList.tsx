import React from 'react'
import CheckboxItem from '../mypage/CheckboxItem'

type MusicListProps = {
  currentItems: any[]
  checkedList: string[]
  onChangeCheckMusicHandler: (checked: boolean, id: string) => void
  onDeleteCurrentMusicHandler: () => void
  onInsertMyPlayListHandler: () => void
  setCurrentIndex: (index: number) => void
}

const CurrentMusicList = ({
  currentItems,
  checkedList,
  onChangeCheckMusicHandler,
  onDeleteCurrentMusicHandler,
  onInsertMyPlayListHandler,
  setCurrentIndex,
}: MusicListProps) => {
  return (
    <div>
      {currentItems.map((item: any, index: number) => {
        return (
          <div key={item.musicId} className='flex gap-5'>
            <CheckboxItem
              checked={checkedList.includes(item.musicId)}
              id={item.musicId}
              onChangeCheckMusicHandler={(e) =>
                onChangeCheckMusicHandler(e.target.checked, item.musicId)
              }
            />
            <p
              onClick={() => {
                setCurrentIndex(index)
              }}
            >
              {item.musicTitle}
            </p>
            <span>{item.artist}</span>
            <span>{item.runTime}</span>
          </div>
        )
      })}
      <button
        type='button'
        onClick={onDeleteCurrentMusicHandler}
        className='m-3'
      >
        삭제
      </button>
      <button type='button' onClick={onInsertMyPlayListHandler}>
        마플리
      </button>
    </div>
  )
}
export default CurrentMusicList
