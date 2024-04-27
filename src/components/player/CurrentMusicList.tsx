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
import { DragEvent, useEffect, useState } from 'react'
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
  const [isDrag, setIsDrag] = useState(false)
  const [draggedItem, setDraggedItem] = useState<MusicInfoType | null>(null)
  const [dragIndex, setDragIndex] = useState<number>(-1)
  const [customList, setCustomList] = useState<CurrentPlayListType[]>([])

  const currentMusic = useCurrentMusicStore((state) => state.currentMusic)
  const { currentMusicData } = useCurrentMusicStore()
  const { currentPlayList } = currentMusicData

  // useEffect(() => {
  //   // 디비에서 받아오는 데이터와, 스테이트에 저장한 데이터가 모두 일치하면 반환
  //   const uniqueValues = currentPlayList.filter((currentItem) => {
  //     return customList.every((customItem) => {
  //       return currentItem.musicId !== customItem.musicId
  //     })
  //   })

  //   console.log('uniqueValues', uniqueValues)
  //   if (uniqueValues.length > 0) {
  //     // 비교했는데 온전히 같지 않으면
  //     if (currentPlayList.length > customList.length) {
  //       //추가됐을때
  //       const addList = [...customList, ...uniqueValues]
  //       setCustomList(addList)
  //       // console.log('삭제, 추가 테스트', addList)
  //     } else {
  //       // 삭제됐을때
  //       // const flatList = currentPlayList.map((item) => item.musicId)
  //       // const removeList = customList.filter((item) =>
  //       //   flatList.includes(item.musicId),
  //       // )

  //       const findIdx = currentPlayList.map((item) => {
  //         const musicIndex = customList.findIndex(
  //           (arr: CurrentPlayListType) => {
  //             return arr.musicId !== item.musicId
  //           },
  //         )
  //         return musicIndex
  //       })

  //       const ddd=findIdx.forEach((idx) => {
  //         if (idx !== 0) {
  //           customList.splice(idx, 1)
  //         }
  //       })

  //       // console.log('findIdx', findIdx)
  //       // customList.splice(findIdx, findIdx.length)
  //       // setCustomList(removeList)

  //       // 서버플리랑 스테플리랑 비교해서 아이디가 같지않은 인덱스를 뱉으면 그거로 어떻게 좀 지워봐 원장님한테 슬랙 보내놓은거 참고하셈
  //       // ++ 노래 렌더문제있음 최초 재생 시 버튼 두번누르거나 인덱스 변경하고 재생하면 괜찮은데 상태 그대로 재생하면 다음곡 자동으로 안넘어감 최초 한번은 첫 노래 끝나고 다음곡 넘어가게 버튼 눌러줘야함
  //       // 플레이어 컴포넌트에서 커런트플레잉 스테이트가 감지를 잘 못하는거같음 엔디드함수인가뭔가 거기에서 현 노래 끝나면 자동으로 넘어가게해놨는데 함수에선 콘솔이 매우 잘 찍히다 못해 기특함 99% 렌더문제
  //     }
  //   } else {
  //     //위에서 비교한 반환 값이 없으면 스테이트에 저장

  //     setCustomList(currentPlayList)
  //   }
  // }, [currentPlayList])
  // 새로고침문제만 해결하면 완료일듯

  // 추가 또는 삭제 이벤트 발생 시 추가 이벤트가 발생하면 아래에 추가해주고
  // 삭제 이벤트가 발생하면 삭제 데이터 제외 현재 인덱스 유지

  // 추가 또는 삭제 시 원래 인덱스로 돌아가버린다ㅏ아아ㅏㅇ나아아아ㅏㅏㅏ아아아ㅏㅏㅏ아아ㅏㅏ아ㅏ아아앙
  // 삭제시 기존 배열값을 유지할수있도록 스플라이스
  // 추가도 마찬가지로 기존 배열을 풀어서 새 배열을 만들어주고 마지막 인덱스에 추가되도록

  // 삭제가 됐어 그럼 플리는 두개 스테이트는 세개 그럼 랭스가 다르자나? 온전히 같지않아로 들어갈거자나?
  // 적을경우를 조건을 주자
  // 적으면 플리에 있는거 제외하고 지금 인덱스는 유지하자

  useEffect(() => {
    // 스테이트가 비어있는경우 서버플리 저장
    if (customList.length === 0) {
      setCustomList(currentPlayList)
    }

    // 디비에서 받아오는 데이터와, 스테이트에 저장한 데이터가 일치하지않은것을 반환
    const currentValues = currentPlayList.filter((currentItem) => {
      return customList.every((customItem) => {
        return currentItem.musicId !== customItem.musicId
      })
    })

    console.log('추가 또는 삭제가 일어나면 무조건 찍혀야 정상임', currentValues)

    // 디비플리와 스테이트플리가 동일하지않은경우
    if (currentValues.length > 0) {
      // 서버플리가 스테이트 플리보다 많으면, 추가된경우
      if (currentPlayList.length > customList.length) {
        const addList = [...customList, ...currentValues]
        setCustomList(addList)
      }

      // 서버플리가 스테이트 플리보다 적으면, 삭제된경우
      if (currentPlayList.length < customList.length) {
        console.log('삭제되면 스테이트 값도 지워줘야겠지 또도를 생각해')
        const removeValues = currentValues.map((item) => item.musicId)

        // 커스텀 플레이 리스트에서 삭제된 아이템 제거
        const updatedCustomList = customList.filter(
          (item) => !removeValues.includes(item.musicId),
        )
        setCustomList(updatedCustomList)
      }
    }
  }, [currentPlayList])
  console.log('서버플리임', currentPlayList.length)
  console.log('스테이트플리임', customList.length)
  //
  //

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
  // console.log('currentPlayList', currentPlayList)
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

      // 변경된 플레이리스트를 로컬스토리지랑 스테이트에 저장
      currentMusic(currentPlayList)
      setCustomList(currentPlayList)
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
      {customList.length === 0 && (
        <div className='flex flex-col items-center text-[18px] opacity-50'>
          음악을 추가해주세요
        </div>
      )}
      <div className='flex flex-col justify-between'>
        {customList.map((item: CurrentPlayListType, index: number) => {
          const musicIndex = customList.findIndex(
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
                        setCurrentPlaying(customList[musicIndex])
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
                    />
                  </div>
                </div>
              ) : null}
              {isLyrics && isCurrentPlaying && (
                <div className='m-auto  w-[326px] items-center p-[8px] text-center text-[14px] leading-[150%] opacity-[30%]'>
                  {customList[musicIndex].lyrics}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {!isLyrics && customList.length > 0 && checkedList.length > 0 && (
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
