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
        className={`flex items-center justify-between border-b-2 border-solid py-4 ${check ? 'pl-[5rem]' : 'pl-[2.5rem]'}`}
      >
        <nav>
          <Link href='/'>
            <p className='text-2xl font-bold italic text-primary-white '>
              V-UP
            </p>
          </Link>
        </nav>
        <nav className='flex justify-between  gap-2'>
          <Link
            href='/community'
            className='shadow-inner" h-12 w-12 rounded-xl bg-white bg-opacity-10 p-3 shadow '
          >
            <Image src={commu} alt='커뮤니티 아이콘' />
          </Link>
          {!user ? (
            <Link
              href='/join'
              className='shadow-inner" h-12 w-12 rounded-xl bg-white bg-opacity-10 p-3 shadow'
            >
              <Image src={commu} alt='커뮤니티 아이콘' />
            </Link>
          ) : (
            <>
              {' '}
              <Link
                href='/mypage'
                className='shadow-inner" h-12 w-12 rounded-xl bg-white bg-opacity-10 p-3 shadow'
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
    path === '/personal-music'
  ) {
    return (
      <header className='border-b-2  border-solid px-[2.5rem] py-4'>
        <nav className='flex flex-row  gap-2'>
          <Link href='/' className=' basis-1/2 '>
            <Image
              src={back}
              alt='뒤로가기 아이콘'
              className='ml-8 h-12 w-12 rounded-xl bg-white bg-opacity-10 p-3 shadow shadow-inner'
            />
          </Link>
          <Link href='/'>
            <p className='text-2xl font-bold italic text-primary-white '>
              V-UP
            </p>
          </Link>
        </nav>
      </header>
    )
  } else {
    return (
      <header
        className={`flex items-center justify-between border-b-2 border-solid py-4 ${check ? 'pl-[5rem]' : 'pl-[2.5rem]'} pr-[2.5rem]`}
      >
        <nav>
          <Link href='/'>
            <p className='text-2xl font-bold italic text-primary-white'>V-UP</p>
          </Link>
        </nav>
        <nav>
          <SearchComponent />
        </nav>
        <nav className='flex justify-between gap-2'>
          <Link
            href='/community'
            className='shadow-inner" h-12 w-12 rounded-xl bg-white bg-opacity-10 p-3 shadow'
          >
            <Image src={commu} alt='' />
          </Link>
          {!user ? (
            <Link
              href='/login'
              className='shadow-inner" h-12 w-12 rounded-xl bg-white bg-opacity-10 p-3 shadow'
            >
              <Image src={people} alt='' />
            </Link>
          ) : (
            <>
              <Link
                href='/mypage'
                className='shadow-inner" h-12 w-12 rounded-xl bg-white bg-opacity-10 p-3 shadow'
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
