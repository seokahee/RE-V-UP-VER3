'use client'
import useInput from '@/hooks/useInput'
import { useSearchedKeywordStore } from '@/shared/store/searchStore'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef } from 'react'

const SearchForm = () => {
  const {
    form: keywordInput,
    onChange,
    reset,
  } = useInput({
    keyword: '',
    selectedTabs: 'musicInfo',
  })
  const { keyword, selectedTabs } = keywordInput
  const searched = useSearchedKeywordStore((state) => state.searched)
  const router = useRouter()
  const keywordRef = useRef<HTMLInputElement>(null)

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!keyword) {
      alert('검색 키워드를 입력해 주세요')
      return keywordRef.current?.focus()
    }
    searched(keyword, selectedTabs)
    router.push('/search')
    reset()
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <select name='selectedTabs' value={selectedTabs} onChange={onChange}>
          <option value='musicInfo'>노래 or 가수</option>
          <option value='community'>커뮤니티 제목</option>
        </select>
        <input
          type='text'
          name='keyword'
          value={keyword}
          ref={keywordRef}
          onChange={onChange}
          className='border  border-black'
        />
        <button type='submit'>검색</button>
      </form>
    </div>
  )
}

export default SearchForm
