import React, { ReactNode } from 'react'

type Modal = {
  children: ReactNode
  onClick: () => void
}

const Modal = ({ children, onClick }: Modal) => {
  const modalShadow =
    'shadow-[0px_4px_4px_#00000033,0px_0px_0px_1px_#0000001a,0px_0px_0px_4px_#0000001a,0px_0px_0px_3px_#ffffff33,inset_0px_1px_2px_#ffffff33,inset_0px_-4px_1px_#0000001a]'

  return (
    <div>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-10 bg-black/[0.7]'></div>
      <div
        className={`fixed left-1/2 top-1/2 h-[680px] max-h-[80vh] w-[516px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] border-4 border-[#474747] bg-[#3d3d3d] p-4 ${modalShadow} z-10`}
      >
        <button
          type='button'
          onClick={onClick}
          className='absolute right-[2rem] top-[2rem]'
        >
          x
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
