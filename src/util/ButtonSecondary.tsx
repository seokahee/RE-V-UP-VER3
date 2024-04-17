import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
}

const ButtonSecondary = ({ children, onClick }: ButtonProps) => {
  const shadow =
    'shadow-[0px_4px_4px_#00000033,0px_0px_0px_1px_#0000001a,0px_0px_0px_4px_#0000001a,0px_0px_0px_3px_#ffffff33,inset_0px_1px_2px_#ffffff33,inset_0px_4px_1px_#ffffff33,inset_0px_-4px_1px_#0000001a]'

  return (
    <button
      type='button'
      className={`${shadow} min-w-[76px] rounded-xl bg-[#685bff33] p-3 text-[1rem] font-bold tracking-[-0.03em]`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonSecondary
