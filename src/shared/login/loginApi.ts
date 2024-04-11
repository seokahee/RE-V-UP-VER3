import Email from 'next-auth/providers/email'
import { supabase } from '../supabase/supabase'

export const getUserUid = async (email: string) => {
  const { data: user, error } = await supabase
    .from('userInfo')
    .select('*')
    .eq('email', email)
    .single()

  if (user) {
    return user
  }

  if (error) {
    if (error.details.includes('0 rows') || error.details.includes('already')) {
      return
    }
    alert('정보를 받아오지 못하고 있습니다. 문의해주세요')
    return
  }
  return user
}

export const findUserPassword = async (spendEmail: string) => {
  let { data, error } = await supabase.auth.resetPasswordForEmail(spendEmail, {
    redirectTo: 'http://localhost:3000/new-password',
  })
  if (!data) {
    console.log(error)
    alert('이메일을 다시 입력해주세요!')
    return
  }

  return data
}

export const getUserUidProviderUserInfo = async (email: string) => {
  const { data: providerUser, error } = await supabase
    .from('providerUserInfo')
    .select('*')
    .eq('email', email)
    .single()

  if (providerUser) {
    return providerUser
  }

  if (error) {
    if (error.details.includes('0 rows') || error.details.includes('already')) {
      return
    }
    alert('정보를 받아오지 못하고 있습니다. 문의해주세요')
    return
  }
}

export const updateUserPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (!data || error) {
    console.log(error)
    alert('비밀번호를 다시 입력해주세요!')
    return
  }

  return data
}
