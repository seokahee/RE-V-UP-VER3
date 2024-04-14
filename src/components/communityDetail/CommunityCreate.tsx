'use client'

import React, { FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MusicSearch from '../search/MusicSearch'
import { useCoummunityItem } from '@/query/communityDetail/mutation'
import useInput from '@/hooks/useInput'
import Image from 'next/image'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'

const CommunityCreate = () => {
  const router = useRouter()
  const { data: userSessionInfo, status } = useSession()
  const { addCommunityMutation } = useCoummunityItem()
  const { chooseMusic } = useMusicSearchedStore()
  const musicId = chooseMusic?.musicId as string
  const musicTitle = chooseMusic?.musicTitle
  const artist = chooseMusic?.artist
  const thumbnail = chooseMusic?.thumbnail

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
  if (status === 'unauthenticated') {
    alert('로그인한 유저만 이용 가능합니다.')
    return
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
              className='focus:outline-todayPink mb-4 w-full rounded-lg border p-2'
              placeholder='제목을 입력하세요'
            />
          </div>
          <input
            type='text'
            name='content'
            value={content}
            onChange={onChangeHandler}
            className='focus:outline-todayPink mb-4 w-full rounded-lg border p-2'
            placeholder='내용을 입력하세요'
          />
        </div>
      </form>
      <article>
        <MusicSearch />
      </article>
      <article>
        <div>
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt='노래앨범이미지'
              width={80}
              height={80}
            />
          ) : (
            <div className='h-[80px] w-[80px] rounded-[16px] border-[1px] border-solid border-black'>
              <i></i>
            </div>
          )}
        </div>
        <section className='flex gap-[16px] [&_div]:flex [&_div]:gap-[16px]'>
          <div>
            <p>{musicTitle}</p>
            <p>{artist}</p>
          </div>
        </section>
      </article>
    </div>
  )
}

export default CommunityCreate
