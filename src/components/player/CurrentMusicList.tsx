import { queryClient } from '@/app/provider'
import {
  GET_MUSIC_LIST_QUERY_KEYS,
  getMusicList,
} from '@/query/musicPlayer/musicPlayerQueryKeys'
import { insertCurrentMusic, updateCurrentMusic } from '@/shared/main/api'
import { MusicInfoType, MusicListProps } from '@/types/musicPlayer/types'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { DragEvent, useState } from 'react'
import Swal from 'sweetalert2'
import CheckboxItem from '../mypage/CheckboxItem'

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
  const [isDrag, setIsDrag] = useState(false)
  const [currentItem, setCurrentItem] = useState(currentPlayList)

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

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log('isDrag', isDrag)

    if (!isDrag) {
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
  }
  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
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

  const indexDragHandler = (
    e: DragEvent<HTMLDivElement>,
    item: MusicInfoType,
  ) => {
    e.dataTransfer.setData('listItem', JSON.stringify(item))
  }

  const indexChangeDropHandler = (e: DragEvent<HTMLDivElement>) => {
    const listItem = JSON.parse(e.dataTransfer.getData('listItem'))

    const dragIndex = currentItem.findIndex(
      (item) => item.musicId === listItem.musicId,
    )

    // 드롭된 위치 계산
    const dropY = e.clientY
    const dropIndex = calculateDropIndex(dropY)

    if (dragIndex !== -1 && dropIndex !== -1 && dragIndex !== dropIndex) {
      // 새로운 배열을 만들어서 드롭된 요소의 위치를 변경
      const newPlayList = [...currentItem]
      const [draggedItem] = newPlayList.splice(dragIndex, 1) // 드래그된 요소를 제거
      newPlayList.splice(dropIndex, 0, draggedItem) // 드롭된 위치에 요소를 삽입

      // 새로운 플레이리스트를 설정
      setCurrentItem(newPlayList)
    }
  }

  const calculateDropIndex = (dropY: number) => {
    // 드래그된 아이템의 높이 계산
    const draggedItemHeight = 63

    // 목록의 상단 위치 계산
    const listTop =
      document.querySelector('.your-list-selector')?.getBoundingClientRect()
        .top || 0

    // 드롭된 위치를 기준으로 목록의 위치를 계산
    const yOffset = dropY - listTop

    // 드롭된 위치를 기준으로 목록에서의 인덱스를 계산
    let currentIndex = Math.floor(yOffset / draggedItemHeight)

    // 현재 인덱스가 음수인 경우
    currentIndex = Math.max(currentIndex, 0)

    // 현재 인덱스가 목록의 길이를 초과한 경우
    currentIndex = Math.min(currentIndex, currentItem.length)

    return currentIndex
  }
  return (
    <div
      className='mt-[16px] flex max-h-[250px] min-h-[250px] flex-col overflow-y-auto overflow-x-hidden'
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      {currentItem.length === 0 && (
        <div className=' flex flex-col items-center text-[18px] opacity-50'>
          음악을 추가해주세요
        </div>
      )}
      <div className='flex  flex-col justify-between '>
        {currentItem.map((item) => {
          const musicIndex = currentItem.findIndex(
            (arr) => arr.musicId === item.musicId,
          )

          return (
            <div onDrop={indexChangeDropHandler} key={item.musicId}>
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
                          setCurrentPlaying(currentItem[musicIndex])
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

                  <p
                    draggable='true'
                    onDragStart={(e) => {
                      setIsDrag(true)
                      indexDragHandler(e, item)
                    }}
                  >
                    Drag
                  </p>
                </div>
              ) : null}
              {isLyrics && item.musicId === currentPlaying?.musicId && (
                <div className='m-auto  w-[326px] items-center p-[8px] text-center text-[14px] leading-[150%] opacity-[30%]'>
                  {currentItem[musicIndex].lyrics}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {!isLyrics && currentItem.length > 0 && checkedList.length > 0 && (
        <div className='absolute bottom-[40px] left-[56px] right-[56px] flex gap-[8px]'>
          <button
            type='button'
            onClick={selectAllHandler}
            className='h-[56px] w-[113px] rounded-[16px] border-[2px] border-solid border-[rgba(0,0,0,0.4)] bg-[rgba(255,255,255,0.1)] text-center font-bold drop-shadow-[-4px_-4px_8px_rgba(0,0,0,0.05),_4px_4px_8px_rgba(0,0,0,0.7)]  backdrop-blur-[12px]'
          >
            {selectAll ? '전체 해제' : '전체 선택'}
          </button>
          <button
            type='button'
            onClick={onDeleteCurrentMusicHandler}
            className='h-[56px] w-[113px] rounded-[16px] border-[2px] border-solid border-[rgba(0,0,0,0.4)] bg-[rgba(255,255,255,0.1)] text-center font-bold drop-shadow-[-4px_-4px_8px_rgba(0,0,0,0.05),_4px_4px_8px_rgba(0,0,0,0.7)]  backdrop-blur-[12px]'
          >
            {`${checkedList.length > 0 ? `${checkedList.length} 곡 삭제` : '곡 삭제'}`}
          </button>
        </div>
      )}
    </div>
  )
}
export default CurrentMusicList
const a = [0, 1, 3, 2]
console.log('a', a[4])

// 드랍을했을때, 들고있는 아이템과 드랍을 내려놓은곳에 아이템의 아이디를 비교해서
// 다르면 내가 내려놓은 아이템의 인덱스를 번으로 바꿈
// 배열의 위치에따라 인덱스를 변경하라
// 그러면 드랍했을때 인덱스가 자동으로 재정렬
