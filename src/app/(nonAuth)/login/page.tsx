'use client'

import { FormEvent, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { findUserPassword } from '@/shared/login/loginApi'
import Link from 'next/link'
import Image from 'next/image'
import Modal from '@/util/Modal'
import useInput from '@/hooks/useInput'
import findPwImg from '@/../public/images/findPassword.svg'
import SocialLogin from '@/components/socialLogin/page'
import LogOutButton from '@/components/logout/LogOutButton'

const LoginPage = () => {
  const router = useRouter()
  const { status } = useSession()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [spendEmail, setSpendEmail] = useState<string>('')
  const [submitEmail, setSubmitEmail] = useState<boolean>(false)
  const needLoginInfo = { email: '', password: '' }

  const { form: userlogin, onChange: onChangeHandler } = useInput(needLoginInfo)
  const { email, password } = userlogin

  const openModal = (e: FormEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
    setSubmitEmail(submitEmail)
  }
  const closeModal = () => setIsModalOpen(false)

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const signResult = await signIn('email-password-credential', {
        email: email,
        password: password,
        redirect: false,
      })

      if (signResult && signResult.ok === true) {
        alert(`V-UP에 오신 걸 환영합니다!`)
        router.push('/')
      }

      if (signResult && signResult.error) {
        alert(signResult.error)
      }
    } catch (error) {
      throw new Error('회원정보를 불러오지 못하고 있습니다.')
    }
  }

  const findPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!spendEmail) {
      alert('이메일을 입력해주세요!')
      return
    }

    if (spendEmail) {
      const data = await findUserPassword(spendEmail)
      setSpendEmail('')

      if (!data) {
        alert('이미 이메일을 보냈습니다!')
      } else {
        alert('비밀번호를 복구하는 이메일을 보냈습니다!')
        setSubmitEmail(true)
      }
      setSubmitEmail(false)
    }
  }

  if (status === 'loading') {
    return <div>로딩주우우웅</div>
  }

  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center text-white'>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className='text-black z-1500'>
          <div>비밀번호 찾기</div>
          <input
            type='email'
            value={spendEmail}
            onChange={(e) => setSpendEmail(e.target.value)}
          />
          <button onClick={findPassword} className='cursor-pointer'>
            {submitEmail ? '전송완료!' : '전송'}
          </button>
        </div>
      </Modal>
      <section className='absolute w-516 left-1/2 transform -translate-x-1/2 translate-y-auto bg-white bg-opacity-10 shadow-lg border border-gray-100 border-opacity-10 rounded-2xl'>
        <div>
          <p>V-UP에 오신 걸 환영합니다</p>
        </div>
        <div>
          <form onSubmit={onLoginHandler} className='flex flex-col gap-[32px]'>
            <div className='flex flex-col gap-[16px]'>
              <div>
                <label htmlFor='email' className='flex flex-col '>
                  <p className='text-black'>이메일</p>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={onChangeHandler}
                    placeholder='이메일을 입력하세요'
                    className='flex items-center gap-2 w-320 bg-white bg-opacity-10 border-2 border-white border-opacity-10 shadow-md rounded-lg'
                  />
                </label>
              </div>
              <div>
                <label htmlFor='password' className='flex flex-col '>
                  <p className='text-white-30'>비밀번호</p>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChangeHandler}
                    placeholder='비밀번호를 입력하세요'
                    className='flex items-center gap-2 w-320 bg-white bg-opacity-10 border-2 border-white border-opacity-10 shadow-md rounded-lg'
                  />
                </label>
              </div>
            </div>
            <div>
              <button type='submit'>로그인</button>
            </div>
          </form>
        </div>

        <div>
          <div className='flex justify-center items-center mx-auto w-101 gap-[2px]'>
            <button onClick={openModal} className='text-[14px] text-white-50'>
              비밀번호 찾기
            </button>
            <Image
              src={findPwImg}
              width={20}
              height={20}
              alt='오른쪽방향화살표'
            ></Image>
          </div>
        </div>
        <div>
          <p>SNS로&nbsp;간편하게&nbsp;시작하기</p>
          <SocialLogin />
        </div>
        <div>
          <p>아직&nbsp;회원이&nbsp;아니신가요?</p>
          <Link href={'/join'}>
            <p>회원가입&nbsp;하기</p>
          </Link>
        </div>
        <LogOutButton />
      </section>
    </div>
  )
}

export default LoginPage
