'use client'

import React, { FormEvent, MouseEvent } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MusicSearch from '../search/MusicSearch'
import {
  useCoummunityCreateItem,
  useCoummunityItem,
} from '@/query/communityDetail/communityMutation'
import useInput from '@/hooks/useInput'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { getCurrentMusicData } from '@/shared/main/api'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import defaultImg from '@/../public/images/vvv.png'

const CommunityCreate = () => {
  const router = useRouter()
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const { addCommunityMutation } = useCoummunityItem()
  const { chooseMusic } = useMusicSearchedStore()
  const musicId = chooseMusic?.musicId as string
  const musicTitle = chooseMusic?.musicTitle
  const artist = chooseMusic?.artist
  const thumbnail = chooseMusic?.thumbnail

  const { updateMutation, insertMutation } = useCoummunityCreateItem()

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: ['playListCurrent'],
    enabled: !!uid,
  })

  const {
    form: communityForm,
    onChange: onChangeHandler,
    reset,
  } = useInput({
    boardTitle: '',
    content: '',
  })

  const { boardTitle, content } = communityForm

  const onSumitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (userSessionInfo && userSessionInfo.user.uid) {
      const { uid } = userSessionInfo.user
      const newData = {
        boardTitle,
        content,
        userId: uid,
        musicId,
      }
      addCommunityMutation.mutate(newData)
      alert('등록이 완료됐습니다.')
      reset()
      router.push('/community')
    }
    if (!userSessionInfo) {
      alert('오류로 인해 정보를 저장할 수 없습니당.')
      return
    }
  }

  const onAddPlayerHandler = (
    e: MouseEvent,
    userId: string,
    musicId: string,
  ) => {
    e.preventDefault()
    if (!userId) {
      alert(
        '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
      )
      router.replace('/login')
      return
    }

    if (playListCurrent && playListCurrent.length > 0) {
      const currentList = playListCurrent[0].currentMusicIds
      if (currentList.find((el) => el === musicId)) {
        alert('이미 추가된 노래입니다.')
        return
      }
      currentList.push(musicId)
      updateMutation.mutate({ userId, currentList })
    } else {
      insertMutation.mutate({ userId, musicId })
    }
    alert('현재 재생목록에 추가 되었습니다.')
  }

  return (
    <div>
      <form onSubmit={onSumitHandler}>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              router.replace('/community')
            }}
          >
            <p>이전으로</p>
          </button>
          <div>
            <p>글쓰기 페이지</p>
          </div>
        </div>
        <button>등록</button>

        <div>
          <div>
            <input
              type='text'
              name='boardTitle'
              value={boardTitle}
              onChange={onChangeHandler}
              className='mb-4 border w-full p-2 rounded-lg focus:outline-todayPink'
              placeholder='제목을 입력하세요'
            />
          </div>
          <input
            type='text'
            name='content'
            value={content}
            onChange={onChangeHandler}
            className='mb-4 border w-full p-2 rounded-lg focus:outline-todayPink'
            placeholder='내용을 입력하세요'
          />
        </div>
      </form>
      <article>
        <MusicSearch />
      </article>
      <article>
        <div>
          <Image
            src={thumbnail || defaultImg}
            alt='노래앨범이미지'
            width={80}
            height={80}
          />
        </div>
        <section className='flex gap-[16px] [&_div]:flex [&_div]:gap-[16px]'>
          <div>
            <p>{musicTitle}</p>
            <p>{artist}</p>
          </div>
          <div>
            <button onClick={(e) => onAddPlayerHandler(e, uid, musicId)}>
              플레이어에 음악추가
            </button>
          </div>
        </section>
      </article>
    </div>
  )
}

export default CommunityCreate
