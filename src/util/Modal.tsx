import React, { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  closeModal: () => void
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div>
      <div
        className={`fixed left-1/2 top-1/2 z-50 flex w-[516px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center`}
      >
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
