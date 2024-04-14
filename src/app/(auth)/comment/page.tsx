'use client'

import CommentForm from '@/components/comment/CommentForm'
import CommentsList from '@/components/comment/CommentsList'
import { useParams } from 'next/navigation'

const CommentsPage = () => {
  const { id: boardId }: { id: string } = useParams()
  return (
    <>
      <CommentsList boardId={boardId} />
      <CommentForm boardId={boardId} />
    </>
  )
}

export default CommentsPage
