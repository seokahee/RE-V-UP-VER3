import { getSession, signOut } from 'next-auth/react'
import { supabase } from '@/shared/supabase/supabase'

const LogOutButton = () => {
  const onLogOutHandler = async () => {
    const loginStatus = await getSession()
    await supabase.auth.signOut()

    localStorage.clear()
    await signOut({ redirect: true, callbackUrl: '/' })

    if (loginStatus === null) {
      alert('로그아웃 되셨습니다.')
    }
  }

  return (
    <div>
      <button onClick={onLogOutHandler}>로그아웃</button>
    </div>
  )
}

export default LogOutButton
