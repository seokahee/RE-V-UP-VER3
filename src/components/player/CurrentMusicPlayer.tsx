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
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import CheckboxItem from '../mypage/CheckboxItem'

const CurrentMusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [checkedList, setCheckedList] = useState<string[]>([])
  const { userInfo } = useStore()
  const { uid } = userInfo
  const router = useRouter()

  console.log('uid', uid)

  const { data: currentPlayList } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCurrentMusicList(queryKey[1])
    },
    queryKey: ['getCurrentMusicList', uid],
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
      queryClient.invalidateQueries({ queryKey: ['getCurrentMusicList'] })
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
      console.log('뮤테이션이란다')
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

  const onChangeCheckMusicHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      const checkList = checkedList.filter((el) => el !== id)
      setCheckedList(checkList)
    }
  }

  // 삭제버튼
  const onDeleteCurrentMusicHandler = async () => {
    if (window.confirm('현재 재생 목록에서 선택 항목을 삭제하시겠습니까?')) {
      const currentMusicData = currentPlayList
        .filter((music) => !checkedList.includes(music.musicId))
        .map((music) => music.musicId)
      console.log('currentMusicData', currentMusicData)
      deleteMutation.mutate({ uid, currentMusicData })
    }
  }

  const onInsertMyPlayListHandler = async () => {
    if (uid === '') {
      alert(
        '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
      )
      router.replace('/login')
      return
    }
    if (window.confirm('선택한 곡을 마이플레이 리스트에 추가하시겠습니까?')) {
      // 마이플레이리스트 배열을 가져옴
      if (myPlayList && myPlayList.length > 0) {
        console.log('myPlayList', myPlayList)
        console.log('checkedList', checkedList)

        // 마플리의 중첩을 풀고 뮤직아이디배열 반환
        const myIndex = myPlayList.flatMap((item) => {
          return item.myMusicIds
        })
        // .flat() 평탄화 , 중첩 요소를 하나로 만들어줌 / flatMap -중첩 배열을 하나로 만들어줌 메서드 체이닝을 사용하지않고 한번에 중첩배열을 풀어 요소를 반복하며 새 배열을 반환해준다
        console.log('myIndex', myIndex)

        // 뮤직아이디배열에 선택한 뮤직아이디의 값과 같지않은것을 반환
        // set을 사용한 이유 - 중복값을 확인하기위해 아래 코드와도 같은로직이긴함
        const setIndex = new Set(myIndex)
        console.log('setIndex', setIndex)
        const uniqueValues = checkedList.filter((val) => {
          return !setIndex.has(val)
        })

        // const uniqueValues = checkedList.filter((value) => {
        //   return myIndex.some((item) => {
        //     console.log('item', item)
        //     return !item?.includes(value)
        //   })
        // })

        console.log('uniqueValues', uniqueValues)
        if (uniqueValues.length === 0) {
          alert('이미 추가된 노래입니다.')
          setCheckedList([])
          return
        } else {
          console.log('addMyMusicList', uniqueValues)
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
          <div>
            <div>{currentPlayList[currentIndex].musicTitle}</div>
            <div>{currentPlayList[currentIndex].artist}</div>
            <Image
              src={currentPlayList[currentIndex].thumbnail}
              alt='Album Thumbnail'
              width={100}
              height={100}
            />
            <div>{currentPlayList[currentIndex].lyrics}</div>
          </div>

          <AudioPlayer
            // autoPlay
            loop={false}
            // 볼륨 나중에 0.5로 변경할것!, 테스트중으로 자동 재생설정함
            volume={0.1}
            showSkipControls={true}
            onClickPrevious={onPreviousHandler}
            onClickNext={onNextTrackHandler}
            src={currentPlayList[currentIndex].musicSource}
            onEnded={onNextTrackHandler}
          />
          <div>
            {currentPlayList?.map((item: any, index: number) => {
              return (
                <div key={item.musicId} className='flex gap-5'>
                  <CheckboxItem
                    checked={checkedList.includes(item.musicId)}
                    id={item.musicId}
                    onChangeCheckMusicHandler={(e) =>
                      onChangeCheckMusicHandler(e.target.checked, item.musicId)
                    }
                  />
                  <p
                    onClick={() => {
                      setCurrentIndex(index)
                    }}
                  >
                    {item.musicTitle}
                  </p>
                  <span>{item.artist}</span>
                  <span>재생시간..</span>
                </div>
              )
            })}

            <button
              type='button'
              onClick={onDeleteCurrentMusicHandler}
              className='m-3'
            >
              삭제
            </button>
            <button type='button' onClick={onInsertMyPlayListHandler}>
              마플리
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrentMusicPlayer

// [
// "b5e50b6b-36cd-4809-b881-0c3a781a3347",
// "60b6a116-6192-42ff-bcc4-6427b474d223",
// "6d785319-0134-454b-b9b8-2044ca2b1498",
// "3bb9e4dd-1f54-402d-bf3e-ab5113073b76",
//   "6796be10-36fc-428e-bdeb-603c3c813f91",
//   "34a0a9de-872a-43bf-ae89-6fd3972bd708",
//   "228f1039-81d1-4fbe-8e8a-06678c7af1ec",
//   "6f238369-472f-4c09-9105-3dcc21b1e099",
// ];
