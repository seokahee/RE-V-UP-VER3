import React, { forwardRef } from 'react'

const ChangeFontStyle = forwardRef<HTMLDivElement>((props, ref) => {
  const applyStyle = (style: string): void => {
    if (typeof ref !== 'function') {
      if (ref && ref.current) {
        document.execCommand(style)
        ref.current.focus({ preventScroll: true })
      }
    }
  }

  return (
    <div className='flex flex-row space-x-1'>
      <button
        className='justify-center items-center size-[30px] border border-solid border-black rounded font-bold'
        onClick={() => applyStyle('bold')}
      >
        B
      </button>
      <button
        className='justify-center items-center size-[30px] border border-solid border-black rounded italic'
        onClick={() => applyStyle('italic')}
      >
        I
      </button>
      <button
        className='justify-center items-center size-[30px] border border-solid border-black rounded underline'
        onClick={() => applyStyle('underline')}
      >
        U
      </button>
      <button
        className='justify-center items-center size-[30px] border border-solid border-black rounded, line-through'
        onClick={() => applyStyle('strikeThrough')}
      >
        S
      </button>
      <button
        className='justify-center items-center size-[30px] border border-solid border-black rounded'
        onClick={() => applyStyle('insertOrderedList')}
      >
        OL
      </button>
      <button
        className='justify-center items-center size-[30px] border border-solid border-black rounded'
        onClick={() => applyStyle('insertUnorderedList')}
      >
        UL
      </button>
    </div>
  )
})

ChangeFontStyle.displayName = 'ChangeFontStyle'

export default ChangeFontStyle
