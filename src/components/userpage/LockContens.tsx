import React from 'react'
import Lock from '@/../public/images/lock.svg'
import Image from 'next/image'

const LockContens = () => {
  return (
    <div>
      <Image src={Lock} width={158} height={180} alt='비공개 컨텐츠 입니다' />
    </div>
  )
}

export default LockContens
