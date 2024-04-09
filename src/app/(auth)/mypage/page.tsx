'use client'

import LikeBoardList from '@/components/mypage/LikeBoardList'
import MyInfo from '@/components/mypage/MyInfo'
import TabMenu from '@/components/mypage/TabMenu'
import WriteList from '@/components/mypage/WriteList'
import React from 'react'

const MyPage = () => {
  const tabArr = [
    { id: 0, title: '내 프로필', content: <MyInfo /> },
    { id: 1, title: '내가 쓴 글', content: <WriteList /> },
    { id: 3, title: '좋아요 한 글', content: <LikeBoardList /> },
  ]

  return (
    <div>
      <TabMenu data={tabArr} width='w-1/3' />
    </div>
  )
}

export default MyPage
