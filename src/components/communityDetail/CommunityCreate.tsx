'use client'

import React, { FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MusicSearch from '../search/MusicSearch'
import { useCoummunityItem } from '@/query/communityDetail/mutation'
import Image from 'next/image'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import goback from '@/../public/images/goback.svg'
import { GOBACK_SHADOW } from './detailCss'
import useInput from '@/hooks/useInput'

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
        <div className='flex h-[72px] w-[100%] items-center justify-between'>
          <button
            onClick={(e) => {
              e.preventDefault()
              router.replace('/community')
            }}
            className={`${GOBACK_SHADOW}`}
          >
            <Image src={goback} alt='이전으로 아이콘' width={24} height={24} />
          </button>
          <div>
            <h3 className='mx-[auto]'>글쓰기</h3>
          </div>
          <button>등록</button>
        </div>

        <div>
          <div>
            <input
              type='text'
              name='boardTitle'
              value={boardTitle}
              onChange={onChangeHandler}
              className='focus:outline-todayPink mb-4 w-full rounded-lg border p-2  text-black'
              placeholder='제목을 입력하세요'
            />
          </div>
          <input
            type='text'
            name='content'
            value={content}
            onChange={onChangeHandler}
            className='focus:outline-todayPink mb-4 w-full rounded-lg border p-2 text-black'
            placeholder='추천할 음악에 대해 얘기해 주세요'
          />
        </div>
      </form>

      <article className='flex flex-col gap-[16px]'>
        <div className='flex gap-[16px]'>
          <MusicSearch />
          <section className='flex gap-[16px]'>
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
            <article className='flex items-center justify-center [&_div]:flex [&_div]:gap-[16px]'>
              <div className='flex items-center'>
                <p className='text-[24px] font-bold'>{musicTitle}</p>
                <p className='text-[16px] font-bold'>{artist}</p>
              </div>
            </article>
          </section>
        </div>
        <div>
          <p>게시글을 등록하기 위해 음악을 추가 해야돼요!</p>
        </div>
      </article>
    </div>
  )
}

export default CommunityCreate
