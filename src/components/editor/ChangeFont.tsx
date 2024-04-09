import React, { forwardRef, useRef } from 'react'

const ChangeFont = forwardRef<HTMLDivElement>((props, ref) => {
  const fontNameSelectorRef = useRef<HTMLSelectElement>(null)

  const changeFontName = (name: string) => {
    if (fontNameSelectorRef) {
      document.execCommand('fontName', false, name)

      if (typeof ref !== 'function') {
        if (ref && ref.current) {
          ref.current.focus({ preventScroll: true })
        }
      }
    }
  }

  return (
    <div className='flex flex-row items-center space-x-1 my-3'>
      <p>Font: </p>
      <select
        id='select-font'
        ref={fontNameSelectorRef}
        onChange={(e) => changeFontName(e.target.value)}
        className='p-1 border border-solid border-black rounded'
      >
        <option value='Inherit'>Inherit(default)</option>
        <option value='Arial'>Arial</option>
        <option value='Times New Roman'>Times New Roman</option>
        <option value='Verdana'>Verdana</option>
      </select>
    </div>
  )
})

ChangeFont.displayName = 'ChangeFont'

export default ChangeFont
