// ServiceModal.jsx
import { PersonalModal } from '@/types/personal/type'
import React from 'react'

const ServiceModal = ({ isOpen, onClose }: PersonalModal) => {
  if (!isOpen) return null

  const onCloseHandler = () => {
    onClose() // 모달 닫기 함수 호출
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-primary-black opacity-70'></div>
      <div className='z-40'>
        <p className='text-white'>
          음악을 클릭하거나 드래그해서 플레이리스트에 추가해요!
        </p>
        <p className='text-white'>플레이어 재생버튼</p>
        <p className='text-white'>다음 곡 재생</p>
        <p className='text-white'>이전 곡 재생</p>
        <p className='text-white'>가사 보기</p>
        <p className='text-white'>마이플레이리스트 추가</p>
        <p className='text-white'>
          커뮤니티 이용
          <br />
          커뮤니티를 통해 음악을 서로 공유하고 음표모양 버튼으로 현재 재생목록에
          추가해봐요!
        </p>
        <p className='text-white'>
          마이 페이지 <br />
          마이페이지를 통해 팔로워와 플레이리스트를 관리해봐요!
        </p>
        <p className='text-white'>로그아웃</p>
      </div>
      <button className='z-40' onClick={onCloseHandler}>
        나가기
      </button>
    </div>
  )
}

export default ServiceModal
