'use client'

import React, { FormEvent } from 'react'
import useInput from '@/hooks/useInput'
import MusicSearch from '../search/MusicSearch'
import { useRouter } from 'next/navigation'
import { addCommnityBoard } from '@/shared/communitydetail/detailApi'
import { useStore } from '@/shared/store'
import { COMMUNITY_QUERY_KEY } from '@/query/communityDetail/communityQueryKey'
import { useCoummunityItem } from '@/query/communityDetail/communityMutation'

const CommunityCreate = () => {
  const router = useRouter()
  const { userInfo } = useStore()
  const { addCommunityMutation } = useCoummunityItem()
  const { uid } = userInfo
  console.log(uid)
  const musicId = 'b5e50b6b-36cd-4809-b881-0c3a781a3347'
  const {
    form: communityForm,
    setForm,
    onChange: onChangeHandler,
    reset,
  } = useInput({
    boardTitle: '',
    content: '',
  })

  const { boardTitle, content } = communityForm

  const onSumitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const newData = {
      boardTitle,
      content,
      userId: uid,
      musicId,
    }
    // await addCommnityBoard(boardTitle, content, uid, musicId)
    addCommunityMutation.mutate(newData)
    // await addCommnityBoard(newData)
    alert('등록이 완료됐습니다.')
    reset()
    router.push('/community')
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
      <MusicSearch />
    </div>
  )
}

export default CommunityCreate
