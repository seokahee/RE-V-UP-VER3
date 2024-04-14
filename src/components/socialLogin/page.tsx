'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useStore } from '@/shared/store'
import googleImg from '@/../public/images/google.svg'
import kakaoImg from '@/../public/images/kakao.svg'

const SocialLogin = () => {
  const { setUserType } = useStore()
  const onGoogleLoginHandler = async () => {
    signIn('google', { redirect: true, callbackUrl: '/' })

    const userType = 1

    alert('V-UP에 오신 걸 환영합니다!')
    setUserType(userType)
  }

  const onKakadoLoginHandler = async () => {
    signIn('kakao', { redirect: true, callbackUrl: '/' })

    const userType = 2

    setUserType(userType)
    alert('V-UP에 오신 걸 환영합니다!')
  }

  return (
    <div className='flex justify-center gap-[40px]'>
      <button onClick={onGoogleLoginHandler}>
        <Image src={googleImg} width={40} height={40} alt='구글로그인'></Image>
      </button>
      <button onClick={onKakadoLoginHandler}>
        <Image src={kakaoImg} width={40} height={40} alt='카카오로그인'></Image>
      </button>
    </div>
  )
}

export default SocialLogin
