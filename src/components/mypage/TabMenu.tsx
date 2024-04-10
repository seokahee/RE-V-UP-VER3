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
      <div className='flex'>
        {data &&
          data.map((item, idx) => {
            return (
              <button
                key={item.id}
                type='button'
                onClick={() => onClickTabHandler(idx)}
                className={`${isActive === idx ? 'text-blue-600' : ''} ${width}`}
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
