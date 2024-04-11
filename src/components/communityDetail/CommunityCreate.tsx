'use client'

import React, { FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MusicSearch from '../search/MusicSearch'
import { useCoummunityItem } from '@/query/communityDetail/communityMutation'
import useInput from '@/hooks/useInput'
import Image from 'next/image'

const CommunityCreate = () => {
  const router = useRouter()
  const { data: userSessionInfo } = useSession()
  const { addCommunityMutation } = useCoummunityItem()
  const musicId = 'b5e50b6b-36cd-4809-b881-0c3a781a3347'
  const nickname = '둥둥'
  const thumbnail =
    'https://hxavgjouatzlrjtjgrth.supabase.co/storage/v1/object/public/musicThumbnail/Extraterrestrial.png'
  const musicTitle = 'Extraterrestrial'
  const artist = 'v-up'
  const release = '2024-04-03 utc'
  const musicSource =
    'https://hxavgjouatzlrjtjgrth.supabase.co/storage/v1/object/public/music/Extraterrestrial.mp3'
  const runTime = '1:33'

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
            src={`${thumbnail}`}
            alt='노래앨범이미지'
            width={80}
            height={80}
          />
        </div>
        <div>{nickname}</div>
        <div>
          <p>{musicTitle}</p>
          <p>{artist}</p>
        </div>
        <div>
          <p>{runTime}</p>
        </div>
      </article>
    </div>
  )
}

export default CommunityCreate
