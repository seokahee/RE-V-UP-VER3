'use client'

import { FormEvent } from 'react'
import Link from 'next/link'
import { saveSignUpInUserInfo, signUp } from '@/shared/join/joinApi'
import useInput from '@/hooks/useInput'
import { useRouter } from 'next/navigation'
import { validateFormBlank } from '@/query/communityDetail/mutation'
import AllowUserInfo from './AllowUserInfo'
import check from '@/../public/images/check-box.svg'
import allowCheck from '@/../public/images/allow-check-box.svg'
import Image from 'next/image'
import {
  DOWN_ACTIVE_BUTTON,
  DROP_SHADOW,
  INPUT_FOCUS,
  INPUT_SHADOW,
  OPEN_ANOTHER_SHADOW,
  SHADOW,
} from '../login/loginCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'

const Join = () => {
  const router = useRouter()
  const joinState = {
    userEmail: '',
    userPw: '',
    userPwCheck: '',
    userNickname: '',
    checkAgree: false,
  }
  const {
    form: join,
    setForm: setJoin,
    onChange: onChangeHandler,
    reset,
  } = useInput(joinState)

  const { userEmail, userPw, userPwCheck, userNickname, checkAgree } = join

  const blankPattern = /[\s]/g
  const validateCheckAgree = checkAgree
  const validatePwLength = userPw.length < 6
  const validatePassword = !(userPw === userPwCheck)
  const validateEmptyValue = !(userEmail || userPwCheck || userNickname)

  const onClickCheckboxHandler = () => {
    setJoin((prevForm) => ({ ...prevForm, checkAgree: !prevForm.checkAgree }))
  }

  const onJoinHandler = async (e: FormEvent) => {
    e.preventDefault()
    const { firstBlank: userEmailBlank, secondBlank: userPwBlank } =
      validateFormBlank(userEmail, userPw)

    if (
      blankPattern.test(userPw) == true ||
      blankPattern.test(userPwCheck) == true
    ) {
      alert('비밀번호에 공백은 사용할 수 없습니다.')
      return
    }

    if (validateEmptyValue || userEmailBlank === '') {
      alert('빈칸 없이 작성해 주세요.')
      return
    }

    if (validatePassword || userPwBlank === '') {
      alert('비밀번호를 다시 입력해주세요.')
      return
    }

    if (validatePwLength) {
      alert('비밀번호는 최소 6글자 이상 작성해 주세요')
      return
    }

    if (validateCheckAgree === false) {
      alert('약관 동의는 필수입니다')
      return
    }

    let signUpResult = await signUp({
      email: userEmail,
      password: userPw,
    })

    const userId = signUpResult?.data?.user?.id

    if (signUpResult) {
      if (signUpResult.data?.user?.identities?.length === 0) {
        alert('이미 존재하는 이메일입니다.')
        return
      }

      if (
        (signUpResult.error && signUpResult.error.message.includes('0 rows')) ||
        (signUpResult.error && signUpResult.error.message.includes('already'))
      ) {
        const errorMessage = '이미 존재하는 이메일 입니다.'
        alert(errorMessage)
        return
      }
    }

    saveSignUpInUserInfo({
      userId,
      email: userEmail,
      password: userPw,
      nickname: userNickname,
      userType: 0,
    })
    router.push('/login')
    reset()
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div
        className={`flex w-[516px] flex-col items-center justify-center gap-[94px] rounded-[32px] border-[4px] border-solid border-[#474747] bg-[#3D3D3D] pb-[16px] ${OPEN_ANOTHER_SHADOW} `}
      >
        <form className='flex w-[320px] flex-col gap-[32px]'>
          <div className='z-1500 flex flex-col gap-[32px] text-white'>
            <div className='flex flex-col gap-[40px]'>
              <h3 className='flex justify-center pt-[106px] text-[20px] font-bold'>
                <p>회원가입</p>
              </h3>
              <div className='flex flex-col gap-[16px] [&_label]:gap-[4px] [&_label]:text-[rgba(255,255,255,0.3)]'>
                <label htmlFor='password' className='flex flex-col '>
                  <p>이메일</p>
                  <input
                    type='email'
                    name='userEmail'
                    placeholder='이메일'
                    value={userEmail}
                    onChange={onChangeHandler}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] text-[16px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                </label>

                <label htmlFor='password' className='flex flex-col'>
                  <p>비밀번호</p>
                  <input
                    type='password'
                    name='userPw'
                    value={userPw}
                    maxLength={12}
                    placeholder='비밀번호'
                    onChange={onChangeHandler}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                </label>

                <label className='flex flex-col '>
                  <p>비밀번호 확인</p>
                  <input
                    type='password'
                    name='userPwCheck'
                    placeholder='비밀번호 확인'
                    value={userPwCheck}
                    onChange={onChangeHandler}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                </label>
                <label className='flex flex-col '>
                  <p>닉네임</p>
                  <input
                    type='text'
                    name='userNickname'
                    placeholder='닉네임을 적어주세요'
                    value={userNickname}
                    onChange={onChangeHandler}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] text-[16px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                </label>
                <div>
                  <label
                    htmlFor='checkAgree'
                    className='flex gap-[12px]'
                    onClick={onClickCheckboxHandler}
                  >
                    <Image
                      src={checkAgree ? allowCheck : check}
                      alt='체크박스 이미지'
                      width={20}
                      height={20}
                      id='checkAgree'
                    />
                    <p className='flex items-center'>
                      <span
                        className={`${checkAgree ? 'text-primary' : 'text-[rgba(255,255,255,0.4)]'}`}
                      >
                        가입 동의 약관&#40;필수&#41;
                      </span>
                    </p>
                    <div>
                      <input
                        type='checkbox'
                        name='checkAgree'
                        checked={checkAgree}
                        onChange={() => {}}
                        className='hidden'
                      />
                    </div>
                  </label>
                </div>
                <div>
                  <AllowUserInfo />
                </div>
              </div>
            </div>
            <div className='tracking-[-0.03em]'>
              <button
                onClick={onJoinHandler}
                className={` flex h-[48px] w-[320px] items-center justify-center  rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
              >
                다음
              </button>
            </div>
          </div>
          <div>
            <div className='flex justify-center gap-[8px] text-[rgba(255,255,255,0.5)]'>
              <p>이미 계정이 있으신가요?</p>
              <Link
                href={'/login'}
                className='leading-[1.4rem] text-primary underline '
              >
                로그인하기
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Join
