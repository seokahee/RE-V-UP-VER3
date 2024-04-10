'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LogOutButton from './logout/LogOutButton'
import SearchComponent from '@/components/search/SearchForm'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import commu from '@/../public/images/commuIcon.svg'
import people from '@/../public/images/mypageIcon.svg'

const Header = () => {
  const { data: user } = useSession()
  const path = usePathname()

  if (path === '/mypage') {
    return (
      <header className=' bg-black p-2 flex items-center justify-between border-solid border-b-2'>
        <nav>
          <Link href='/'>
            <p className='text-white'>V-UP</p>
          </Link>
        </nav>
        <nav className='flex justify-between'>
          <Link href='/community'>
            <Image src={commu} alt='' />
          </Link>
          {!user ? (
            <Link href='/join'>
              <Image src={commu} alt='' />
            </Link>
          ) : (
            <>
              {' '}
              <Link href='/mypage'>
                <Image src={people} alt='' />
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
      <header className='p-2 flex justify-center border-solid border-b-2'>
        <nav>
          <Link href='/'>
            <p>V-UP</p>
          </Link>
        </nav>
      </header>
    )
  } else {
    return (
      <header className='  bg-black p-2 flex items-center justify-between border-solid border-b-2'>
        <nav>
          <Link href='/'>
            <p className='text-white'>V-UP</p>
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
