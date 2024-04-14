'use client'
import { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useRouter } from 'next/navigation'

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
          <label>
            <input
              type='radio'
              name='gender'
              value='male'
              checked={gender === 'male'}
              onChange={onChangeHandler}
            />
            <p className='inline-flex h-[100px] w-[336px] items-center justify-center gap-2 rounded-xl bg-white bg-opacity-20 shadow shadow-inner hover:bg-indigo-500 active:bg-indigo-500'>
              남자
            </p>
          </label>
          <label>
            <input
              type='radio'
              name='gender'
              value='female'
              checked={gender === 'female'}
              onChange={onChangeHandler}
            />
            <p className='inline-flex h-[100px] w-[336px] items-center justify-center gap-2 rounded-xl bg-white bg-opacity-20 shadow shadow-inner hover:bg-indigo-500'>
              여자
            </p>
          </label>
        </div>
        <div className='flex justify-center gap-3'>
          <button
            onClick={() => router.back()}
            className='h-12 w-40 rounded-xl border border  border-dim-black '
          >
            이전
          </button>
          <button
            onClick={() => handleNextClick('pageTwo')}
            className='h-12 w-40 rounded-xl border border-dim-black bg-primary'
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}

export default GenderPage
