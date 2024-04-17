import React from 'react'
import Lock from '@/../public/images/lock.svg'
import Image from 'next/image'

const LockContents = () => {
  return (
    <div className='flex items-center justify-center'>
      <Image src={Lock} width={340} height={380} alt='비공개 컨텐츠 입니다' />
    </div>
  )
}

export default LockContents
