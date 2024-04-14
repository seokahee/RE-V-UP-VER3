import React from 'react'
import ResultChart from '@/components/personal/ResultChart'
import PersonalRecommend from './PersonalRecommend'
import { useSurvey } from '@/shared/store/personalStore'

const PersonalTestResult = () => {
  const { userChar } = useSurvey()

  return (
    <div>
      <p className='text-center text-3xl'>당신의 음악 취향은....!</p>
      <ResultChart userChar={userChar} />
      <PersonalRecommend userChar={userChar} />
    </div>
  )
}

export default PersonalTestResult
