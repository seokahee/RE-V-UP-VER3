'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LogOutButton from './logout/LogOutButton'
import SearchComponent from '@/components/search/SearchForm'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import commu from '@/../public/images/Property 1=message-chat-circle.svg'
import people from '@/../public/images/Property 1=user-01.svg'
import back from '@/../public/images/Property 1=chevron-left.svg'

const Header = () => {
  const { data: user, status } = useSession()
  const path = usePathname()
  const check = status === 'authenticated' && !['/login', 'join'].includes(path)

  if (path === '/mypage') {
    return (
      <header
        className={`flex h-[120px] w-[836px] items-center justify-between border-b-2 border-solid border-primary-black py-4 pr-[2.5rem] ${check ? 'pl-[5rem] ' : 'pl-[2.5rem]'}`}
      >
        <nav>
          <Link href='/'>
            <h1 className='pr-[64px] text-[28px]  font-bold italic text-primary-white'>
              V-UP
            </h1>
          </Link>
        </nav>
        <nav className='flex justify-between  gap-2'>
          <Link
            href='/community'
            className=' relative inline-flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black border-opacity-10 bg-white bg-opacity-10 shadow shadow-inner'
          >
            <Image src={commu} alt='커뮤니티 아이콘' />
          </Link>
          {!user ? (
            <Link
              href='/join'
              className=' relative inline-flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black border-opacity-10 bg-white bg-opacity-10 shadow shadow-inner'
            >
              <Image src={commu} alt='커뮤니티 아이콘' />
            </Link>
          ) : (
            <>
              {' '}
              <Link
                href='/mypage'
                className=' relative inline-flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black border-opacity-10 bg-white bg-opacity-10 shadow shadow-inner'
              >
                <Image src={people} alt='마이페이지 아이콘' />
              </Link>
              <LogOutButton />
            </>
          )}
        </nav>
      </header>
    )
  } else if (
    path === '/join' ||
    path === '/login' ||
    path === '/personal-music' ||
    path === '/new-password'
  ) {
    return (
      <header className='flex h-[120px] w-[836px] items-center justify-center border-b-2 border-solid border-primary-black px-[2.5rem] py-4'>
        <nav className='flex w-screen flex-row'>
          <Link href='/' className='pr-[300px]'>
            <Image
              src={back}
              alt='뒤로가기 아이콘'
              className='  relative inline-flex h-12 w-12  rounded-xl border-4 border-black border-opacity-10 bg-white bg-opacity-10 shadow shadow-inner'
            />
          </Link>
          <Link href='/'>
            <h1 className='text-[28px] font-bold italic text-primary-white '>
              V-UP
            </h1>
          </Link>
        </nav>
      </header>
    )
  } else {
    return (
      <header
        className={`flex h-[120px] w-[836px] items-center justify-between border-b-2 border-solid border-primary-black py-4 ${check ? 'pl-[5rem]' : 'pl-[2.5rem]'} pr-[2.5rem]`}
      >
        <nav>
          <Link href='/'>
            <p className='text-[28px]  font-bold italic text-primary-white'>
              V-UP
            </p>
          </Link>
        </nav>
        <nav>
          <SearchComponent />
        </nav>
        <nav className='flex justify-between gap-2'>
          <Link
            href='/community'
            className=' relative inline-flex h-12 w-12 items-center justify-center rounded-xl border-4 border-primary-black border-opacity-10 bg-white bg-opacity-10 shadow shadow-inner'
          >
            <Image src={commu} alt='' />
          </Link>
          {!user ? (
            <Link
              href='/login'
              className=' relative inline-flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black border-opacity-10 bg-white bg-opacity-10 shadow shadow-inner'
            >
              <Image src={people} alt='' />
            </Link>
          ) : (
            <>
              <Link
                href='/mypage'
                className=' relative inline-flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black border-opacity-10 bg-white bg-opacity-10 shadow shadow-inner'
              >
                <Image src={people} alt='' />
              </Link>
              <LogOutButton />
            </>
          )}
        </nav>
      </header>
    )
  }
}

export default Header
