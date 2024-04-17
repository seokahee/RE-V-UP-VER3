import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
}

const ButtonSecondary = ({ children, onClick }: ButtonProps) => {
  const shadow =
    'shadow-[0px_4px_4px_rgba(0,0,0,0.2),0px_0px_0px_1px_rgba(0,0,0,0.1),0px_0px_0px_4px_rgba(0,0,0,0.1),0px_0px_0px_3px_rgba(255,255,255,0.2),inset_0px_1px_2px_rgba(255,255,255,0.2),inset_0px_4px_1px_rgba(255,255,255,0.2),inset_0px_-4px_1px_rgba(0,0,0,0.1)]'

  return (
    <button
      type='button'
      className={`${shadow} min-w-[76px] rounded-xl bg-[hsla(245,100%,68%,0)] p-3 text-[1rem] font-bold tracking-[-0.03em]`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonSecondary
