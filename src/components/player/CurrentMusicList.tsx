import { MusicListProps } from '@/types/musicPlayer/types'
import CheckboxItem from '../mypage/CheckboxItem'

const CurrentMusicList = ({
  currentItems,
  checkedList,
  onChangeCheckMusicHandler,
  onDeleteCurrentMusicHandler,
  onInsertMyPlayListHandler,
  onRandomMusicHandler,
  isRandom,
  setRandomIndex,
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
                isRandom ? setRandomIndex(index) : setCurrentIndex(index)
              }}
            >
              {item.musicTitle}
            </p>
            <span>{item.artist}</span>
            <span>{item.runTime}</span>
          </div>
        )
      })}
      <button onClick={onRandomMusicHandler}>
        {isRandom ? '랜덤' : '셔플'}
      </button>
      <button
        type='button'
        onClick={onDeleteCurrentMusicHandler}
        className='m-3'
      >
        {`${checkedList.length}곡 삭제`}
      </button>
      <button type='button' onClick={onInsertMyPlayListHandler}>
        마플리
      </button>
    </div>
  )
}
export default CurrentMusicList
