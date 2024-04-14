'use client'
import { queryClient } from '@/app/provider'
import { getMusicList } from '@/query/musicPlayer/musicPlayerQueryKey'
import {
  insertMyPlayMusic,
  updateCurrentMusic,
  updateMyPlayMusic,
} from '@/shared/musicPlayer/api'
import { CurrentPlayListType } from '@/types/musicPlayer/types'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import 'react-h5-audio-player/lib/styles.css'
import CurrentMusicList from './CurrentMusicList'
import Player from './Player'

const MusicPlayer = () => {
  const [musicIndex, setMusicIndex] = useState<number>(0)
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [isLyrics, setIsLyrics] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user.uid as string
  const router = useRouter()

  const { currentPlayList, myPlayList, isError } = getMusicList(uid)

  const deleteMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playListCurrent'] })
      queryClient.invalidateQueries({ queryKey: ['getCurrentMusicList'] })
    },
  })

  const insertMutation = useMutation({
    mutationFn: insertMyPlayMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myMusicIds'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateMyPlayMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myMusicIds'] })
    },
  })

  if (!currentPlayList) {
    return
  }
  if (isError) {
    console.error('현재 플레이리스트를 가져오지 못했습니다')
    return
  }

  const onLyricsToggle = () => {
    setIsLyrics((prev) => !prev)
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
    if (checkedList.length === 0) {
      alert('삭제할 노래를 선택해주세요')
      return
    }
    if (window.confirm('선택 항목을 삭제하시겠습니까?')) {
      const currentMusicData = currentPlayList
        .filter((music) => !checkedList.includes(music.musicId))
        .map((music) => music.musicId)
      deleteMutation.mutate({ uid, currentMusicData })
      setCheckedList([])
    }
  }
  const onInsertMyPlayListHandler = async () => {
    if (checkedList.length === 0) {
      alert('저장할 노래를 선택해주세요')
      return
    }
    if (uid === '' || !uid) {
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
        alert('마이플레이리스트에 추가 되었습니다.')
        setCheckedList([])
      }
    }
  }
  return (
    <div className='w-388'>
      <div>
        <div>
          <Player
            isLyrics={isLyrics}
            musicIndex={musicIndex}
            currentPlayList={currentPlayList as CurrentPlayListType[]}
            onRandomMusicHandler={onRandomMusicHandler}
            isRandom={isRandom}
            onPreviousHandler={onPreviousHandler}
            onNextTrackHandler={onNextTrackHandler}
            onLyricsToggle={onLyricsToggle}
            onInsertMyPlayListHandler={onInsertMyPlayListHandler}
          />
        </div>
        <div>
          <CurrentMusicList
            isLyrics={isLyrics}
            currentPlayList={currentPlayList as CurrentPlayListType[]}
            checkedList={checkedList}
            onChangeCheckMusicHandler={onChangeCheckMusicHandler}
            onDeleteCurrentMusicHandler={onDeleteCurrentMusicHandler}
            setMusicIndex={setMusicIndex}
          />
        </div>
      </div>
    </div>
  )
}
export default MusicPlayer
