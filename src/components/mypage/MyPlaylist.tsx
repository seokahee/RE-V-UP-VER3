import arrow from '@/../public/images/chevron-down.svg'
import loading from '@/../public/images/loadingBar.gif'
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
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import ButtonPrimary from '../../util/ButtonPrimary'
import CheckboxItem from './CheckboxItem'
import InfiniteScrollContainer from '@/util/InfiniteScrollContainer'

const MyPlaylist = ({ data }: { data: UserInfo }) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [toggle, setToggle] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const scroll = useRef(0)

  const PER_PAGE = 5
  const MAX_PAGES = 4

  const {
    data: playlistMyData,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_INFO, uid],
    queryFn: ({ pageParam = 1 }) =>
      getUserMyPlaylistDataInfinite(uid, pageParam, PER_PAGE),
    select: (data) => ({
      pages: data.pages.map((data) => data?.myPlaylistData),
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
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
    initialPageParam: 1,
    maxPages: MAX_PAGES,
    enabled: !!uid,
  })

  const playlistMyIds = playlistMyData?.playlistMyIds

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

  const handleScroll = () => {
    const height = listRef.current?.children[0]
      ? listRef.current?.children[0].clientHeight
      : 0
    if (scrollBoxRef.current) {
      scroll.current = scrollBoxRef.current.scrollTop

      if (
        hasPreviousPage &&
        !isFetchingPreviousPage &&
        scrollBoxRef.current.scrollTop < height * 3
      ) {
        // console.log(scroll.current, height * 3, height)
        // console.log('역방향 실행')
        console.log('요청을 이렇게나 많이 보냄')
        fetchPreviousPage()
        // console.log(playlistMyData)
        // scrollPosition('top')
      }
    }
  }

  // const scrollPosition = (type: string) => {
  //   const height = listRef.current?.children[0]
  //     ? listRef.current?.children[0].clientHeight
  //     : 0
  //   console.log('height', height)
  //   const itemHeight = height
  //   if (scrollBoxRef.current) {
  //     console.log(scrollBoxRef.current.scrollTop)

  //     const position =
  //       type === 'top'
  //         ? scrollBoxRef.current.scrollTop + itemHeight * 5
  //         : scrollBoxRef.current.scrollTop - itemHeight * 3

  //     scrollBoxRef.current.scrollTop = position
  //   }
  // window.scrollTo({
  //   top: position,
  //   // behavior: 'smooth', // 부드럽게 스크롤 이동
  // })
  // }

  //스크롤이 한 100 정도쯤 되면 이전 페이지 불러오기 실행

  const previousPage = () => {
    // const height = listRef.current?.children[0]
    //   ? listRef.current?.children[0].clientHeight
    //   : 0
    // console.log(scroll.current, height * 3, height)
    // if (hasPreviousPage && scroll.current < height * 3) {
    //   console.log('이거 실행')
    //   fetchPreviousPage()
    //   scrollPosition('top')
    // }
  }

  const nextPage = () => {
    fetchNextPage()
    console.log(playlistMyData?.pageParams.length)
    // if (MAX_PAGES === playlistMyData?.pageParams.length!) {
    //   scrollPosition('bottom')
    // }
  }

  // //역방향
  // const onIntersectTop = ([entry]: IntersectionObserverEntry[]) =>
  //   entry.isIntersecting && previousPage()

  // useIntersectionObserver({
  //   target: topRef,
  //   onIntersect: onIntersectTop,
  //   enabled: hasPreviousPage,
  // })

  // //정방향
  // //감시하는 요소가 보여지면 fetchNextPage 실행하도록 하는 onIntersect로직을 useIntersectionObserver 에 넘겨줌
  // const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
  //   entry.isIntersecting && nextPage()

  // useIntersectionObserver({
  //   target: bottomRef,
  //   onIntersect,
  //   enabled: hasNextPage,
  // })

  // useEffect(() => {
  //   if (scrollBoxRef.current) {
  //     scroll.current = scrollBoxRef.current.scrollTop
  //   }
  //   console.log('scroll.current', scroll.current)
  // }, [scrollBoxRef.current?.scrollTop])

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
        <ButtonPrimary onClick={onClickAllAddHandler}>
          전체 곡 담기
        </ButtonPrimary>
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
      {/* {hasPreviousPage && <div ref={topRef}></div>}
      {isFetchingPreviousPage && (
        <div className='flex h-[50px] items-center justify-center'>
          <Image
            src={loading}
            height={40}
            width={40}
            alt='데이터를 가져오는 중입니다.'
          />
        </div>
      )} */}
      <div
        ref={scrollBoxRef}
        className='max-h-[500px] overflow-y-auto'
        onScroll={handleScroll}
      >
        <InfiniteScrollContainer
          isFetchingNextPage={isFetchingNextPage}
          isFetchingPreviousPage={isFetchingPreviousPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          previousPage={previousPage}
          nextPage={nextPage}
          root={scrollBoxRef.current}
          // rootMargin='-100px 0px 0px 0px'
        >
          <ul
            className={`tracking-[-0.03em] ${toggle ? toggleStyle : ''} overflow-hidden transition-opacity ease-in-out`}
            ref={listRef}
          >
            {playlistMyData && playlistMyData.playlistMyIds?.length! > 0 ? (
              <>
                {playlistMyData.pages.map((group, i) => (
                  <React.Fragment key={playlistMyData.pageParams[i]}>
                    {group?.map((item) => (
                      <li
                        key={item.musicId}
                        className='flex items-center justify-between p-4'
                      >
                        <div className='flex items-center'>
                          <CheckboxItem
                            checked={checkedList.includes(item.musicId)}
                            id={`my-${item.musicId}`}
                            onChangeCheckMusicHandler={(e) =>
                              onChangeCheckMusicHandler(
                                e.target.checked,
                                item.musicId,
                              )
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
                            className='flex cursor-pointer flex-col'
                          >
                            <span className='text-[1.125rem]'>
                              {item.musicTitle}
                            </span>
                            <span className='text-[0.875rem] text-[#ffffff7f]'>
                              {item.artist}
                            </span>
                          </label>
                        </div>
                        <span className='text-[0.875rem] font-medium text-[#ffffff7f]'>
                          {item.runTime}
                        </span>
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <li className='flex h-[300px] items-center justify-center text-[1rem] text-white/50'>
                좋아하는 음악을 추가해보세요!
              </li>
            )}
          </ul>
        </InfiniteScrollContainer>
      </div>
      {/* {isFetchingNextPage && (
        <div className='flex h-[50px] items-center justify-center'>
          <Image
            src={loading}
            height={40}
            width={40}
            alt='데이터를 가져오는 중입니다.'
          />
        </div>
      )}
      {hasNextPage && <div className='h-2' ref={bottomRef}></div>} */}
    </div>
  )
}

export default MyPlaylist
