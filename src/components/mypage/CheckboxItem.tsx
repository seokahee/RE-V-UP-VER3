import React from 'react'

type CheckboxItme = {
  onChangeCheckMusicHandler: React.ChangeEventHandler<HTMLInputElement>
  checked: boolean
  id: string
}

const CheckboxItem = ({
  onChangeCheckMusicHandler,
  id,
  checked,
}: CheckboxItme) => {
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
