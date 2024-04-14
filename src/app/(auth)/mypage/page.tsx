'use client'

import LikeBoardList from '@/components/mypage/LikeBoardList'
import MyInfo from '@/components/mypage/MyInfo'
import TabMenu from '@/components/mypage/TabMenu'
import WriteList from '@/components/mypage/WriteList'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MyPage = () => {
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(false)

  const tabArr = [
    { id: 0, title: '내 프로필', content: <MyInfo /> },
    { id: 1, title: '내가 쓴 글', content: <WriteList /> },
    { id: 3, title: '좋아요 한 글', content: <LikeBoardList /> },
  ]

  useEffect(() => {
    if (session.status !== 'authenticated') {
      router.replace('/')
    } else {
      setShouldRender(true)
    }
  }, [router, session, pathname])

  return (
    <>
      {shouldRender && (
        <div>
          <TabMenu data={tabArr} width='w-1/3' />
        </div>
      )}
    </>
  )
}

export default MyPage
