'use client'

import React from 'react'
import useInput from '@/hooks/useInput'
import MusicSearch from '../search/MusicSearch'

const CommunityCreate = () => {
  const { form, setForm, onChange, reset } = useInput({
    title: '',
  })
  const { title } = form
  return (
    <div>
      <form>
        <button>등록</button>
        <div>
          <input
            type='text'
            name='title'
            value={title}
            onChange={onChange}
            className='mb-4 border w-full p-2 rounded-lg focus:outline-todayPink'
            placeholder='제목을 입력하세요'
          />
        </div>
      </form>
      <MusicSearch />
    </div>
  )
}

export default CommunityCreate
