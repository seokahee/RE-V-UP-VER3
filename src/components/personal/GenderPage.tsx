'use client'
import { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useRouter } from 'next/navigation'
import ButtonPrimary from '../../util/ButtonPrimary'
import PreviousButton from '../mypage/PreviousButton'
import { DROP_SHADOW, INPUT_SHADOW, INPUT_FOCUS } from '../login/loginCss'
const GenderPage = ({
  setPageCount,
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [gender, setGender] = useState<string>('')
  const router = useRouter()
  const { addGender } = useSurvey()

  const onChangeHandler = (gender: string) => {
    setGender(gender)
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
      <div className='grid h-[550px] h-screen w-[600px] place-items-center rounded-[32px] bg-white bg-opacity-10'>
        <div className='place-content-center'>
          <p className='text-center font-bold'>성별을 선택해주세요</p>
        </div>
        <div className='flex flex-col justify-center gap-3'>
          <label className='relative inline-flex items-center justify-center gap-2  rounded-xl bg-white bg-opacity-20 shadow shadow-inner '>
            <button
              onClick={() => setGender('male')}
              className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} inline-flex h-[100px] w-[336px] items-center justify-center gap-2 rounded-xl hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700`}
            >
              남자
            </button>
          </label>
          <label className='relative inline-flex items-center justify-center gap-2  rounded-xl bg-white bg-opacity-20 shadow shadow-inner '>
            <button
              onClick={() => setGender('female')}
              className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} inline-flex h-[100px] w-[336px] items-center justify-center gap-2 rounded-xl hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700`}
            >
              여자
            </button>
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
