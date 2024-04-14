import React from 'react'
import ResultChart from '@/components/personal/ResultChart'
import PersonalRecommend from './PersonalRecommend'
import { useSurvey } from '@/shared/store/personalStore'

const PersonalTestResult = () => {
  const { userChar } = useSurvey()

  return (
    <div className=' w-[600px] place-items-center rounded-[32px] bg-white bg-opacity-10 '>
      <br />
      <p className='text-center text-3xl'>당신의 음악 취향은....!</p> <br />
      <ResultChart userChar={userChar} /> <br />
      <PersonalRecommend userChar={userChar} />
    </div>
  )
}

export default PersonalTestResult
