'use client'

import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'

type Props = {
  children?: ReactNode
}
const UserReSessionProvider = ({ children }: Props) => {
  const { data: userSessionInfo, status } = useSession()

  useEffect(() => {
    const saveStoreUserUid = async () => {
      if (userSessionInfo) return status
    }
    saveStoreUserUid()
  }, [userSessionInfo])

  return <div>{children}</div>
}

export default UserReSessionProvider
