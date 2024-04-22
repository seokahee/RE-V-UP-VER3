import arrow from '@/../public/images/chevron-down.svg'
import { queryClient } from '@/app/provider'
import { GET_MUSIC_LIST_QUERY_KEYS } from '@/query/musicPlayer/musicPlayerQueryKeys'
import { getCurrentMusicData, updateCurrentMusic } from '@/shared/main/api'
import {
  getUserMyPlaylistDataInfinite,
  updateMyMusicIds,
} from '@/shared/mypage/api'
import type { UserInfo } from '@/types/mypage/types'
import { useIntersectionObserver } from '@/util/useIntersectionObserver'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import ButtonPrimary from '../../util/ButtonPrimary'
import CheckboxItem from './CheckboxItem'

const MyPlaylist = ({ data }: { data: UserInfo }) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [toggle, setToggle] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const PER_PAGE = 5

  const {
    data: playlistMyData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_INFO, uid],
    queryFn: ({ pageParam = 1 }) =>
      getUserMyPlaylistDataInfinite(uid, pageParam, PER_PAGE),
    select: (data) => ({
      pages: data.pages.map((pageData) => pageData?.myPlaylistData!).flat(),
      pageParams: data.pageParams,
      playlistMyIds: data.pages[0]?.playlistMyIds,
    }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage || lastPage.isLast) {
        return null
      }
      //lastPageParam + 1 을 해서 다음 페이지로 넘기기
      return lastPageParam + 1
    },
    initialPageParam: 1,
    enabled: !!uid,
  })

  const playlistMyIds = playlistMyData?.playlistMyIds
  const myPlaylistData = playlistMyData?.pages

  const { data: playlistCurrentData } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_CURRENT_MUSIC_LIST],
    enabled: !!uid,
  })

  const updateMyPlayListMutation = useMutation({
    mutationFn: updateMyMusicIds,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_INFO],
      })
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_LIST],
      })
    },
  })

  const updateCurrentPlayListMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_CURRENT_MUSIC_LIST],
      })
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.CURRENT_MUSIC_INFO],
      })
    },
  })

  const onChangeCheckMusicHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      const checkList = checkedList.filter((el) => el !== id)
      setCheckedList(checkList)
    }
  }

  const checkListReset = () => {
    setCheckedList([])
  }

  const onClickDeleteHandler = async () => {
    if (checkedList.length === 0) {
      await Swal.fire({
        icon: 'warning',
        title: '삭제할 노래를 선택해주세요!',
        confirmButtonText: '확인',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }
    const myMusicIds = playlistMyIds as string[]
    const newData = myMusicIds.filter((el) => !checkedList.includes(el))

    try {
      await updateMyPlayListMutation.mutateAsync({
        userId: uid,
        myMusicIds: newData,
      })
      await Swal.fire({
        icon: 'success',
        title: '삭제가 완료 되었습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      checkListReset()
    } catch (error) {
      console.error(error)
    }
  }

  const onClickAddHandler = async () => {
    if (checkedList.length === 0) {
      await Swal.fire({
        icon: 'warning',
        title: '추가할 노래를 선택해주세요',
        confirmButtonText: '확인',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }

    const playListCurrentIds = !playlistCurrentData?.[0].currentMusicIds
      ? []
      : playlistCurrentData?.[0]?.currentMusicIds
    let newData = []

    if ((playListCurrentIds?.length as number) > 0) {
      const addData = checkedList.filter(
        (el) => !playListCurrentIds.includes(el),
      )

      if (addData.length === 0) {
        await Swal.fire({
          icon: 'warning',
          title: `선택하신 ${checkedList.length}개의 곡 모두 이미 추가되어 있습니다.`,
          showConfirmButton: false,
          timer: 1500,
          background: '#2B2B2B',
          color: '#ffffff',
        })
        return
      }

      newData = [...playListCurrentIds, ...addData]
    } else {
      newData = [...checkedList]
    }

    try {
      updateCurrentPlayListMutation.mutateAsync({
        userId: uid,
        currentList: newData,
      })
      await Swal.fire({
        icon: 'success',
        title: '현재 재생목록에 추가 되었습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      checkListReset()
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const onClickAllAddHandler = async () => {
    const playListCurrentIds = !playlistCurrentData?.[0]?.currentMusicIds
      ? []
      : playlistCurrentData?.[0].currentMusicIds
    const playListMyIds = !playlistMyIds ? [] : playlistMyIds
    let newData = []

    if (playListMyIds?.length === 0) {
      await Swal.fire({
        icon: 'info',
        title: '추가할 곡이 없습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }

    if ((playListCurrentIds?.length as number) > 0) {
      const addData = playListMyIds.filter(
        (el) => !playListCurrentIds.includes(el),
      )

      if (addData.length === 0) {
        await Swal.fire({
          icon: 'info',
          title: `선택하신 ${playListMyIds.length}개 모두 이미 추가되어 있습니다.`,
          showConfirmButton: false,
          timer: 1500,
          background: '#2B2B2B',
          color: '#ffffff',
        })
        return
      }

      newData = [...playListCurrentIds, ...addData]
    } else {
      newData = [...playListMyIds]
    }

    try {
      updateCurrentPlayListMutation.mutateAsync({
        userId: uid,
        currentList: newData,
      })
      checkListReset()
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const onClickToggleHandler = () => {
    setToggle((prev) => !prev)
    checkListReset()
  }

  //감시하는 요소가 보여지면 fetchNextPage 실행하도록 하는 onIntersect로직을 useIntersectionObserver 에 넘겨줌
  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage()

  useIntersectionObserver({
    target: ref,
    onIntersect,
    enabled: hasNextPage,
  })

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         fetchNextPage()
  //       }
  //     })
  //   })

  //   if (ref.current) {
  //     observer.observe(ref.current) //주시 대상 목록에 추가
  //   }

  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [playlistMyData, ref.current])

  const shadow =
    'shadow-[-4px_-4px_8px_rgba(255,255,255,0.05),4px_4px_8px_rgba(0,0,0,0.7)]'

  const toggleStyle = 'h-0 opacity-0'

  return (
    <div className='mt-[5rem]'>
      <div className='flex items-center justify-between'>
        <h2
          className='flex cursor-pointer items-center gap-2 text-[1.25rem] font-bold'
          onClick={onClickToggleHandler}
        >
          {data?.nickname}님의 플레이리스트
          <Image
            src={arrow}
            height={24}
            width={24}
            className={`${toggle ? '' : 'rotate-180'}`}
            alt='화살표 아이콘'
          />
        </h2>
        <ButtonPrimary onClick={onClickAllAddHandler}>전체 담기</ButtonPrimary>
      </div>
      {checkedList.length > 0 && (
        <div
          className={`fixed bottom-10 flex min-w-[232px] items-center rounded-2xl border-2 border-[rgba(0,0,0,0.05)] ${shadow} overflow-hidden bg-[#ffffff19] backdrop-blur-sm`}
          style={{ left: 'calc(50% + (388px / 2) - 56px)' }}
        >
          <button
            type='button'
            onClick={onClickDeleteHandler}
            className='w-1/2 p-4'
          >
            삭제
          </button>
          <button
            type='button'
            onClick={onClickAddHandler}
            className='w-1/2 border-l border-l-[rgba(255,255,255,0.5)] p-4'
          >
            {checkedList.length}곡 담기
          </button>
        </div>
      )}
      <ul
        className={`tracking-[-0.03em] ${toggle ? toggleStyle : ''} overflow-hidden transition-opacity ease-in-out`}
      >
        {myPlaylistData && myPlaylistData?.length > 0 ? (
          myPlaylistData?.map((item) => {
            return (
              <li
                key={item.musicId}
                className='flex items-center justify-between p-4'
              >
                <div className='flex items-center'>
                  <CheckboxItem
                    checked={checkedList.includes(item.musicId)}
                    id={`my-${item.musicId}`}
                    onChangeCheckMusicHandler={(e) =>
                      onChangeCheckMusicHandler(e.target.checked, item.musicId)
                    }
                  />
                  <figure className='ml-7 mr-4 overflow-hidden rounded-full'>
                    <Image
                      src={item.thumbnail}
                      width={56}
                      height={56}
                      alt={`${item.musicTitle} 앨범 이미지`}
                    />
                  </figure>
                  <label
                    htmlFor={`my-${item.musicId}`}
                    className='flex flex-col'
                  >
                    <span className='text-[1.125rem]'>{item.musicTitle}</span>
                    <span className='text-[0.875rem] text-[#ffffff7f]'>
                      {item.artist}
                    </span>
                  </label>
                </div>
                <span className='text-[0.875rem] font-medium text-[#ffffff7f]'>
                  {item.runTime}
                </span>
              </li>
            )
          })
        ) : (
          <li className='flex h-[300px] items-center justify-center text-[1rem] text-white/50'>
            좋아하는 음악을 추가해보세요!
          </li>
        )}
      </ul>
      {hasNextPage && <div ref={ref}></div>}
    </div>
  )
}

export default MyPlaylist
