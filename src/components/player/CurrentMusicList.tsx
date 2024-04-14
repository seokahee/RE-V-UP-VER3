import { MusicListProps } from '@/types/musicPlayer/types'
import CheckboxItem from '../mypage/CheckboxItem'

const CurrentMusicList = ({
  isLyrics,
  checkedList,
  currentPlayList,
  onChangeCheckMusicHandler,
  onDeleteCurrentMusicHandler,
  setMusicIndex,
}: MusicListProps) => {
  return (
    <div className='w-366 h-308 mt-[16px]  flex flex-col items-start p-0'>
      {currentPlayList.length === 0 && <div>현재 재생 목록이 없습니다</div>}
      {!isLyrics &&
        currentPlayList.map((item) => {
          const musicIndex = currentPlayList.findIndex(
            (arr) => arr.musicId === item.musicId,
          )
          return (
            <div
              key={item.musicId}
              className='mt-[16px] flex h-[63px] items-center gap-5'
            >
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

      {!isLyrics && (
        <button
          type='button'
          onClick={onDeleteCurrentMusicHandler}
          className='border-gray-200 rounded-xl border-2 border-solid drop-shadow-xl filter backdrop-blur-lg'
        >
          {`${checkedList.length}곡 삭제`}
        </button>
      )}
    </div>
  )
}
export default CurrentMusicList
