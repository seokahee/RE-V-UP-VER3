import React, { forwardRef } from 'react'

const ChangeFontBackground = forwardRef<HTMLDivElement>((props, ref) => {
  const backgroundColorList: string[] = [
    '#ff0000',
    '#2f802f',
    '#0000ff',
    '#000000',
  ]
  const backgroundColorNameList: string[] = ['빨강', '초록', '파랑', '검정']

  const applyColor = (color: string): void => {
    if (typeof ref !== 'function') {
      if (ref && ref.current) {
        document.execCommand('hiliteColor', false, color)
        ref.current.focus({ preventScroll: true })
      }
    }
  }

  return (
    <div className='flex flex-row items-center space-x-1 my-3'>
      <p>Font background: </p>
      {backgroundColorList.map((value, index) => (
        <button
          key={index}
          className='w-[50px] h-[30px] border border-solid border-black rounded text-white'
          style={{ backgroundColor: `${backgroundColorList[index]}` }}
          onClick={() => applyColor(backgroundColorList[index])}
        >
          {backgroundColorNameList[index]}
        </button>
      ))}
    </div>
  )
})

ChangeFontBackground.displayName = 'ChangeFontBackground'

export default ChangeFontBackground
