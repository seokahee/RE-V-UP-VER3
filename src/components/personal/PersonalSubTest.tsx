import React, { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertUserChar } from '@/shared/personal/personalApi'
import ButtonPrimary from '@/util/ButtonPrimary'
import PreviousButton from '../mypage/PreviousButton'
import left from '@/../public/images/double_arrow_left.svg'
import right from '@/../public/images/double_arrow.svg'
import Image from 'next/image'
import { DROP_SHADOW, INPUT_SHADOW, INPUT_FOCUS } from '../login/loginCss'

import type { PersonalInfo } from '@/types/personal/type'

const PersonalSubTest = ({
  setPageCount,
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { addUserChar, userGender, userChar } = useSurvey()
  const { data: userSessionInfo } = useSession()
  const userId = userSessionInfo?.user?.uid as string
  const queryClient = useQueryClient()

  const [first, second, third, fourth] = userChar.mbti.split('')
  const [EI, setEI] = useState<string>(first)
  const [SN, setSN] = useState<string>(second)
  const [TF, setTF] = useState<string>(third)
  const [PJ, setPJ] = useState<string>(fourth)

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
    <div className='w-[516px] justify-center pb-[90px] pt-[70px]'>
      <div className='h-[800px] rounded-[32px] bg-white bg-opacity-10'>
        <p className='pt-[106px] text-center text-xl font-bold text-white'>
          MBTI를 입력해주세요!
        </p>
        <div className='pt-[37px]'>
          <div className='mb-4 flex flex-row justify-center'>
            <span className='mr-2 text-2xl font-bold'>E</span>
            <label
              htmlFor='checkEI'
              className='relative mb-4 h-6 w-20 rounded-[148.50px] border-2 bg-indigo-500 p-[3px] shadow shadow-inner'
            >
              <input
                type='checkbox'
                id='checkEI'
                className='peer sr-only'
                onChange={(e) => setEI(e.target.checked ? 'E' : 'I')}
              />
              <span
                className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-blue-700 transition-all duration-500 ${
                  EI === 'E' ? 'right-auto bg-white' : 'right-1 bg-white'
                } flex items-center justify-center`}
              >
                {EI === 'E' ? (
                  <Image
                    src={left}
                    alt='왼쪽'
                    width={12}
                    height={12}
                    onClick={() => setEI('I')}
                  />
                ) : null}
                {EI === 'I' ? (
                  <Image
                    src={right}
                    alt='오른쪽'
                    width={12}
                    height={12}
                    onClick={() => setEI('E')}
                  />
                ) : null}
              </span>
            </label>
            <span className='ml-2 text-2xl font-bold'>I</span>
          </div>
        </div>
        {/* */}
        <div className='flex justify-center  pt-[28px]'>
          <div className='mb-4 flex flex-row justify-center'>
            <span className='mr-2 text-2xl font-bold'>N</span>
            <label
              htmlFor='checkSN'
              className='relative mb-4 h-6 w-20 rounded-[148.50px] border-2 bg-indigo-500 p-[3px] shadow shadow-inner'
            >
              <input
                type='checkbox'
                id='checkSN'
                className='peer sr-only'
                onChange={(e) => setSN(e.target.checked ? 'S' : 'N')}
              />
              <span
                className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-blue-700 transition-all duration-500 ${
                  SN === 'N' ? 'right-auto bg-white' : 'right-1 bg-white'
                } flex items-center justify-center`}
              >
                {SN === 'N' ? (
                  <Image
                    src={left}
                    alt='왼쪽'
                    width={12}
                    height={12}
                    onClick={() => setSN('S')}
                  />
                ) : null}
                {SN === 'S' ? (
                  <Image
                    src={right}
                    alt='오른쪽'
                    width={12}
                    height={12}
                    onClick={() => setSN('N')}
                  />
                ) : null}
              </span>
            </label>
            <span className='ml-2 text-2xl font-bold'>S</span>
          </div>
        </div>
        {/* */}
        <div className='flex justify-center  pt-[28px]'>
          <div className='mb-4 flex flex-row justify-center'>
            <span className='mr-2 text-2xl font-bold'>T</span>
            <label
              htmlFor='checkTF'
              className='relative mb-4 h-6 w-20 rounded-[148.50px] border-2 bg-indigo-500 p-[3px] shadow shadow-inner'
            >
              <input
                type='checkbox'
                id='checkTF'
                className='peer sr-only'
                onChange={(e) => setTF(e.target.checked ? 'F' : 'T')}
              />
              <span
                className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-blue-700 transition-all duration-500 ${
                  TF === 'T' ? 'right-auto bg-white' : 'right-1 bg-white'
                } flex items-center justify-center`}
              >
                {TF === 'T' ? (
                  <Image
                    src={left}
                    alt='왼쪽'
                    width={12}
                    height={12}
                    onClick={() => setTF('F')}
                  />
                ) : null}
                {TF === 'F' ? (
                  <Image
                    src={right}
                    alt='오른쪽'
                    width={12}
                    height={12}
                    onClick={() => setTF('T')}
                  />
                ) : null}
              </span>
            </label>
            <span className='ml-2 text-2xl font-bold'>F</span>
          </div>
        </div>
        {/* */}
        <div className='flex justify-center  pt-[28px]'>
          <div className='mb-4 flex flex-row justify-center'>
            <span className='mr-2 text-2xl font-bold'>P</span>
            <label
              htmlFor='checkPJ'
              className='relative mb-4 h-6 w-20 rounded-[148.50px] border-2 bg-indigo-500 p-[3px] shadow shadow-inner'
            >
              <input
                type='checkbox'
                id='checkPJ'
                className='peer sr-only'
                onChange={(e) => setPJ(e.target.checked ? 'J' : 'P')}
              />
              <span
                className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-blue-700 transition-all duration-500 ${
                  PJ === 'P' ? 'right-auto bg-white' : 'right-1 bg-white'
                } flex items-center justify-center`}
              >
                {PJ === 'P' ? (
                  <Image
                    src={left}
                    alt='왼쪽'
                    width={12}
                    height={12}
                    onClick={() => setPJ('J')}
                  />
                ) : null}
                {PJ === 'J' ? (
                  <Image
                    src={right}
                    alt='오른쪽'
                    width={12}
                    height={12}
                    onClick={() => setPJ('P')}
                  />
                ) : null}
              </span>
            </label>
            <span className='ml-2 text-2xl font-bold'>J</span>
          </div>
        </div>
        <div className='flex justify-center gap-2 pt-[58px]'>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 pt-[8px] text-center text-7xl  font-bold `}
          >
            {EI}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 pt-[8px] text-center text-7xl  font-bold `}
          >
            {SN}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 pt-[8px] text-center text-7xl  font-bold `}
          >
            {TF}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} h-[88px] w-[72px] rounded-xl bg-white  bg-opacity-10 pt-[8px] text-center text-7xl  font-bold `}
          >
            {PJ}
          </p>
        </div>
        <div className='flex justify-center gap-4  pt-[70px]'>
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

export default PersonalSubTest
