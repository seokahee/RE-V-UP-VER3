'use client'
import { queryClient } from '@/app/provider'
import {
  getCurrentMusicList,
  getMyMusicList,
  insertMyPlayMusic,
  updateCurrentMusic,
  updateMyPlayMusic,
} from '@/shared/musicPlayer/api'
import { CurrentPlaylistType } from '@/types/musicPlayer/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import 'react-h5-audio-player/lib/styles.css'
import CurrentMusicList from './CurrentMusicList'
import Player from './Player'

const MusicPlayer = () => {
  const [musicIndex, setMusicIndex] = useState<number>(0)
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [isRandom, setIsRandom] = useState(false)
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user.uid as string
  const router = useRouter()

  console.log('uid', uid)

  const {
    data: currentPlayList,
    isLoading,
    isError,
  } = useQuery({
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

  if (isLoading) {
    return <div>정보를 가져오고 있습니다</div>
  }
  if (!currentPlayList) {
    return
  }
  if (isError) {
    console.error('현재 플레이리스트를 가져오지 못했습니다')
    return
  }

  const randomIndex = Math.floor(Math.random() * currentPlayList.length)

  const onRandomMusicHandler = () => {
    setIsRandom((prev) => {
      return !prev
    })
  }

  const onPreviousHandler = () => {
    if (!isRandom) {
      if (musicIndex === 0) {
        setMusicIndex(currentPlayList.length - 1) // 마지막 곡으로 이동
      } else {
        setMusicIndex((prev) => prev - 1) // 이전 곡으로 이동
      }
    } else {
      setMusicIndex(randomIndex)
    }
  }

  const onNextTrackHandler = () => {
    if (!isRandom) {
      if (musicIndex === currentPlayList.length - 1) {
        setMusicIndex(0) // 첫 번째 곡으로 돌아감
      } else {
        setMusicIndex((prev) => prev + 1) // 다음 곡으로 이동
      }
    } else {
      setMusicIndex(randomIndex)
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

        // some - || / every - &&
        const uniqueValues = checkedList.filter((value) => {
          return myIndex.every((item) => {
            console.log('item', item)
            return item !== value
          })
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

  return (
    <div>
      {currentPlayList?.length === 0 ? (
        <div>현재 재생 목록이 없습니다</div>
      ) : (
        <div>
          <Player
            currentPlayList={currentPlayList as CurrentPlaylistType[]}
            musicIndex={musicIndex}
            onPreviousHandler={onPreviousHandler}
            onNextTrackHandler={onNextTrackHandler}
          />
          <CurrentMusicList
            currentPlayList={currentPlayList as CurrentPlaylistType[]}
            checkedList={checkedList}
            onChangeCheckMusicHandler={onChangeCheckMusicHandler}
            onDeleteCurrentMusicHandler={onDeleteCurrentMusicHandler}
            onInsertMyPlayListHandler={onInsertMyPlayListHandler}
            onRandomMusicHandler={onRandomMusicHandler}
            isRandom={isRandom}
            setMusicIndex={setMusicIndex}
          />
        </div>
      )}
    </div>
  )
}

export default MusicPlayer
