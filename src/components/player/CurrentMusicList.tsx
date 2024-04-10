import { MusicListProps } from '@/types/musicPlayer/types'
import CheckboxItem from '../mypage/CheckboxItem'

const CurrentMusicList = ({
  item,
  checkedList,
  currentItems,
  onChangeCheckMusicHandler,
  onDeleteCurrentMusicHandler,
  onInsertMyPlayListHandler,
  onRandomMusicHandler,
  isRandom,
  setMusicIndex,
}: MusicListProps) => {
  const musicIndex = currentItems.findIndex(
    (arr) => arr.musicId === item.musicId,
  )
  return (
    <div>
      <div>
        <CheckboxItem
          checked={checkedList.includes(item.musicId)}
          id={item.musicId}
          onChangeCheckMusicHandler={(e) =>
            onChangeCheckMusicHandler(e.target.checked, item.musicId)
          }
        />
        <p
          onClick={() => {
            setMusicIndex(musicIndex)
          }}
        >
          {item.musicTitle}
        </p>
        <span>{item.artist}</span>
        <span>{item.runTime}</span>
      </div>

      <button onClick={onRandomMusicHandler}>
        {isRandom ? '랜덤재생중' : '랜덤재생하기'}
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
