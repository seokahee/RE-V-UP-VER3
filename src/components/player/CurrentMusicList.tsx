import { queryClient } from '@/app/provider'
import {
  GET_MUSIC_LIST_QUERY_KEYS,
  getMusicList,
} from '@/query/musicPlayer/musicPlayerQueryKeys'
import { insertCurrentMusic, updateCurrentMusic } from '@/shared/main/api'
import { useCurrentMusicStore } from '@/shared/store/playerStore'
import {
  CurrentPlayListType,
  MusicInfoType,
  MusicListProps,
} from '@/types/musicPlayer/types'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { DragEvent, useState } from 'react'
import Swal from 'sweetalert2'
import CheckboxItem from '../mypage/CheckboxItem'
import musicDragIcon from '@/../public/images/musicDragIcon.svg'
import Image from 'next/image'

const CurrentMusicList = ({
  currentPlaying,
  // currentPlayList,
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
  const currentMusic = useCurrentMusicStore((state) => state.currentMusic)

  const [isDrag, setIsDrag] = useState(false)
  const [draggedItem, setDraggedItem] = useState<MusicInfoType | null>(null)
  const [dragIndex, setDragIndex] = useState<number>(-1)
  // const [customList, setCustomList] = useState<CurrentPlayListType[]>([])

  // const { setCustomList, customList } = useCurrentMusicStore()

  const { state } = JSON.parse(
    sessionStorage.getItem('currentMusicStore') as string,
  )
  const { currentPlayList } = state.currentMusicData

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
    if (!isDrag) {
      const musicInfo = JSON.parse(e.dataTransfer.getData('musicInfo'))

      // console.log('musicInfo', musicInfo)
      if (playListCurrent && playListCurrent.length > 0) {
        // console.log('playListCurrent', playListCurrent)
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
        // console.log('currentList', currentList)

        currentList.push(musicInfo.musicId)
        // console.log('currentList', musicInfo.musicId)
        // 아이디만 있는 배열을 보내주고 뮤테이션에서 객체 형태로 변환할것
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
    const allMusicIds = currentPlayList.flatMap(
      (item: CurrentPlayListType) => item.musicId,
    )

    if (!selectAll) {
      setCheckedList(allMusicIds)
    } else {
      setCheckedList([])
    }
    setSelectAll((prev) => !prev)
  }

  // 인덱스 드래그 핸들러
  const indexDragHandler = (item: MusicInfoType, index: number) => {
    // 드래그 요소를 잡으면 요소의 정보와 인덱스를 스테이트에 저장
    setDraggedItem(item)
    setDragIndex(index)
  }

  const indexChangeDropHandler = (
    dropIndex: number, // 드롭 위치의 인덱스
  ) => {
    // 드래그 요소가 없거나, 현재 리스트가 없으면 반환
    if (!draggedItem || !currentPlayList) {
      return
    }
    // 드래그된 요소의 인덱스와 드롭할 인덱스가 동일하지 않으면 실행(기존 인덱스와 동일하면 이동시킬 필요없음)
    if (dragIndex !== dropIndex) {
      // 플리를 새 배열에 담음
      // const newPlayList = [...currentPlayList]

      // 드래그된 플리에서 드래드된 인덱스를 삭제
      const [draggedMusic] = currentPlayList.splice(dragIndex, 1)

      // 드롭한 순간 그 위치에 요소를 삽입
      currentPlayList.splice(dropIndex, 0, draggedMusic)

      // setCustomList(newPlayList as CurrentPlayListType[])

      // 변경된 플레이리스트로 화면을 다시 렌더링

      // console.log('customList', customList)
      // 세션스토리지에 저장
      currentMusic(currentPlayList)
      // currentMusic(customList as any)
      // sessionStorage.setItem(
      //   'currentMusicStore',
      //   JSON.stringify({ currentMusicData: { currentPlayList: newPlayList } }),
      // )

      // console.log('customList', customList)
      //세션 스토리지에 변경사항이 저장되지않음
    }

    // 드래그 요소와 인덱스 초기화
    setDraggedItem(null)
    setDragIndex(-1)
    setIsDrag(false)
  }

  return (
    <div
      className='mt-[16px] flex max-h-[250px] min-h-[250px] flex-col overflow-y-auto overflow-x-hidden'
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      {currentPlayList.length === 0 && (
        <div className='flex flex-col items-center text-[18px] opacity-50'>
          음악을 추가해주세요
        </div>
      )}
      <div className='flex flex-col justify-between'>
        {currentPlayList.map((item: CurrentPlayListType, index: number) => {
          const musicIndex = currentPlayList.findIndex(
            (arr: CurrentPlayListType) => {
              return arr.musicId === item.musicId
            },
          )
          const isCurrentPlaying = item.musicId === currentPlaying?.musicId

          return (
            <div
              onDrop={() => indexChangeDropHandler(index)}
              onDragOver={dragOverHandler}
              key={item.musicId}
              className={`${isCurrentPlaying ? 'rounded-lg bg-neutral-700' : ''}`}
            >
              {!isLyrics ? (
                <div
                  draggable='true'
                  onDragStart={() => {
                    setIsDrag(true)
                    indexDragHandler(item, index)
                  }}
                  className={`relative flex max-h-[63px] w-[366px] cursor-pointer justify-between pb-[8px] pl-[16px] pr-[16px] pt-[8px] ${isCurrentPlaying ? 'rounded-lg bg-neutral-700' : ''}`}
                >
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
                    <div
                      onClick={() => {
                        setMusicIndex(musicIndex)
                        setCurrentPlaying(currentPlayList[musicIndex])
                      }}
                      className='flex cursor-pointer flex-col'
                    >
                      <p className='text-[16px]'>{item.musicTitle}</p>
                      <span className='text-[14px] opacity-[30%] '>
                        {item.artist}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-[17px]'>
                    <span className='text-[14px] opacity-[30%] '>
                      {item.runTime}
                    </span>
                    <Image
                      src={musicDragIcon}
                      alt='드래그 아이콘'
                      width={24}
                      height={24}
                      // className='element rounded-full'
                    />
                  </div>
                </div>
              ) : null}
              {isLyrics && isCurrentPlaying && (
                <div className='m-auto  w-[326px] items-center p-[8px] text-center text-[14px] leading-[150%] opacity-[30%]'>
                  {currentPlayList[musicIndex].lyrics}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {!isLyrics && currentPlayList.length > 0 && checkedList.length > 0 && (
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
// 2. 인덱스 변경 후 새 배열이 세션에 저장이 안됨
// 3. 검색 결과 이미 주스탄드에 넣어둠 근데 페이지 전환 시 이전 페이지에 있는 데이터 검색이 안됨

// 이후 할 일
// 커뮤니티 무한스크롤 적용
// 플레이어 정렬추가
// 뭐...css?
