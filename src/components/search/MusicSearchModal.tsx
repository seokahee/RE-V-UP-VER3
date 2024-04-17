import React, { FormEvent, KeyboardEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { useModalMusicResultStore } from '@/shared/store/searchStore'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import { modalMusicSearchData } from '@/shared/search/api'
import type { MusicInfoType } from '@/types/musicPlayer/types'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'
import { GOBACK_SHADOW } from '../communityDetail/detailCss'
import { DOWN_ACTIVE_BUTTON, OPEN_ANOTHER_SHADOW } from '../login/loginCss'
import { modalPaging } from '@/util/util'
import Pagination from '@/util/Pagination '
import useInput from '@/hooks/useInput'
import ModalMusicData from './ModalMusicData'
import search from '@/../public/images/community-detail-Image/search-button.svg'

const MusicSearchModal = ({
  setIsModal,
}: {
  isModal: boolean
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { isChooseMusic } = useMusicSearchedStore()
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

  const onAddViewMusicHandler = () => {
    if (!isChooseMusic) {
      alert('음악을 선택해 주세요!')
      return
    }

    alert('음악이 등록되었습니다.')
    setIsModal(false)
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const submitEvent = new Event('submit', {
        bubbles: true,
        cancelable: true,
      })
      e.currentTarget.form?.dispatchEvent(submitEvent)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-50'>
      <div
        className={`${GOBACK_SHADOW} flex h-4/5 w-3/5 flex-col items-center justify-center gap-[94px] overflow-y-scroll rounded-[32px] border-[4px] border-solid border-[#474747] bg-[#3D3D3D] pb-[300px] scrollbar-hide ${OPEN_ANOTHER_SHADOW} `}
      >
        <form onSubmit={onSubmitHandler} className='mt-[40px]'>
          <div>
            <input
              type='text'
              name='keyword'
              value={keyword}
              ref={keywordRef}
              onChange={onChange}
              onKeyUp={(e) => handleKeyUp(e)}
              className='border  border-black'
            />
            <button type='submit' className='m-3'>
              <Image src={search} alt='검색 아이콘' width={24} height={24} />
            </button>
          </div>
          <button onClick={() => setIsModal(false)}>닫기</button>
        </form>
        <div className='flex flex-col border-[1px] border-solid border-primary'>
          <div className='p-[36px]'>
            <div className='flex flex-col items-start gap-[12px] overflow-y-scroll scrollbar-hide '>
              {currentItems.map((item: any, index: number) => {
                return (
                  <ModalMusicData
                    key={item.musicId}
                    item={item}
                    index={index}
                  />
                )
              })}
            </div>
            <div className='pt-[16px] [&_div]:m-0'>
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
        </div>
        <div className='relative flex flex-row items-center justify-center shadow-primary'>
          <button
            onClick={onAddViewMusicHandler}
            className='rounded-lg px-[10px] text-white'
          >
            <span
              className={`flex h-[48px] w-[160px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
            >
              등록
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MusicSearchModal
