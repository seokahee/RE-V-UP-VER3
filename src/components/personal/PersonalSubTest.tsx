'use client'
import React, { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertUserChar } from '@/shared/personal/personalApi'
import ButtonPrimary from '../mypage/ButtonPrimary'
import PreviousButton from '../mypage/PreviousButton'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { DROP_SHADOW, INPUT_SHADOW, INPUT_FOCUS } from '../login/loginCss'

import type { PersonalInfo } from '@/types/personal/type'

const PersonalSubTest = ({
  setPageCount,
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { addUserChar, userGender } = useSurvey()
  const { data: userSessionInfo } = useSession()
  const userId = userSessionInfo?.user?.uid as string
  const queryClient = useQueryClient()
  const router = useRouter()

  const [EI, setEI] = useState<string>('')
  const [SN, setSN] = useState<string>('')
  const [TF, setTF] = useState<string>('')
  const [PJ, setPJ] = useState<string>('')
  useEffect(() => {
    // 페이지가 처음 렌더링 될 때만 EI를 'E'로 설정
    setEI('E')
    setSN('S')
    setTF('T')
    setPJ('P')
  }, [])
  //입력한 userChar
  const insertUserCharMutation = useMutation({
    mutationFn: insertUserChar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userChar'] })
    },
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'EI') {
      setEI(value)
    } else if (name === 'SN') {
      setSN(value)
    } else if (name === 'TF') {
      setTF(value)
    } else if (name === 'PJ') {
      setPJ(value)
    }
  }

  const calculateMBTI = () => {
    return EI + SN + TF + PJ
  }

  const mbti = calculateMBTI()

  const onsubmitResultHandler = () => {
    if (!EI || !SN || !TF || !PJ) {
      alert('모든 항목을 선택해주세요.')
      return
    }

    addUserChar({ gender: userGender, mbti, uid: userId })
    const personalUser: PersonalInfo = {
      mbti: mbti,
      gender: userGender,
    }

    insertUserCharMutation.mutate({ userId: userId, personalUser })

    setEI('')
    setSN('')
    setTF('')
    setPJ('')

    handleNextClick('pageThree')
  }
  const handleNextClick = (param: string) => {
    return setPageCount(param)
  }

  return (
    <div className=' w-[516px] pb-[90px] pt-[70px]'>
      <div className='h-[800px] rounded-[32px] bg-white  bg-opacity-10 '>
        <p className='pt-[106px] text-center text-xl font-bold text-white'>
          MBTI를 입력해주세요
        </p>
        <div className='flex justify-center  pt-[48px]'>
          <div className='flex items-center '>
            <label
              htmlFor='checkEI'
              className='border-gray-400 relative h-10 w-20 rounded-full border-2 bg-white'
            >
              <input
                type='checkbox'
                id='checkEI'
                className='peer sr-only '
                onChange={(e) => setEI(e.target.checked ? 'E' : 'I')}
              />
              <span
                className={`absolute left-1 top-1 h-4/5 w-2/5 rounded-full bg-blue-700 transition-all duration-500 ${
                  EI === 'E' ? 'left-11 bg-rose-600' : 'bg-gray-700 left-auto'
                }`}
              ></span>
            </label>
            <span className='ml-2 text-lg font-bold'>{EI}</span>
          </div>
        </div>
        {/* */}
        <div className='flex justify-center pt-[28px]'>
          <div className='flex items-center'>
            <label
              htmlFor='checkSN'
              className='border-gray-400 relative h-10 w-20 rounded-full border-2 bg-white'
            >
              <input
                type='checkbox'
                id='checkSN'
                className='peer sr-only'
                onChange={(e) => setSN(e.target.checked ? 'S' : 'N')}
              />
              <span
                className={`absolute left-1 top-1 h-4/5 w-2/5 rounded-full bg-blue-700 transition-all duration-500 ${
                  SN === 'S' ? 'left-11 bg-rose-600' : 'bg-gray-700 left-auto'
                }`}
              ></span>
            </label>
            <span className='ml-2 text-lg font-bold'>{SN}</span>
          </div>
        </div>
        {/* */}
        <div className='flex justify-center pt-[28px]'>
          <div className='flex items-center'>
            <label
              htmlFor='checkTF'
              className='border-gray-400 relative h-10 w-20 rounded-full border-2 bg-white'
            >
              <input
                type='checkbox'
                id='checkTF'
                className='peer sr-only'
                onChange={(e) => setTF(e.target.checked ? 'T' : 'F')}
              />
              <span
                className={`absolute left-1 top-1 h-4/5 w-2/5 rounded-full bg-blue-700 transition-all duration-500 ${
                  TF === 'T' ? 'left-11 bg-rose-600' : 'bg-gray-700 left-auto'
                }`}
              ></span>
            </label>
            <span className='ml-2 text-lg font-bold'>{TF}</span>
          </div>
        </div>
        {/* */}
        <div className='flex justify-center pt-[28px]'>
          <div className='flex items-center'>
            <label
              htmlFor='checkPJ'
              className='border-gray-400 relative h-10 w-20 rounded-full border-2 bg-white'
            >
              <input
                type='checkbox'
                id='checkPJ'
                className='peer sr-only'
                onChange={(e) => setPJ(e.target.checked ? 'P' : 'J')}
              />
              <span
                className={`absolute left-1 top-1 h-4/5 w-2/5 rounded-full bg-blue-700 transition-all duration-500 ${
                  PJ === 'P' ? 'left-11 bg-rose-600' : 'bg-gray-700 left-auto'
                }`}
              ></span>
            </label>
            <span className='ml-2 text-lg font-bold'>{PJ}</span>
          </div>
        </div>
        {/** */}
        <div className='flex justify-center gap-2 pt-[58px]'>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}  h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 text-center text-7xl  font-bold `}
          >
            {EI}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}  h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 text-center text-7xl  font-bold `}
          >
            {SN}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}  h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 text-center text-7xl  font-bold `}
          >
            {TF}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS}  h-[88px] w-[72px] rounded-xl  bg-white bg-opacity-10 text-center text-7xl  font-bold `}
          >
            {PJ}
          </p>
        </div>{' '}
        <div className='flex justify-center gap-4 pt-[70px]'>
          <PreviousButton onClick={() => handleNextClick('pageOne')}>
            이전
          </PreviousButton>
          <ButtonPrimary onClick={onsubmitResultHandler}>
            결과보러가기
          </ButtonPrimary>
        </div>{' '}
      </div>
    </div>
  )
}

export default PersonalSubTest
