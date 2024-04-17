'use client'

import { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertUserChar } from '@/shared/personal/personalApi'
import ButtonPrimary from '../../util/ButtonPrimary'
import PreviousButton from '../mypage/PreviousButton'
import { DROP_SHADOW, INPUT_SHADOW, INPUT_FOCUS } from '../login/loginCss'

import type { PersonalInfo } from '@/types/personal/type'

const MBTIPage = ({
  setPageCount,
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { addUserChar, userGender } = useSurvey()
  const { data: userSessionInfo } = useSession()
  const userId = userSessionInfo?.user?.uid as string
  const queryClient = useQueryClient()
  const [EI, setEI] = useState<number>(50) // 초기값 설정
  const [SN, setSN] = useState<number>(50) // 초기값 설정
  const [TF, setTF] = useState<number>(50) // 초기값 설정
  const [JP, setJP] = useState<number>(50) // 초기값 설정

  //입력한 userChar
  const insertUserCharMutation = useMutation({
    mutationFn: insertUserChar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userChar'] })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'EI') {
      setEI(parseInt(value))
    } else if (name === 'SN') {
      setSN(parseInt(value))
    } else if (name === 'TF') {
      setTF(parseInt(value))
    } else if (name === 'JP') {
      setJP(parseInt(value))
    }
  }

  const labelEI = EI > 50 ? 'I' : EI < 49 ? 'E' : ''
  const labelSN = SN > 50 ? 'S' : SN < 49 ? 'N' : ''
  const labelTF = TF > 50 ? 'T' : TF < 49 ? 'F' : ''
  const labelJP = JP > 50 ? 'J' : JP < 49 ? 'P' : ''

  const calculateMBTI = () => {
    return labelEI + labelSN + labelTF + labelJP
  }

  const mbti = calculateMBTI()
  const onsubmitResultHandler = () => {
    if (labelEI === '' || labelSN === '' || labelTF === '' || labelJP === '') {
      alert('MBTI를 마저 입력해주세요.')
      return
    }

    addUserChar({ gender: userGender, mbti, uid: userId })
    const personalUser: PersonalInfo = {
      mbti: mbti,
      gender: userGender,
    }

    insertUserCharMutation.mutate({ userId: userId, personalUser })

    handleNextClick('pageThree')
  }
  const handleNextClick = (param: string) => {
    return setPageCount(param)
  }

  return (
    <div className='w-[516px] justify-center pb-[90px] pt-[70px]'>
      <div className='h-[800px] rounded-[32px] bg-white bg-opacity-10'>
        <p className='pt-[106px] text-center text-xl font-bold text-white'>
          MBTI를 입력해주세요!
        </p>
        <div className='pt-[37px]'>
          <div className='flex flex-row justify-center gap-4 pt-[28px]'>
            <div>
              <p className='text-2xl font-bold'>E</p>
              <p>{100 - EI}</p>
            </div>
            <input
              type='range'
              name='EI'
              min={0}
              max={100}
              value={EI}
              onChange={handleChange}
            />
            <div>
              <p className='text-2xl font-bold'>I</p>
              <p>{EI}</p>
            </div>
          </div>
          <div className='flex flex-row justify-center gap-4 pt-[28px]'>
            <div>
              <p className='text-2xl font-bold'>N</p>
              <p>{100 - SN}</p>
            </div>
            <input
              type='range'
              name='SN'
              min={0}
              max={100}
              value={SN}
              onChange={handleChange}
            />
            <div>
              <p className='text-2xl font-bold'>S</p>
              <p>{SN}</p>
            </div>
          </div>
          <div className='flex flex-row justify-center gap-4 pt-[28px]'>
            <div>
              <p className='text-2xl font-bold'>F</p>
              <p>{100 - TF}</p>
            </div>
            <input
              type='range'
              name='TF'
              min={0}
              max={100}
              value={TF}
              onChange={handleChange}
            />
            <div>
              <p className='text-2xl font-bold'>T</p>
              <p>{TF}</p>
            </div>
          </div>
          <div className='flex flex-row justify-center gap-4 pt-[28px]'>
            <div>
              <p className='text-2xl font-bold'>P</p>
              <p>{100 - JP}</p>
            </div>
            <input
              name='JP'
              type='range'
              min={0}
              max={100}
              value={JP}
              onChange={handleChange}
            />
            <div>
              <p className='text-2xl font-bold'>J</p>
              <p>{JP}</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center gap-2 pt-[58px]'>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}  h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 text-center text-7xl  font-bold `}
          >
            {labelEI}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}  h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 text-center text-7xl  font-bold `}
          >
            {labelSN}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}  h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 text-center text-7xl  font-bold `}
          >
            {labelTF}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}  h-[88px] w-[72px] rounded-xl  bg-white bg-opacity-10 text-center text-7xl  font-bold `}
          >
            {labelJP}
          </p>
        </div>
        <div className='flex justify-center gap-4 pt-[55px]'>
          <PreviousButton onClick={() => handleNextClick('pageOne')}>
            이전
          </PreviousButton>
          <ButtonPrimary onClick={onsubmitResultHandler}>
            결과보러가기
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}
export default MBTIPage
