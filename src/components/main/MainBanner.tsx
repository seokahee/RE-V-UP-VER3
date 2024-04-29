'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const MainBanner = () => {
  const [slide, setSlide] = useState(0)
  const session = useSession()

  const check = session.status === 'authenticated'

  const onClickPrevHandler = () => {
    setSlide((prev) => prev - 1)
  }

  const onClickNextHandler = () => {
    setSlide((prev) => prev + 1)
  }

  const bannerArray = [
    {
      id: 1,
      src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/adBanner/userTestBanner.jpg`,
      url: '',
      text: '',
    },
    {
      id: 2,
      src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/adBanner/1.png`,
      url: '',
      text: '',
    },
  ]

  const itemShadow =
    'shadow-[0px_4px_1px_-1px_#00000033,0px_0px_0px_1px_#ffffff26,inset_0px_2px_0px_#ffffff1a,inset_0px_-1px_2px_#00000033,inset_0px_-4px_1px_#00000033,_4px_4px_3px_0px_#0000004c] drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]'

  return (
    <section className={`${!check ? 'pl-10' : 'pl-20'} relative  mr-10`}>
      <ul
        className={`flex overflow-hidden rounded-[2rem] border-4 border-black transition-all ${itemShadow}`}
      >
        {bannerArray.map((item, idx) => {
          return (
            <li
              key={item.id}
              className={`w-full transition-opacity [&_img]:h-auto [&_img]:w-full ${slide === idx ? 'block' : 'hidden'} `}
            >
              {item.url ? (
                <Link href={item.url} target='_blank'>
                  <Image
                    src={item.src}
                    width={732}
                    height={180}
                    alt={item.text}
                  />
                </Link>
              ) : (
                <Image
                  src={item.src}
                  width={732}
                  height={180}
                  alt={item.text}
                />
              )}
            </li>
          )
        })}
      </ul>
      <div className='absolute bottom-6 right-6 min-w-[69px]  rounded-full bg-[#ffffffb2] px-[6px] py-[2px] text-center text-[12px] backdrop-blur-sm'>
        <button
          type='button'
          className={`${slide === 0 ? '' : 'text-white'} px-[2px]`}
          onClick={onClickPrevHandler}
          disabled={slide === 0 ? true : false}
        >
          &lt;
        </button>
        <span className='px-[2px] font-bold text-white'>{slide + 1}</span>
        <span className='px-[2px] text-white'>/</span>
        <span className='px-[2px] font-bold text-[#ffffff7f]'>
          {bannerArray.length}
        </span>
        <button
          type='button'
          className={`${slide < bannerArray.length - 1 ? '' : 'text-white'}  px-[2px]`}
          onClick={onClickNextHandler}
          disabled={slide < bannerArray.length - 1 ? false : true}
        >
          &gt;
        </button>
      </div>
    </section>
  )
}

export default MainBanner
