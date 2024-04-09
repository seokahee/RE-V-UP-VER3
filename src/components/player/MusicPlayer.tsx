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
import Pagination from '../mypage/Pagination'
import CurrentMusicList from './CurrentMusicList'

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { userInfo } = useStore()
  const { uid } = userInfo
  const router = useRouter()

  console.log('uid', uid)

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

  const itemsPerPage = 10
  const totalPages = Math.ceil(currentPlayList.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = currentPlayList.slice(indexOfFirstItem, indexOfLastItem)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
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
            loop={false}
            volume={0.1}
            showSkipControls={true}
            onClickPrevious={onPreviousHandler}
            onClickNext={onNextTrackHandler}
            src={currentPlayList[currentIndex].musicSource}
            onEnded={onNextTrackHandler}
          />

          <CurrentMusicList
            currentItems={currentItems}
            checkedList={checkedList}
            onChangeCheckMusicHandler={onChangeCheckMusicHandler}
            onDeleteCurrentMusicHandler={onDeleteCurrentMusicHandler}
            onInsertMyPlayListHandler={onInsertMyPlayListHandler}
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

// return (
//   <div>
//     {currentPlayList?.length === 0 ? (
//       <div>현재 재생 목록이 없습니다</div>
//     ) : (
//       <div>
//         <div>
//           <div>{currentPlayList[currentIndex].musicTitle}</div>
//           <div>{currentPlayList[currentIndex].artist}</div>
//           <Image
//             src={currentPlayList[currentIndex].thumbnail}
//             alt='Album Thumbnail'
//             width={100}
//             height={100}
//           />
//           <div>{currentPlayList[currentIndex].lyrics}</div>
//         </div>

//         <AudioPlayer
//           // autoPlay
//           loop={false}
//           // 볼륨 나중에 0.5로 변경할것!, 테스트중으로 자동 재생설정함
//           volume={0.1}
//           showSkipControls={true}
//           onClickPrevious={onPreviousHandler}
//           onClickNext={onNextTrackHandler}
//           src={currentPlayList[currentIndex].musicSource}
//           onEnded={onNextTrackHandler}
//         />
//         <div>
//           {currentItems?.map((item: any, index: number) => {
//             return (
//               <div key={item.musicId} className='flex gap-5'>
//                 <CheckboxItem
//                   checked={checkedList.includes(item.musicId)}
//                   id={item.musicId}
//                   onChangeCheckMusicHandler={(e) =>
//                     onChangeCheckMusicHandler(e.target.checked, item.musicId)
//                   }
//                 />
//                 <p
//                   onClick={() => {
//                     setCurrentIndex(index)
//                   }}
//                 >
//                   {item.musicTitle}
//                 </p>
//                 <span>{item.artist}</span>
//                 <span>{item.runTime}</span>
//               </div>
//             )
//           })}

//           <button
//             type='button'
//             onClick={onDeleteCurrentMusicHandler}
//             className='m-3'
//           >
//             삭제
//           </button>
//           <button type='button' onClick={onInsertMyPlayListHandler}>
//             마플리
//           </button>
//         </div>
//       </div>
//     )}
//     <Pagination
//       currentPage={currentPage}
//       totalPages={totalPages}
//       prevPage={prevPage}
//       nextPage={nextPage}
//       setCurrentPage={setCurrentPage}
//     />
//   </div>
// )
