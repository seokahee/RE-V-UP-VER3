import { queryClient } from '@/app/provider'
import {
  GET_MUSIC_LIST_QUERY_KEYS,
  getMusicList,
} from '@/query/musicPlayer/musicPlayerQueryKeys'
import { insertCurrentMusic, updateCurrentMusic } from '@/shared/main/api'
import { MusicInfoType, MusicListProps } from '@/types/musicPlayer/types'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import CheckboxItem from '../mypage/CheckboxItem'
import { useState } from 'react'

const CurrentMusicList = ({
  currentPlaying,
  currentPlayList,
  isLyrics,
  checkedList,
  selectAll,
  setSelectAll,
  setCheckedList,
  setCurrentPlaying,
  onChangeCheckMusicHandler,
  onDeleteCurrentMusicHandler,
  setMusicIndex,
}: MusicListProps) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string

  const { playListCurrent } = getMusicList(uid)

  const insertMutation = useMutation({
    mutationFn: insertCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.CURRENT_MUSIC_INFO],
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.CURRENT_MUSIC_INFO],
      })
    },
  })

  const dragHandler = (
    e: React.DragEvent<HTMLLIElement>,
    item: MusicInfoType,
  ) => {
    e.dataTransfer.setData(
      'musicInfo',
      JSON.stringify({
        musicSource: item.thumbnail,
        musicId: item.musicId,
        musicTitle: item.musicTitle,
        musicArtist: item.artist,
        musicLyrics: item.lyrics,
        musicRunTime: item.runTime,
        musicUrl: item.musicSource,
      }),
    )
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const musicInfo = JSON.parse(e.dataTransfer.getData('musicInfo'))

    if (playListCurrent && playListCurrent.length > 0) {
      const currentList = playListCurrent[0].currentMusicIds
      if (currentList.find((el) => el === musicInfo.musicId)) {
        Swal.fire({
          icon: 'warning',
          title: '이미 추가된 노래입니다.',
          showConfirmButton: false,
          timer: 1500,
          background: '#2B2B2B',
          color: '#ffffff',
        })
        return
      }
      currentList.push(musicInfo.musicId)
      updateMutation.mutate({ userId: uid, currentList })
    } else {
      insertMutation.mutate({ userId: uid, musicId: musicInfo.musicId })
    }
    Swal.fire({
      icon: 'success',
      title: '현재 재생목록에 추가 되었습니다.',
      showConfirmButton: false,
      timer: 1500,
      background: '#2B2B2B',
      color: '#ffffff',
    })
  }
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const selectAllHandler = () => {
    const allMusicIds = currentPlayList.map((item) => item.musicId)
    if (!selectAll) {
      setCheckedList(allMusicIds)
    } else {
      setCheckedList([])
    }
    setSelectAll((prev) => !prev)
  }
  return (
    <div
      className='mt-[16px] flex max-h-[450px] min-h-[450px] flex-col overflow-y-auto overflow-x-hidden'
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      {currentPlayList.length === 0 && (
        <div className=' flex flex-col items-center text-[18px] opacity-50'>
          음악을 추가해주세요
        </div>
      )}
      <div className='flex  flex-col justify-between '>
        {currentPlayList.map((item) => {
          const musicIndex = currentPlayList.findIndex(
            (arr) => arr.musicId === item.musicId,
          )

          return (
            <div key={item.musicId}>
              {!isLyrics ? (
                <div className='relative flex max-h-[63px] w-[366px] justify-between pb-[8px] pl-[16px] pr-[16px] pt-[8px]'>
                  <div className='flex items-center gap-[16px]'>
                    <CheckboxItem
                      checked={checkedList.includes(item.musicId)}
                      id={item.musicId}
                      onChangeCheckMusicHandler={(e) =>
                        onChangeCheckMusicHandler(
                          e.target.checked,
                          item.musicId,
                        )
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
                  <span className='text-[14px] opacity-[30%] '>
                    {item.runTime}
                  </span>
                </div>
              ) : null}
              {isLyrics && item.musicId === currentPlaying?.musicId && (
                <div className='m-auto  w-[326px] items-center p-[8px] text-center text-[14px] leading-[150%] opacity-[30%]'>
                  {currentPlayList[musicIndex].lyrics}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <button
        type='button'
        onClick={selectAllHandler}
        className='absolute left-[40%] top-[90%]'
      >
        {selectAll ? '전체 해제' : '전체 선택'}
      </button>
      {!isLyrics && currentPlayList.length > 0 && checkedList.length > 0 && (
        <button
          type='button'
          onClick={onDeleteCurrentMusicHandler}
          className='via-gray-100 to-gray-300 shadow-outline-white absolute bottom-[40px] left-[127px] right-[126px] h-[56px] w-[113px] rounded-[16px] border-2 border-solid border-zinc-800 bg-gradient-to-br from-zinc-700 p-0 text-center shadow-md'
        >
          {`${checkedList.length > 0 ? `${checkedList.length} 곡 삭제` : '곡 삭제'}`}
        </button>
      )}
    </div>
  )
}
export default CurrentMusicList
