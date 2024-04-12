'use client'

import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useStore } from '@/shared/store'
import { getUserUid, getUserUidProviderUserInfo } from '@/shared/login/loginApi'

type Props = {
  children?: ReactNode
}
const UserProvider = ({ children }: Props) => {
  const { setUserInfo } = useStore()
  const { data: userSessionInfo } = useSession()
  console.log(userSessionInfo)
  console.log(userSessionInfo?.user)
  useEffect(() => {
    const saveStoreUserUid = async () => {
      if (
        userSessionInfo &&
        userSessionInfo?.user?.email &&
        userSessionInfo.user.uid
      ) {
        const userData = await getUserUid(userSessionInfo.user.email)
        const providerUserData = await getUserUidProviderUserInfo(
          userSessionInfo.user.email,
        )
        const { uid, name, email } = userSessionInfo.user
        const password = 'noPassword'
        const userType = 1
      }
    }

    saveStoreUserUid()
  }, [userSessionInfo])

  return <div>{children}</div>
}

export default UserProvider
