'use client'
import { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useRouter } from 'next/navigation'
import ButtonPrimary from '../mypage/ButtonPrimary'
import PreviousButton from '../mypage/PreviousButton'

const GenderPage = ({
  setPageCount,
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [gender, setGender] = useState<string>('')
  const router = useRouter()
  const { addGender } = useSurvey()

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value)
  }

  const handleNextClick = (param: string) => {
    if (!gender) {
      alert('성별을 선택해주세요.')
      return
    }

    addGender(gender)
    return setPageCount(param)
  }

  return (
    <div className='grid h-screen place-items-center'>
      <div className='grid h-[600px] h-screen w-[500px] place-items-center rounded-[32px] bg-white bg-opacity-10'>
        <div className='place-content-center'>
          <p className='text-center font-bold'>성별을 선택해주세요</p>
        </div>
        <div className='flex flex-col justify-center gap-3'>
          <label className='relative inline-flex items-center justify-center gap-2 rounded-xl bg-white bg-opacity-20 shadow shadow-inner hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700'>
            <input
              type='radio'
              name='gender'
              value='male'
              checked={gender === 'male'}
              onChange={onChangeHandler}
              className='sr-only'
            />
            <p className='inline-flex h-[100px] w-[336px] items-center justify-center gap-2'>
              남자
            </p>
          </label>
          <label className='relative inline-flex items-center justify-center gap-2 rounded-xl bg-white bg-opacity-20 shadow shadow-inner hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700'>
            <input
              type='radio'
              name='gender'
              value='female'
              checked={gender === 'female'}
              onChange={onChangeHandler}
              className='sr-only'
            />
            <p className='inline-flex h-[100px] w-[336px] items-center justify-center gap-2'>
              여자
            </p>
          </label>
        </div>
        <div className='flex justify-center gap-3'>
          <PreviousButton onClick={() => router.back()}>이전</PreviousButton>
          <ButtonPrimary onClick={() => handleNextClick('pageTwo')}>
            다음
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export default GenderPage
