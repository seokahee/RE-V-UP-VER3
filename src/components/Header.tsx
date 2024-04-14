'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LogOutButton from './logout/LogOutButton'
import SearchComponent from '@/components/search/SearchForm'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import commu from '@/../public/images/commuIcon.svg'
import people from '@/../public/images/mypageIcon.svg'
import back from '@/../public/images/backButton.svg'

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
            <p className='text-white'>V-UP</p>
          </Link>
        </nav>
        <nav className='flex justify-between'>
          <Link href='/community'>
            <Image src={commu} alt='커뮤니티 아이콘' quality={100} alt='logo' />
          </Link>
          {!user ? (
            <Link href='/join'>
              <Image src={commu} alt='커뮤니티 아이콘' />
            </Link>
          ) : (
            <>
              {' '}
              <Link href='/mypage'>
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
        <nav className='flex flex-row'>
          <Link href='/' className='basis-1/2'>
            <Image src={back} alt='뒤로가기 아이콘' />
          </Link>
          <Link href='/'>
            <p className='text-primary-white'>V-UP</p>
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
            <p className='text-primary-white'>V-UP</p>
          </Link>
        </nav>
        <nav>
          <SearchComponent />
        </nav>
        <nav className='flex justify-between'>
          <Link href='/community'>
            <Image src={commu} alt='' />
          </Link>
          {!user ? (
            <Link href='/login'>
              <Image src={people} alt='' />
            </Link>
          ) : (
            <>
              <Link href='/mypage'>
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
