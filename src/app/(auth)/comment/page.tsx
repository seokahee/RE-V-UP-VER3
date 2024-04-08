import CommentForm from '@/components/comment/CommentForm'
import CommentsList from '@/components/comment/CommentsList'
import React from 'react'

const CommentsPage = () => {
  return (
    <>
      <CommentsList />
      <CommentForm />
    </>
  )
}

export default CommentsPage
