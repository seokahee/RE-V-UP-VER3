'use client'

import { useSession } from 'next-auth/react'

const Footer = () => {
  const session = useSession()

  const check = session.status === 'authenticated'

  return (
    <footer className={`${!check ? 'pl-10' : 'pl-20'} border-t border-black`}>
      <nav className='footer  p-8 '>
        <section>
          <p>V-UP</p>
        </section>
        <section className=' flex flex-row'>
          <section className='basis-1/2'>
            <section className=' flex flex-row gap-8'>
              <section className=' w-40'>front-end Developer</section>
              <ul className=' grid list-none grid-cols-5 gap-4'>
                <li>성예지</li>
                <li>남해리</li>
                <li>강지수</li>
                <li>서가희</li>
              </ul>
            </section>
            <section className=' flex flex-row gap-8'>
              <p className='w-40'>UXUI Designer</p>
              <p className=''>전주용</p>
            </section>
          </section>
          <section className=' basis-1/2'>
            <p>© 2024 VakVakVerse. All rights reserved.</p>
          </section>
        </section>
      </nav>
    </footer>
  )
}

export default Footer
