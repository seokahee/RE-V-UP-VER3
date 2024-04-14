import { JoinApi, SignIn, SignUp } from '@/types/loginJoin/types'
import { supabase } from '../supabase/supabase'

export const signUp = async ({ email, password }: JoinApi) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('unique')) {
      alert('이미 가입된 이메일입니다.')
      return
    } else {
      alert('가입 중 오류가 발생했습니다. 문의해주세요.')
    }
  } else {
    alert('회원가입이 완료되었습니다.')
  }
  return { data, error }
}

export const saveSignUpInUserInfo = async ({
  userId,
  email,
  password,
  nickname,
  userType,
}: SignUp) => {
  const { data, error } = await supabase
    .from('userInfo')
    .insert([
      {
        userId,
        email,
        password,
        nickname,
        userType,
        follower: [],
        following: [],
        userChar: {},
      },
    ])
    .select()

  if (error) {
    console.log(error)
    throw new Error('오류로 인해 가입정보가 승인되지 않았습니다.')
  }
  return data
}

export const getSignUpUserList = async () => {
  const { data: signUpUserList, error: signUpUserListError } = await supabase
    .from('userInfo')
    .select('*')
  if (signUpUserListError) {
    throw new Error('오류로 인해 정보를 가져오지 못 하고 있습니다')
  }
  return signUpUserList
}

export const saveSignUpInProviderUserInfo = async ({
  userId,
  email,
  password,
  nickname,
  userType,
}: SignIn) => {
  const { data, error } = await supabase
    .from('providerUserInfo')
    .insert([
      {
        userId,
        email,
        password,
        nickname,
        userType,
        follower: [],
        following: [],
        userChar: {},
      },
    ])
    .select()

  if (error) {
    if (
      error.details &&
      (error.details.includes('0 rows') || error.details.includes('already'))
    ) {
      console.log(error.details)
      return
    }
    if (error.code === '22P02') {
      alert('정보를 받아오지 못하고 있습니다. 문의해주세요')
    }
    console.log(error)
    return
  }

  if (data) {
    return data
  }
}

export const updateInProviderUserInfo = async ({
  userId,
  email,
  password,
  nickname,
  userType,
}: SignIn) => {
  const { data, error } = await supabase
    .from('providerUserInfo')
    .upsert({
      userId,
      email,
      password,
      nickname,
      userType,
      follower: [],
      following: [],
      userChar: {},
    })
    .select()

  if (error) {
    if (
      error.details &&
      (error.details.includes('0 rows') || error.details.includes('already'))
    ) {
      return
    }
    alert('정보를 받아오지 못하고 있습니다. 문의해주세요')
    return
  }
  if (data) {
    return data
  }
}
