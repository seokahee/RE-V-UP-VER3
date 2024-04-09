import type { UserChar } from '@/types/main/types'
import { supabase } from '../supabase/supabase'
import { mbtiMatch } from '@/util/personal/util'

//조회 - 지수님
export const getUserChar = async (
  userId: string,
): Promise<UserChar | undefined> => {
  try {
    let { data, error } = await supabase
      .from('userInfo')
      .select('userChar')
      .eq('userId', userId)
      .limit(1)
      .single()
    if (error) {
      return {} as UserChar
    }
    return data as UserChar | undefined
  } catch (error) {
    return undefined
  }
}

//userInfo에 userChar 넣는 값
export const insertUserChar = async ({
  userId,
  personalUser,
}: {
  userId: string
  personalUser: UserChar
}) => {
  const mbtiCode = mbtiMatch(personalUser.mbti) // MBTI를 숫자로 변환
  const { data, error } = await supabase
    .from('userInfo')
    .update({ userChar: { ...personalUser, mbti: mbtiCode } }) // 숫자로 변환된 MBTI 저장
    .eq('userId', userId)
    .select()
  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
}
