import useInput from '@/hooks/useInput'
import { modalMusicSearchData } from '@/shared/search/api'
import { useModalMusicResultStore } from '@/shared/store/searchStore'
import { MusicInfoType } from '@/types/musicPlayer/types'
import Pagination from '@/util/Pagination '
import { modalPaging } from '@/util/util'
import React, { FormEvent, useRef, useState } from 'react'
import ModalMusicData from './ModalMusicData'

const MusicSearchModal = ({
  setIsModal,
}: {
  isModal: boolean
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [musicList, setMusicList] = useState<MusicInfoType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { form: keywordInput, onChange } = useInput({
    keyword: '',
  })
  const { keyword } = keywordInput
  const keywordRef = useRef<HTMLInputElement>(null)
  const modalMusicResult = useModalMusicResultStore(
    (state) => state.modalMusicResult,
  )

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!keyword) {
      alert('검색 키워드를 입력해 주세요')
      return keywordRef.current?.focus()
    }

    const getMusicData = async (keyword: string) => {
      const data = await modalMusicSearchData(keyword)
      modalMusicResult(data as MusicInfoType[])

      if (data && data?.length > 0) {
        setMusicList(data)
      } else {
        alert('검색 결과가 없습니다')
      }
    }
    getMusicData(keyword)
  }



  const { currentItems, nextPage, prevPage, totalPages } = modalPaging(
    musicList,
    currentPage,
    setCurrentPage,
  )

  return (
    <div className='fixed w-full h-screen inset-0 flex flex-col justify-center items-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white h-4/5 w-3/5 flex flex-col items-center rounded-md pb-10'>
        <form onSubmit={onSubmitHandler}>
          <input
            type='text'
            name='keyword'
            value={keyword}
            ref={keywordRef}
            onChange={onChange}
            className='border  border-black'
          />
          <button type='submit' className='m-3'>
            검색
          </button>
          <button onClick={() => setIsModal(false)}>닫기</button>
        </form>
        <div className='overflow-y-scroll scrollbar-hide'>
          {currentItems.map((item: any) => {
            return <ModalMusicData key={item.musicId} item={item} />
          })}
        </div>

        {currentItems && currentItems.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </div>
    </div>
  )
}

export default MusicSearchModal
