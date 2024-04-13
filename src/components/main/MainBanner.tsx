'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const MainBanner = () => {
  const [slide, setSlide] = useState(0)

  const onClickPrevHandler = () => {
    setSlide((prev) => prev - 1)
  }

  const onClickNextHandler = () => {
    setSlide((prev) => prev + 1)
  }

  const bannerArray = [
    {
      id: 1,
      src: 'https://hxavgjouatzlrjtjgrth.supabase.co/storage/v1/object/public/adBanner/ban1.png?t=2024-04-13T17%3A12%3A29.024Z',
    },
    {
      id: 2,
      src: 'https://hxavgjouatzlrjtjgrth.supabase.co/storage/v1/object/public/adBanner/ban2.png',
    },
  ]

  return (
    <div className='relative m-4'>
      <ul className='flex overflow-hidden rounded-[2rem] transition-all'>
        {bannerArray.map((item, idx) => {
          return (
            <li
              key={item.id}
              className={`w-full transition-opacity [&_img]:h-auto [&_img]:w-full ${slide === idx ? 'block' : 'hidden'}`}
            >
              <Image
                src={item.src}
                width={1600}
                height={300}
                alt={`배너 이미지 ${idx}`}
              />
            </li>
          )
        })}
      </ul>
      <div className='absolute bottom-6 right-6'>
        <button type='button' className='' onClick={onClickPrevHandler}>
          &lt;
        </button>
        <button type='button' className='' onClick={onClickNextHandler}>
          &gt;
        </button>
      </div>
    </div>
  )
}

export default MainBanner
