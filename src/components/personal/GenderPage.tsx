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

  const onBackHandler = () => {
    router.back()
  }
  return (
    <div>
      <div className='flex justify-center'>
        <label>
          <input
            type='radio'
            name='gender'
            value='male'
            checked={gender === 'male'}
            onChange={onChangeHandler}
          />
          남자
        </label>
        <label>
          <input
            type='radio'
            name='gender'
            value='female'
            checked={gender === 'female'}
            onChange={onChangeHandler}
          />
          여자
        </label>
      </div>
      <button onClick={() => router.back()}>이전</button>
      <button onClick={() => handleNextClick('pageTwo')}>다음</button>
    </div>
  )
}

export default GenderPage
