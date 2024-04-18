import React from 'react'
import ResultChart from '@/components/personal/ResultChart'
import PersonalRecommend from './PersonalRecommend'
import { useSurvey } from '@/shared/store/personalStore'
import { OPEN_ANOTHER_SHADOW } from '../login/loginCss'

const PersonalTestResult = () => {
  const { userChar } = useSurvey()

  return (
    <div className=' w-[516px] pb-[90px] pt-[70px]'>
      <div
        className={`h-[800px] rounded-[32px] bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
      >
        <p className='pt-[50px] text-center text-xl font-bold'>
          당신의 음악 취향은....!
        </p>
        <ResultChart userChar={userChar} />
        <PersonalRecommend userChar={userChar} />
      </div>
    </div>
  )
}

export default PersonalTestResult
