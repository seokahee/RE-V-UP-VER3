'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { supabase } from '@/shared/supabase/supabase'
import Logout from '@/../public/images/logout.svg'
import { OPEN_ANOTHER_SHADOW } from '../login/loginCss'

const LogOutButton = () => {
  const { status } = useSession()

  const onLogOutHandler = async () => {
    if (status === 'authenticated') {
      Swal.fire({
        title: '로그아웃',
        text: '정말 로그아웃 하시겠습니까?',

        showCancelButton: true,
        confirmButtonColor: '#685BFF',
        cancelButtonColor: '#000000',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        color: '#ffffff',
        background: '#2B2B2B',

        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          supabase.auth.signOut()
          signOut({ redirect: true, callbackUrl: '/' })

          Swal.fire({
            icon: 'success',
            title: '로그아웃',
            text: '로그아웃 되셨습니다.',
            confirmButtonText: '확인',
            showConfirmButton: false,
            timer: 1500,
            color: '#ffffff',
            background: '#2B2B2B',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: '로그아웃을 취소하셨습니다.',
            confirmButtonText: '확인',
            confirmButtonColor: '#685BFF',
            color: '#ffffff',
            background: '#2B2B2B',
          })
          return
        }
      })
    }
  }

  return (
    <div>
      <button
        onClick={onLogOutHandler}
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
      >
        <Image src={Logout} alt='로그아웃' width={22} height={20} />
      </button>
    </div>
  )
}

export default LogOutButton
