'use client'

import React from 'react'
import Image from 'next/image'
import googleImg from '@/../public/images/google.svg'
import kakaoImg from '@/../public/images/kakao.svg'
import { signIn, useSession } from 'next-auth/react'
import { supabase } from '@/shared/supabase/supabase'

const SocialLogin = () => {
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
