import Image from 'next/image'
import React, { forwardRef } from 'react'

type propsType = {
  actionValue: string
  actionSymbol: string
}

const ActionButton = forwardRef<HTMLDivElement, propsType>((props, ref) => {
  const applyAction = (action: string) => {
    if (typeof ref !== 'function') {
      if (ref && ref.current) {
        document.execCommand(action)
        ref.current.focus({ preventScroll: true })
      }
    }
  }

  return (
    <>
      <button
        className='flex justify-center items-center size-[30px] border border-solid border-black rounded'
        onClick={() => applyAction(props.actionValue)}
      >
        <Image
          src={props.actionSymbol}
          alt='actionSymbol'
          width={20}
          height={20}
        />
      </button>
    </>
  )
})
ActionButton.displayName = 'ActionButton'

export default ActionButton
