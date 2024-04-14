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
    <div className='mt-[16px] flex flex-col pb-[8px] pl-[16px] pr-[4px] pt-[8px]'>
      {currentPlayList.length === 0 && <div>현재 재생 목록이 없습니다</div>}
      <div className=' mt-16px flex flex-col justify-between opacity-[30%] '>
        {!isLyrics &&
          currentPlayList.map((item) => {
            const musicIndex = currentPlayList.findIndex(
              (arr) => arr.musicId === item.musicId,
            )
            return (
              <div key={item.musicId} className='flex items-center gap-[16px]'>
                <CheckboxItem
                  checked={checkedList.includes(item.musicId)}
                  id={item.musicId}
                  onChangeCheckMusicHandler={(e) =>
                    onChangeCheckMusicHandler(e.target.checked, item.musicId)
                  }
                />
                <div className='flex flex-col'>
                  <p
                    onClick={() => {
                      setMusicIndex(musicIndex)
                    }}
                    className='cursor-pointer'
                  >
                    {item.musicTitle}
                  </p>
                  <span>{item.artist}</span>
                </div>
                <span>{item.runTime}</span>
              </div>
            )
          })}
      </div>

      {!isLyrics && (
        <button
          type='button'
          onClick={onDeleteCurrentMusicHandler}
          className='border-gray-200 h-[56px] w-[113px] rounded-xl border-2 border-solid p-4 shadow-md filter backdrop-blur-lg'
        >
          {`${checkedList.length}곡 삭제`}
        </button>
      )}
    </div>
  )
}
export default CurrentMusicList
