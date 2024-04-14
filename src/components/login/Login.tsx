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
import { shadow } from './loginCss'

const Login = () => {
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
    return (
      <div className='h-[full]  w-[full] bg-black text-white '>
        로딩주우우웅
      </div>
    )
  }

  return (
    <div
      className={`border-gray-300 absolute left-1/2  flex w-[516px] flex-col items-center justify-center rounded-2xl border-none border-opacity-10 bg-white bg-opacity-10 pt-[106px] ${shadow}`}
    >
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className='z-1500 text-black'>
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
      <section>
        <div className='text-[24px] font-bold'>
          <p>V-UP에 오신 걸 환영합니다</p>
        </div>
        <div>
          <form
            onSubmit={onLoginHandler}
            className='flex w-[320px] flex-col gap-[32px]'
          >
            <div className='flex flex-col gap-[16px]'>
              <div>
                <label htmlFor='email' className='flex flex-col '>
                  <p>이메일</p>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={onChangeHandler}
                    placeholder='이메일을 입력하세요'
                    className='placeholder:text-shadow flex items-center gap-2 rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px]  py-[13px] text-[16px] font-bold caret-primary shadow-md placeholder:text-red-500 placeholder:box-shadow'
                  />
                </label>
              </div>
              <div>
                <label htmlFor='password' className='flex flex-col '>
                  <p className='text-white-30 text-shadow'>비밀번호</p>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChangeHandler}
                    placeholder='비밀번호를 입력하세요'
                    className=' flex items-center gap-2 rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] caret-primary shadow-md'
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
          <div className='w-101 mx-auto flex items-center justify-center gap-[2px]'>
            <button onClick={openModal} className='text-white-50 text-[14px]'>
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

export default Login
