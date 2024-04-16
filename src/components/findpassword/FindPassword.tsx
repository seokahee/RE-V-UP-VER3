'use client'

import React, { FormEvent, useState } from 'react'
import { updateUserPassword } from '@/shared/login/loginApi'
import { useRouter } from 'next/navigation'

const FindPassword = () => {
  const [newPassword, setNewPassword] = useState<string>('')
  const [updateState, setUpdateState] = useState<boolean>(false)
  const blankPattern = /[\s]/g
  const router = useRouter()

  const findPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!newPassword) {
      alert('비밀번호를 입력해주세요!')
      return
    }
    if (blankPattern.test(newPassword) == true) {
      alert('비밀번호에 공백은 사용할 수 없습니다.')
      return
    }

    try {
      if (newPassword) {
        const data = await updateUserPassword(newPassword)
        setNewPassword('')

        if (data) {
          alert('비밀번호를 변경했습니다!')
          router.push('/login')
        }
      }
    } catch (error) {
      alert('오류로 인해 비밀번호 변경이 되지 않았습니다. 문의해주세요')
      return
    }
  }
  return (
    <div>
      <div>
        <form onSubmit={findPassword}>
          <div className='z-1500 text-black'>
            <div>비밀번호 찾기</div>
            <input
              type='password'
              autoFocus
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className='cursor-pointer'>
              {updateState ? '변경완료!' : '변경'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FindPassword
