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
    />
  )
}

export default CheckboxItem
