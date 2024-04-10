import React, { forwardRef } from 'react'

const ChangeFontColor = forwardRef<HTMLDivElement>((props, ref) => {
  const fontColorList: string[] = [
    '#ff0000',
    '#2f802f',
    '#0000ff',
    '#000000',
    '#ffffff',
  ]
  const fontColorNameList: string[] = ['빨강', '초록', '파랑', '검정', '하양']

  const applyColor = (color: string): void => {
    if (typeof ref !== 'function') {
      if (ref && ref.current) {
        document.execCommand('foreColor', false, color)
        ref.current.focus({ preventScroll: true })
      }
    }
  }

  return (
    <div className='flex flex-row items-center space-x-1 my-3'>
      <p>Font color: </p>
      {fontColorList.map((value, index) => (
        <button
          key={index}
          className='w-[50px] h-[30px] border border-solid border-black rounded'
          style={
            index === 4
              ? { color: '#a9a9a9' }
              : { color: `${fontColorList[index]}` }
          }
          onClick={() => applyColor(fontColorList[index])}
        >
          {fontColorNameList[index]}
        </button>
      ))}
    </div>
  )
})

ChangeFontColor.displayName = 'ChangeFontColor'

export default ChangeFontColor
