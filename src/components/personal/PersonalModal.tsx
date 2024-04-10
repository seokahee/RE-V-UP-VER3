'use client'

import PersonalModalDetail from '@/components/personal/PersonalModalDetail'
import { useState, useEffect } from 'react'

const PersonalModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const HOME_VISITED =
    typeof window !== 'undefined' ? localStorage.getItem('homeVisited') : null

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    const today = new Date()
    const visitedDate = HOME_VISITED ? new Date(HOME_VISITED) : null

    const handleMainPop = () => {
      if (visitedDate && visitedDate > today) {
        // 현재 date가 localStorage의 시간보다 크면 return
        return
      }
      if (!visitedDate || visitedDate < today) {
        // 저장된 date가 없거나 today보다 작다면 popup 노출
        setIsModalOpen(true)
      }
    }
    window.setTimeout(handleMainPop, 1000) // 1초 뒤 실행
  }, [HOME_VISITED])

  return <PersonalModalDetail isOpen={isModalOpen} onClose={closeModal} />
}
export default PersonalModal
