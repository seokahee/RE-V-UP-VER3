import React from 'react'
import ResultChart from '@/components/personal/ResultChart'
import PersonalRecommend from './PersonalRecommend'
import { useSurvey } from '@/shared/store/personalStore'

const PersonalTestResult = () => {
  const { userChar } = useSurvey()

  return (
    <div>
      <ResultChart userChar={userChar} />
      <PersonalRecommend userChar={userChar} />
    </div>
  )
}

export default PersonalTestResult
