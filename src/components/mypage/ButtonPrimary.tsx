import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
}

const ButtonPrimary = ({ children, onClick }: ButtonProps) => {
  const shadow =
    'shadow-[0px_4px_4px_#00000033,0px_0px_0px_1px_#0000001a,0px_0px_0px_4px_#685bff1a,0px_0px_0px_3px_#ffffff33,inset_0px_1px_2px_#ffffff33,inset_0px_4px_1px_#ffffff33,inset_0px_-4px_1px_#0000001a]'

  const active =
    'active:bg-[#685bff33] active:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.20)_inset,0px_4px_4px_0px_rgba(255,255,255,0.20),0px_0px_0px_1px_rgba(0,0,0,0.10),0px_0px_0px_4px_rgba(104,91,255,0.10),0px_0px_0px_3px_rgba(255,255,255,0.20),0px_4px_1px_0px_rgba(0,0,0,0.20)_inset,0px_-4px_1px_0px_rgba(255,255,255,0.05)_inset]'

  return (
    <button
      type='button'
      className={`bg-primary p-3 ${shadow} ${active} min-w-[118px] rounded-xl text-[1rem] font-bold tracking-[-0.03em]`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonPrimary
