'use client'
import React, { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertUserChar } from '@/shared/personal/personalApi'
import ButtonPrimary from '../mypage/ButtonPrimary'
import PreviousButton from '../mypage/PreviousButton'

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
  console.log(userGender, 'userGender')
  //state

  const [EI, setEI] = useState<string>('')
  const [SN, setSN] = useState<string>('')
  const [TF, setTF] = useState<string>('')
  const [PJ, setPJ] = useState<string>('')

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
    <div className='grid  place-items-center'>
      <div className='grid h-[600px] h-screen w-[600px] place-items-center rounded-[32px] bg-white bg-opacity-10'>
        <div className='flex justify-center'>
          <label>
            <input
              type='radio'
              name='EI'
              value='E'
              checked={EI === 'E'}
              onChange={onChangeHandler}
            />
            E
          </label>
          <label>
            <input
              type='radio'
              name='EI'
              value='I'
              checked={EI === 'I'}
              onChange={onChangeHandler}
            />
            I
          </label>
        </div>
        <div className='flex justify-center'>
          <label>
            <input
              type='radio'
              name='SN'
              value='S'
              checked={SN === 'S'}
              onChange={onChangeHandler}
            />
            S
          </label>
          <label>
            <input
              type='radio'
              name='SN'
              value='N'
              checked={SN === 'N'}
              onChange={onChangeHandler}
            />
            N
          </label>
        </div>
        <div className='flex justify-center'>
          <label>
            <input
              type='radio'
              name='TF'
              value='T'
              checked={TF === 'T'}
              onChange={onChangeHandler}
            />
            T
          </label>
          <label>
            <input
              type='radio'
              name='TF'
              value='F'
              checked={TF === 'F'}
              onChange={onChangeHandler}
            />
            F
          </label>
        </div>
        <div className='flex justify-center'>
          <label>
            <input
              type='radio'
              name='PJ'
              value='P'
              checked={PJ === 'P'}
              onChange={onChangeHandler}
            />
            P
          </label>
          <label>
            <input
              type='radio'
              name='PJ'
              value='J'
              checked={PJ === 'J'}
              onChange={onChangeHandler}
            />
            J
          </label>
        </div>
        <div className='flex justify-center gap-2'>
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
        </div>

        <div className='flex justify-center gap-4'>
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
