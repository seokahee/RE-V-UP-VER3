'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useStore } from '@/shared/store'
import { supabase } from '@/shared/supabase/supabase'
import googleImg from '@/../public/images/google.svg'
import kakaoImg from '@/../public/images/kakao.svg'

const SocialLogin = () => {
  const { setUserType } = useStore()
  const onGoogleLoginHandler = async () => {
    signIn('google', { redirect: true, callbackUrl: '/' })
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    const userType = 1

    alert('V-UP에 오신 걸 환영합니다!')
    setUserType(userType)

    if (error) {
      throw new Error('오류로 인해 로그인이 되지 않았습니다. 문의해주세요.')
    }
  }
  const onKakadoLoginHandler = async () => {
    signIn('kakao', { redirect: true, callbackUrl: '/' })
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    const userType = 2

    setUserType(userType)
    alert('V-UP에 오신 걸 환영합니다!')

    if (error) {
      throw new Error('카카오 로그인 중에 에러가 났습니다.')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='flex gap-[40px]'>
        <button onClick={onGoogleLoginHandler}>
          <Image
            src={googleImg}
            width={40}
            height={40}
            alt='구글로그인'
          ></Image>
        </button>
        <button onClick={onKakadoLoginHandler}>
          <Image
            src={kakaoImg}
            width={40}
            height={40}
            alt='카카오로그인'
          ></Image>
        </button>
      </div>
    </div>
  )
}

export default SocialLogin
