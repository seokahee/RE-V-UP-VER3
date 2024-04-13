import { MusicListProps } from '@/types/musicPlayer/types'
import CheckboxItem from '../mypage/CheckboxItem'

const CurrentMusicList = ({
  isLyrics,
  checkedList,
  currentPlayList,
  onChangeCheckMusicHandler,
  onDeleteCurrentMusicHandler,
  onRandomMusicHandler,
  isRandom,
  setMusicIndex,
}: MusicListProps) => {
  return (
    <div>
      {currentPlayList.length === 0 && <div>현재 재생 목록이 없습니다</div>}
      {!isLyrics &&
        currentPlayList.map((item) => {
          const musicIndex = currentPlayList.findIndex(
            (arr) => arr.musicId === item.musicId,
          )
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
                  setMusicIndex(musicIndex)
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
        {isRandom ? '랜덤재생중' : '랜덤재생하기'}
      </button>
      {isLyrics && (
        <button
          type='button'
          onClick={onDeleteCurrentMusicHandler}
          className='m-3'
        >
          {`${checkedList.length}곡 삭제`}
        </button>
      )}
    </div>
  )
}
export default CurrentMusicList
