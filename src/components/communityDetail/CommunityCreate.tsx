'use client'

import React, { FormEvent, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import {
  useCoummunityItem,
  validateFormBlank,
} from '@/query/communityDetail/mutation'
import MusicSearch from '../search/MusicSearch'
import useInput from '@/hooks/useInput'
import goback from '@/../public/images/goback.svg'
import {
  ADDED_CURRENT_MUSIC_SHADOW,
  ADD_BOARD_STICK,
  ALLOW_SHADOW,
} from './communityCss'
import { DOWN_ACTIVE_BUTTON } from '../login/loginCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'
import Swal from 'sweetalert2'

const CommunityCreate = () => {
  const router = useRouter()
  const refTitle = useRef<HTMLInputElement>(null)
  const { chooseMusic, isChooseMusic, setChooseMusic } = useMusicSearchedStore()
  const { addCommunityMutation } = useCoummunityItem()
  const { data: userSessionInfo, status } = useSession()
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

  useEffect(() => {
    if (refTitle.current !== null) {
      refTitle.current.focus()
    }
  }, [])

  const onSumitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const { firstBlank: titleBlank, secondBlank: contentBlack } =
      validateFormBlank(boardTitle, content)

    if (!boardTitle || titleBlank === '') {
      await Swal.fire({
        text: '제목을 입력해 주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })

      return
    }

    if (!content || contentBlack === '') {
      await Swal.fire({
        text: '내용을 입력해 주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    if (!chooseMusic) {
      await Swal.fire({
        text: '음악 선택은 필수입니다!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    if (userSessionInfo && userSessionInfo.user.uid) {
      const { uid } = userSessionInfo.user
      const newData = {
        boardTitle,
        content,
        userId: uid,
        musicId,
      }
      addCommunityMutation.mutate(newData)
      await Swal.fire({
        text: '등록이 완료됐습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      reset()
      setChooseMusic(null)
      router.push('/community')
    }
    if (!userSessionInfo) {
      Swal.fire({
        text: '오류로 인해 정보를 저장할 수 없습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }
  }

  if (status === 'unauthenticated') {
    Swal.fire({
      text: '로그인한 유저만 이용 가능합니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#685BFF',
      color: '#ffffff',
      background: '#2B2B2B',
    })
    router.replace('/')
    return
  }

  return (
    <div>
      <form onSubmit={onSumitHandler} className='flex flex-col gap-[32px]'>
        <div
          className={`mt-[32px] flex h-[72px] w-[100%] items-center justify-between rounded-[16px] border-[4px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] px-[24px] py-[12px] tracking-[-0.03em] ${ADD_BOARD_STICK}`}
        >
          <button
            onClick={(e) => {
              e.preventDefault()
              router.replace('/community')
              setChooseMusic(null)
            }}
            className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.1)] ${ALLOW_SHADOW}`}
          >
            <Image src={goback} alt='이전으로 아이콘' width={24} height={24} />
          </button>
          <div className='mx-[auto] text-center'>
            <h3>글쓰기</h3>
          </div>
          <button
            className={`flex h-[48px] w-[120px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
          >
            <p>등록하기</p>
          </button>
        </div>

        <div>
          <div className='w-full'>
            <input
              type='text'
              name='boardTitle'
              value={boardTitle}
              ref={refTitle}
              maxLength={40}
              onChange={onChangeHandler}
              className=' mb-4 w-full rounded-lg border-none bg-[rgba(255,255,255,0.1)] p-2'
              placeholder='제목을 입력해 주세요.'
            />
          </div>
          <textarea
            name='content'
            value={content}
            maxLength={200}
            onChange={onChangeHandler}
            className='mb-4 h-[200px] w-full rounded-lg border-none bg-[rgba(255,255,255,0.1)] p-2 '
            placeholder='추천할 음악에 대해 얘기해 주세요.'
          ></textarea>
        </div>
      </form>

      <article className='flex flex-col gap-[16px]'>
        <section className='flex gap-[16px]'>
          <MusicSearch />
          <article
            className={`flex h-[88px] w-[602px] gap-[16px] rounded-[16px] bg-[rgba(255,255,255,0.1)] p-[16px] ${ADDED_CURRENT_MUSIC_SHADOW} flex gap-[16px]`}
          >
            <section className='flex gap-[16px]'>
              <div className='flex items-center'>
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt='노래앨범이미지'
                    width={56}
                    height={56}
                    className='rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)]'
                  />
                ) : (
                  <div className='h-[56px] w-[56px] rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)]'>
                    <i></i>
                  </div>
                )}
              </div>
              <article className='flex w-full items-center justify-center [&_div]:flex [&_div]:gap-[16px]'>
                <div className='flex w-full items-center'>
                  <p className='text-[24px] font-bold'>{musicTitle}</p>

                  <p className='text-[16px] font-bold'>{artist}</p>
                </div>
              </article>
            </section>
          </article>
        </section>
        <div>
          <p className='text-[14px] text-[rgba(255,255,255,0.5)]'>
            게시글을 등록하기 위해 음악을 추가 해야돼요!
          </p>
        </div>
      </article>
    </div>
  )
}

export default CommunityCreate
