'use client'
import useInput from '@/hooks/useInput'
import { useCurrentMusicStore } from '@/shared/store/playerStore'
import { useSearchedKeywordStore } from '@/shared/store/searchStore'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef } from 'react'
import search from '@/../public/images/Property 1=search-sm.png'
import Image from 'next/image'

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
    <div className='inline-flex w-[400px] items-center justify-between rounded-xl border-4 border-black border-opacity-10 bg-white bg-opacity-10 px-4 py-2 shadow shadow-inner'>
      <div className='flex items-center'>
        <form onSubmit={onSubmitHandler} className='flex items-center gap-2'>
          <button type='submit' className='border-r-2 border-zinc-100'>
            <Image src={search} alt='검색' className='mr-2' />
          </button>
          <input
            type='text'
            name='keyword'
            value={keyword}
            ref={keywordRef}
            onChange={onChange}
            className='appearance-none bg-transparent focus:outline-none'
          />

          <select
            name='selectedTabs'
            value={selectedTabs}
            onChange={onChange}
            className='appearance-none bg-transparent'
          >
            <option value='musicInfo'>노래검색</option>
            <option value='community'>게시글 검색</option>
          </select>
        </form>
      </div>
    </div>
  )
}

export default SearchForm
