'use client'

import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useStore } from '@/shared/store'
import {
  saveSignUpInProviderUserInfo,
  updateInProviderUserInfo,
} from '@/shared/join/joinApi'
import { getUserUid, getUserUidProviderUserInfo } from '@/shared/login/loginApi'

type Props = {
  children?: ReactNode
}
const UserProvider = ({ children }: Props) => {
  const { setUserInfo, setUserType } = useStore()
  const { data: userSessionInfo } = useSession()

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
        const emailType = 0
        const userType = 1

        const googleUserData = {
          userId: uid,
          email,
          nickname: name,
          password,
          userType,
        }

        if (userData) {
          const userId = userData.userId
          setUserType(emailType)
          setUserInfo(userId)
        }

        if (providerUserData) {
          if (providerUserData.userId.includes(uid)) {
            setUserInfo(uid)
            return await updateInProviderUserInfo(googleUserData)
          }
        }

        if (!providerUserData && !userData) {
          setUserInfo(uid)
          return await saveSignUpInProviderUserInfo(googleUserData)
        }
      }
    }

    saveStoreUserUid()
  }, [userSessionInfo])

  return <div>{children}</div>
}

export default UserProvider
