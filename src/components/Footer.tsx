'use client'

import { useSession } from 'next-auth/react'

const Footer = () => {
  const session = useSession()

  const check = session.status === 'authenticated'

  return (
    <footer className={`${!check ? 'pl-10' : 'pl-20'} border-t border-black`}>
      <nav className='footer py-8'>
        <section>
          <p className='py-2 text-2xl font-bold italic text-primary-white'>
            V-UP
          </p>
        </section>
        <section className='flex flex-row py-2'>
          <section className=''>
            <section className='flex flex-row gap-8 py-2'>
              <section className='w-40 text-xs'>front-end Developer</section>
              <ul className='grid list-none grid-cols-5 gap-3 text-xs'>
                <li>성예지</li>
                <li>강지수</li>
                <li>남해리</li>
                <li>서가희</li>
              </ul>
            </section>
            <section className='flex flex-row gap-8 '>
              <p className='w-40  text-xs'>UXUI Designer</p>
              <p className=' text-xs'>전주용</p>
            </section>
          </section>
          <section className='flex justify-end '>
            <p className='justify-end py-2  text-xs text-primary'>
              © 2024 VakVakVerse. All rights reserved.
            </p>
          </section>
        </section>
      </nav>
    </footer>
  )
}

export default Footer
