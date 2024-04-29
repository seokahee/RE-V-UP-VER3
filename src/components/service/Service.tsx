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
  const shadow =
    'shadow-[0px_4px_4px_#00000033,0px_0px_0px_1px_#0000001a,0px_0px_0px_4px_#695bffb9,0px_0px_0px_3px_#ffffff33,inset_0px_1px_2px_#ffffff33,inset_0px_4px_1px_#ffffff33,inset_0px_-4px_1px_#0000001a]'
  return (
    <div className='relative '>
      <div
        className={`${shadow} absolute inset-x-10 bottom-20 
        inline-flex h-14 w-14 flex-col items-center justify-center 
        gap-2 rounded-[100px]  bg-indigo-500 `}
      >
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
