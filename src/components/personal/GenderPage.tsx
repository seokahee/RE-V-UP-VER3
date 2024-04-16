'use client'
import { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useRouter } from 'next/navigation'
import ButtonPrimary from '../mypage/ButtonPrimary'
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

  console.log(gender, 'gender')

  return (
    <div className='grid h-screen place-items-center'>
      <div className='grid h-[550px] h-screen w-[600px] place-items-center rounded-[32px]  bg-white bg-opacity-10'>
        <div className='place-content-center'>
          <p className='text-center font-bold'>성별을 선택해주세요</p>
        </div>
        <div className='flex flex-col justify-center gap-3'>
          <div>
            <input
              type='radio'
              name='gender'
              id='male'
              value='male'
              onClick={(e) => setGender(e.currentTarget.value)}
              className='peer hidden '
            />
            <label
              htmlFor='male'
              className='inline-flex h-[100px] w-[336px] items-center justify-center gap-2 rounded-xl bg-white bg-opacity-20  
              shadow shadow-inner peer-checked:rounded-xl peer-checked:bg-indigo-500'
            >
              남자
            </label>
          </div>
          <div>
            <input
              type='radio'
              name='gender'
              id='female'
              value='female'
              onClick={(e) => setGender(e.currentTarget.value)}
              className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}   active: peer inline-flex hidden h-[100px] w-[336px] items-center justify-center gap-2 rounded-xl hover:bg-indigo-500 focus:bg-indigo-500 `}
            />
            <label
              htmlFor='female'
              className='inline-flex h-[100px] w-[336px] items-center justify-center gap-2 rounded-xl bg-white bg-opacity-20  
              shadow shadow-inner peer-checked:rounded-xl peer-checked:bg-indigo-500'
            >
              여자
            </label>
          </div>
        </div>
        <div className='flex justify-center gap-3'>
          <PreviousButton onClick={() => router.back()}>이전</PreviousButton>
          <ButtonPrimary onClick={() => handleNextClick('pageTwo')}>
            다음
          </ButtonPrimary>
        </div>
      </div>
      <div>
        <input type='radio' />
      </div>
    </div>
  )
}

export default GenderPage
