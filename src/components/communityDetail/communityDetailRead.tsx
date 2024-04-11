import React from 'react'
import CommunityContents from './CommunityContents'
import CommentsPage from '@/app/(auth)/comment/page'

const CommunityDetailRead = () => {
  return (
    <div>
      <CommunityContents />
      <CommentsPage />
    </div>
  )
}

export default CommunityDetailRead
