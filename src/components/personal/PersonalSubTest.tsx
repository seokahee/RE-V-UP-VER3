'use client'
import React, { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertUserChar } from '@/shared/personal/personalApi'
import PersonalTestResult from './PersonalTestResult'
import { useRouter } from 'next/navigation'

import type { PersonalInfo } from '@/types/personal/type'

const PersonalSubTest = () => {
  const { addUserChar } = useSurvey()
  const { data: userSessionInfo } = useSession()
  const userId = userSessionInfo?.user?.uid as string
  const queryClient = useQueryClient()
  const router = useRouter()

  //state
  const [gender, setGender] = useState<string>('')
  const [EI, setEI] = useState<string>('')
  const [SN, setSN] = useState<string>('')
  const [TF, setTF] = useState<string>('')
  const [PJ, setPJ] = useState<string>('')
  const [isResult, setIsResult] = useState<boolean>(false)

  //입력한 userChar
  const insertUserCharMutation = useMutation({
    mutationFn: insertUserChar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userChar'] })
    },
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'gender') {
      setGender(value)
    } else if (name === 'EI') {
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
    if (!gender || !EI || !SN || !TF || !PJ) {
      alert('모든 항목을 선택해주세요.')
      return
    }

    addUserChar({ gender, mbti, uid: userId })
    const personalUser: PersonalInfo = {
      mbti: mbti,
      gender: gender,
    }

    insertUserCharMutation.mutate({ userId: userId, personalUser })

    setGender('')
    setEI('')
    setSN('')
    setTF('')
    setPJ('')
    setIsResult(true)
  }
  const onBackHandler = () => {
    router.back()
  }
  return (
    <div>
      {!isResult ? (
        <>
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <p>{EI}</p>
          <p>{SN}</p>
          <p>{TF}</p>
          <p>{PJ}</p>
          <button onClick={onBackHandler}>이전</button>
          <br />
          <button onClick={onsubmitResultHandler}>결과보러가기</button>
        </>
      ) : (
        <PersonalTestResult />
      )}
    </div>
  )
}

export default PersonalSubTest
