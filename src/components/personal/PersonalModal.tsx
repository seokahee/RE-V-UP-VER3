'use client'

import PersonalModalDetail from '@/components/personal/PersonalModalDetail'
import { useState, useEffect } from 'react'

const PersonalModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const HOME_VISITED =
    typeof window !== 'undefined' ? localStorage.getItem('homeVisited') : null

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    const today = new Date()
    const visitedDate = HOME_VISITED ?? null

    const handleMainPop = () => {
      if (visitedDate && visitedDate > today.getTime().toString()) {
        return
      }
      if (!visitedDate || visitedDate < today.getTime().toString()) {
        setIsModalOpen(true)
      }
    }
    window.setTimeout(handleMainPop, 1000)
  }, [HOME_VISITED])

  return <PersonalModalDetail isOpen={isModalOpen} onClose={closeModal} />
}
export default PersonalModal
