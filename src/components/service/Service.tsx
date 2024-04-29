// Service.jsx
import React, { useState } from 'react'
import ServiceModal from './ServiceModal'

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const onServiceHandler = () => {
    setIsModalOpen(true)
  }

  return (
    <div className='relative '>
      <div className='absolute inset-x-10 bottom-20 inline-flex h-14 w-14 flex-col items-center justify-center gap-2 rounded-[100px] border-2 border-black border-opacity-10 bg-indigo-500 p-2 shadow shadow-inner'>
        <div className="text-center font-['Urbanist'] text-2xl font-black leading-[33.60px] text-white">
          <button onClick={onServiceHandler}>
            <span>?</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ServiceModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  )
}

export default Service
