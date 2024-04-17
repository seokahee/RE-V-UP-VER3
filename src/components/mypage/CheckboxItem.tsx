import React from 'react'

type CheckboxItem = {
  onChangeCheckMusicHandler: React.ChangeEventHandler<HTMLInputElement>
  checked: boolean
  id: string
}

const CheckboxItem = ({
  onChangeCheckMusicHandler,
  id,
  checked,
}: CheckboxItem) => {
  const shadow =
    'shadow-[0px_4px_4px_rgba(0,0,0,0.1),0px_0px_0px_0.5px_rgba(0,0,0,0.1),0px_0px_0px_2.5px_rgba(0,0,0,0.1),0px_0px_0px_2px_rgba(0,0,0,0.2),inset_0px_-2px_1px_rgba(255,255,255,0.2),inset_0px_2px_1px_rgba(0,0,0,0.1)]'
  const checkedStyle =
    'checked:bg-[#685BFF] checked:border-[1.5px] checked:border-[#685BFF] checked:bg-check'
  const checkedShadow =
    'checked:shadow-[0px_4px_4px_rgba(0,0,0,0.1),0px_0px_0px_0.5px_rgba(0,0,0,0.1),0px_0px_0px_2.5px_rgba(104,91,255,0.3),0px_0px_0px_2px_rgba(0,0,0,0.2),inset_0px_-2px_1px_rgba(255,255,255,0.2),inset_0px_2px_1px_rgba(0,0,0,0.1)]'

  return (
    <input
      type='checkbox'
      id={id}
      checked={checked}
      onChange={onChangeCheckMusicHandler}
      className={`border-gray-200 h-6 w-6 appearance-none rounded border-0 border-solid ${shadow} bg-[rgba(0,0,0,0.1)] ${checkedStyle} ${checkedShadow}`}
    />
  )
}

export default CheckboxItem
