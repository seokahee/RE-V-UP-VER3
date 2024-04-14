import React, { useState } from 'react'

type TabProps = {
  data: {
    id: number
    title: string
    content: React.JSX.Element
  }[]
  width: string
}

const TabMenu = ({ data, width }: TabProps) => {
  const [isActive, setIsActive] = useState(0)

  const onClickTabHandler = (idx: number) => {
    setIsActive(idx)
  }

  return (
    <div>
      <div className='mb-8 mt-12 flex border-b border-[#ffffff4d]'>
        {data &&
          data.map((item, idx) => {
            return (
              <button
                key={item.id}
                type='button'
                onClick={() => onClickTabHandler(idx)}
                className={`${isActive === idx ? 'border-[#685BFF] text-[#685BFF]' : 'border-transparent text-[#ffffff80]'} mb-[-1px] p-[0.875rem] font-bold ${width}  border-b-2 text-[1.25rem] tracking-[-0.03em]`}
              >
                {item.title}
              </button>
            )
          })}
      </div>
      <div>{data[isActive].content}</div>
    </div>
  )
}

export default TabMenu
