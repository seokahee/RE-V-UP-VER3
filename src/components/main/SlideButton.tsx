import Image from 'next/image'
import React from 'react'
import next from '@/../public/images/next.svg'
import prev from '@/../public/images/prev.svg'

type SlideButtonProps = {
  position: number
  movePoint: number
  length: number
  onClickNextHandler: () => void
  onClickPrevHandler: () => void
}

const SlideButton = ({
  position,
  movePoint,
  length,
  onClickNextHandler,
  onClickPrevHandler,
}: SlideButtonProps) => {
  const shadow =
    'shadow-[0px_4px_1px_-1px_#00000033,0px_4px_8px_#0000001a,0px_0px_0px_1px_#ffffff26,inset_0px_-1px_2px_#00000033,inset_0px_-4px_1px_#00000033]'

  return (
    <div>
      {position !== ((length as number) - 1) * -movePoint && (
        <button
          type='button'
          className={`absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#00000019] bg-[#0000004c] text-white backdrop-blur-md ${shadow}`}
          onClick={onClickNextHandler}
        >
          <Image src={next} width={24} height={24} alt='다음으로 넘어가기' />
        </button>
      )}
      {position !== 0 && (
        <button
          type='button'
          className={`absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#00000019] bg-[#0000004c] text-white backdrop-blur-md ${shadow}`}
          onClick={onClickPrevHandler}
        >
          <Image src={prev} width={24} height={24} alt='이전으로 넘어가기' />
        </button>
      )}
    </div>
  )
}

export default SlideButton
