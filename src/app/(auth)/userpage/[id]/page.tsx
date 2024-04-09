'use client'

import TabMenu from '@/components/mypage/TabMenu'
import LikeBoardList from '@/components/userpage/LikeBoardList'
import UserInfo from '@/components/userpage/UserInfo'
import WriteList from '@/components/userpage/WriteList'
import React from 'react'

const UserPage = () => {
  const tabArr = [
    { id: 0, title: '프로필', content: <UserInfo /> },
    { id: 1, title: '내가 쓴 글', content: <WriteList /> },
    { id: 2, title: '좋아요 한 글', content: <LikeBoardList /> },
  ]

  return (
    <div>
      <TabMenu data={tabArr} width='w-1/3' />
    </div>
  )
}

export default UserPage
