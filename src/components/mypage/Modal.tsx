import React, { ReactNode } from 'react'

type Modal = {
  children: ReactNode
  onClick: () => void
}

const Modal = ({ children, onClick }: Modal) => {
  const modalShadow =
    'shadow-[0px 4px 4px rgba(0, 0, 0, 0.2), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 4px rgba(0, 0, 0, 0.1), 0px 0px 0px 3px rgba(255, 255, 255, 0.2), inset 0px 1px 2px rgba(255, 255, 255, 0.2), inset 0px 4px 1px rgba(255, 255, 255, 0.2), inset 0px -4px 1px rgba(0, 0, 0, 0.1)]'

  return (
    <div className=''>
      <div className='fixed bottom-0 left-0 right-0 top-0 bg-black/[0.7]'></div>
      <div
        className={`fixed left-1/2 top-1/2 w-[516px] max-w-[80%] -translate-x-1/2  -translate-y-1/2 rounded-[2rem] bg-[#3d3d3d91] ${modalShadow}`}
      >
        <div className='relative m-[4px] h-[680px] max-h-[80vh] overflow-y-auto rounded-[2rem] border-4 border-solid border-[#474747] bg-[#3D3D3D] p-4'>
          <button
            type='button'
            onClick={onClick}
            className='absolute right-[1rem] top-[1rem]'
          >
            x
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
