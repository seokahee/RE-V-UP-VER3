'use client'
import { queryClient } from '@/app/provider'
import {
  getCurrentMusicList,
  getMyMusicList,
  insertMyPlayMusic,
  updateCurrentMusic,
  updateMyPlayMusic,
} from '@/shared/musicPlayer/api'
import { useStore } from '@/shared/store'
import { CurrentPlaylistType } from '@/types/musicPlayer/types'
import { paging } from '@/util/util'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import 'react-h5-audio-player/lib/styles.css'
import CurrentMusicList from './CurrentMusicList'
import Player from './Player'
import Pagination from '@/util/Pagination '

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [randomIndex, setRandomIndex] = useState<number>(0)
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isRandom, setIsRandom] = useState(false)
  const { userInfo } = useStore()
  const { uid } = userInfo
  const router = useRouter()

  const { data: currentPlayList } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCurrentMusicList(queryKey[1])
    },
    queryKey: ['playListCurrent', uid],
  })

  const { data: myPlayList } = useQuery({
    queryFn: ({ queryKey }) => {
      return getMyMusicList(queryKey[1])
    },
    queryKey: ['getMyMusicList', uid],
  })

  const deleteMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
    },
  })

  const insertMutation = useMutation({
    mutationFn: insertMyPlayMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyMusicList'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateMyPlayMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyMusicList'] })
    },
  })

  if (!currentPlayList) {
    return
  }

  const onPreviousHandler = () => {
    setCurrentIndex((prev) => {
      return (
        (prev - 1 + currentPlayList[currentIndex].musicSource.length) %
        currentPlayList[currentIndex].musicSource.length
      )
    })
  }

  const onNextTrackHandler = () => {
    setCurrentIndex((prev) => (prev + 1) % currentPlayList.length)
  }

  const onRandomMusicHandler = () => {
    setIsRandom((prev) => !prev)
    if (isRandom) {
      const randomIndex = Math.floor(Math.random() * currentPlayList.length)
      setRandomIndex(randomIndex)
    } else {
      setRandomIndex(0)
    }
  }

  const onChangeCheckMusicHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      const checkList = checkedList.filter((el) => el !== id)
      setCheckedList(checkList)
    }
  }

  const onDeleteCurrentMusicHandler = async () => {
    if (window.confirm('현재 재생 목록에서 선택 항목을 삭제하시겠습니까?')) {
      const currentMusicData = currentPlayList
        .filter((music) => !checkedList.includes(music.musicId))
        .map((music) => music.musicId)
      deleteMutation.mutate({ uid, currentMusicData })
    }
  }

  const onInsertMyPlayListHandler = async () => {
    if (checkedList.length === 0) {
      alert('노래를 선택해주세요')
      return
    }
    if (uid === '') {
      alert(
        '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
      )
      router.replace('/login')
      return
    }
    if (window.confirm('선택한 곡을 마이플레이 리스트에 추가하시겠습니까?')) {
      if (myPlayList && myPlayList.length > 0) {
        const myIndex = myPlayList.flatMap((item) => {
          return item.myMusicIds
        })
        const setIndex = new Set(myIndex)
        const uniqueValues = checkedList.filter((val) => {
          return !setIndex.has(val)
        })
        if (uniqueValues.length === 0) {
          alert('이미 추가된 노래입니다.')
          setCheckedList([])
          return
        } else {
          const updateList = [...myIndex, ...uniqueValues]
          updateMutation.mutate({ userId: uid, myMusicList: updateList })
          alert('마이플레이리스트에 추가 되었습니다.')
          setCheckedList([])
        }
      } else {
        insertMutation.mutate({ userId: uid, musicId: checkedList })
        alert('현재 재생목록에 추가 되었습니다.')
        setCheckedList([])
      }
    }
  }

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    currentPlayList,
    currentPage,
    setCurrentPage,
  )

  return (
    <div>
      {currentItems?.length === 0 ? (
        <div>현재 재생 목록이 없습니다</div>
      ) : (
        <div>
          <Player
            isRandom={isRandom}
            currentPlayList={currentPlayList as CurrentPlaylistType[]}
            randomIndex={randomIndex}
            currentIndex={currentIndex}
            onPreviousHandler={onPreviousHandler}
            onNextTrackHandler={onNextTrackHandler}
          />

          <CurrentMusicList
            currentItems={currentItems}
            checkedList={checkedList}
            onChangeCheckMusicHandler={onChangeCheckMusicHandler}
            onDeleteCurrentMusicHandler={onDeleteCurrentMusicHandler}
            onInsertMyPlayListHandler={onInsertMyPlayListHandler}
            onRandomMusicHandler={onRandomMusicHandler}
            isRandom={isRandom}
            setRandomIndex={setRandomIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default MusicPlayer
