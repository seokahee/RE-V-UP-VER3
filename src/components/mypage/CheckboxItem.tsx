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
  return (
    <input
      type='checkbox'
      id={id}
      checked={checked}
      onChange={onChangeCheckMusicHandler}
      className='border-gray-200 h-6 w-6 rounded-lg border border-solid shadow-md'
    />
  )
}

export default CheckboxItem
