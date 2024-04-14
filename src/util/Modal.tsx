import React, { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  children: ReactNode
  closeModal: () => void
}

const Modal = ({ isOpen, children, closeModal }: ModalProps) => {
  return (
    //모달
    <section
      className={`${isOpen ? 'relative left-0 top-0 z-50 flex max-w-[400px] items-center justify-center ' : 'hidden'}`}
    >
      {isOpen && (
        <>
          <div
            onClick={closeModal}
            className='fixed left-0 top-0 z-40 h-full w-full opacity-50'
          ></div>
          <div className='relative z-50 max-w-[400px] rounded-lg bg-white p-8'>
            <button
              onClick={closeModal}
              className='absolute right-0 top-0 flex h-[60px] w-full justify-center p-5 text-black'
            >
              <p className='flex h-[10px] w-full font-bold'>X</p>
            </button>
            <div className='mt-4 h-4/5 w-3/5 max-w-7xl rounded-[30px] border-2 border-solid border-white bg-white p-5'>
              {children}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Modal
