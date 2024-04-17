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

  const handleNextClick = (param: string) => {
    if (!gender) {
      alert('성별을 선택해주세요.')
      return
    }

    addGender(gender)
    return setPageCount(param)
  }

  return (
    <div className=' w-[516px] pb-[90px] pt-[70px]'>
      <div className=' h-[800px] rounded-[32px] bg-white  bg-opacity-10 '>
        <div className=''>
          <p className='pt-[106px] text-center text-xl font-bold'>
            성별을 선택해주세요
          </p>
        </div>
        <div className='flex flex-col gap-3 pt-[40px]'>
          <div className='flex justify-center '>
            <label>
              <input
                type='radio'
                name='gender'
                id='male'
                value='male'
                onClick={() => setGender('male')}
                checked={gender === 'male'}
                className='peer hidden '
              />
              <p
                className='inline-flex h-[100px] w-[336px] items-center justify-center  rounded-xl border-4 border-black  border-opacity-10 bg-white bg-white bg-opacity-10 bg-opacity-20 shadow shadow-inner
             peer-checked:rounded-xl peer-checked:bg-primary'
              >
                남자
              </p>
            </label>
          </div>
          <div className='flex justify-center '>
            <label>
              <input
                type='radio'
                name='gender'
                id='female'
                value='female'
                onClick={() => setGender('female')}
                checked={gender === 'female'}
                className='peer hidden '
              />
              <p
                className='inline-flex h-[100px] w-[336px] items-center justify-center rounded-xl  border-4 border-black  border-opacity-10 bg-white bg-white bg-opacity-10 bg-opacity-20 shadow shadow-inner
            peer-checked:bg-primary '
              >
                여자
              </p>
            </label>
          </div>
        </div>
        <div className='flex justify-center gap-3 pt-[208px]'>
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
