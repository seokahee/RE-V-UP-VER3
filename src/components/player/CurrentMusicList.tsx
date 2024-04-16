import { MusicListProps } from '@/types/musicPlayer/types'
import CheckboxItem from '../mypage/CheckboxItem'

const CurrentMusicList = ({
  currentPlayList,
  isLyrics,
  checkedList,
  setCurrentPlaying,
  onChangeCheckMusicHandler,
  onDeleteCurrentMusicHandler,
  setMusicIndex,
}: MusicListProps) => {
  return (
    <div className='relative mt-[32px] flex flex-col'>
      {currentPlayList.length === 0 && <div>현재 재생 목록이 없습니다</div>}
      <div className='mt-[16px] flex max-h-[500px] flex-col justify-between overflow-y-auto overflow-x-hidden'>
        {currentPlayList.map((item) => {
          const musicIndex = currentPlayList.findIndex(
            (arr) => arr.musicId === item.musicId,
          )

          return !isLyrics ? (
            <div
              key={item.musicId}
              className='flex max-h-[63px] w-[366px] justify-between pb-[8px] pl-[16px] pr-[16px] pt-[8px]'
            >
              <div className='flex items-center gap-[16px]'>
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
                      setCurrentPlaying(currentPlayList[musicIndex])
                    }}
                    className='cursor-pointer text-[16px]'
                  >
                    {item.musicTitle}
                  </p>
                  <span className='text-[14px] opacity-[30%] '>
                    {item.artist}
                  </span>
                </div>
              </div>
              <span className='text-[14px] opacity-[30%] '>{item.runTime}</span>
            </div>
          ) : (
            <div className='m-auto flex w-[326px] items-center gap-[8px] p-[8px] text-center text-[14px] leading-[150%] opacity-[30%]'>
              {currentPlayList[musicIndex].lyrics}
            </div>
          )
        })}
      </div>

      {!isLyrics && (
        <button
          type='button'
          onClick={onDeleteCurrentMusicHandler}
          className='via-gray-100 to-gray-300 shadow-outline-white absolute bottom-0  left-1/2 h-[56px] w-[113px] -translate-x-1/2 transform rounded-[16px] border-2 border-solid border-zinc-900 bg-gradient-to-br from-zinc-700 p-0 text-center shadow-md'
        >
          {`${checkedList.length > 0 ? `${checkedList.length} 곡 삭제` : '곡 삭제'}`}
        </button>
      )}
    </div>
  )
}
export default CurrentMusicList
