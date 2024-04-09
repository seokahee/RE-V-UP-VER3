'use client'
import React, { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useStore } from '@/shared/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserChar } from '@/shared/main/api'
import { insertUserChar } from '@/shared/personal/personalApi'

type UserChar = {
  mbti: string
  gender: string
  resultSentence: string
}

const PersonalMusic = () => {
  const { userChar, addUserChar } = useSurvey()
  const { userInfo } = useStore()
  const queryClient = useQueryClient()

  //state
  const [gender, setGender] = useState<string>('')
  const [EI, setEI] = useState<string>('')
  const [SN, setSN] = useState<string>('')
  const [TF, setTF] = useState<string>('')
  const [PJ, setPJ] = useState<string>('')

  //유저 정보 조회
  const { data: userData } = useQuery({
    queryFn: () => getUserChar(userInfo.uid),
    queryKey: ['userChar'],
  })
  console.log('로그인한 데이터', userData)

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

  const submitResult = () => {
    addUserChar({ gender, mbti })
    const personalUser: UserChar = {
      mbti: mbti,
      gender: gender,
      resultSentence: '당신은 힙합을 좋아하는 국힙원탑입니다.',
    }
    insertUserCharMutation.mutate({ userId: userInfo.uid, personalUser })

    setGender('')
    setEI('')
    setSN('')
    setTF('')
    setPJ('')
  }

  console.log('userChar', userChar)

  return (
    <div>
      PersonalMusic
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
      <button onClick={submitResult}>결과보러가기</button>
    </div>
  )
}

export default PersonalMusic
