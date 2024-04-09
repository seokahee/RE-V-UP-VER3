import type { MusicPreference, UserChar } from '@/types/main/types'
import { supabase } from '../supabase/supabase'
import { mbtiMatch } from '@/util/personal/util'
import { genreMatch } from '@/util/main/util'

//mbti 선호도, 비선호도 조회하는 값
//선호도
export const getPreference = async () => {
  let { data: musicPreferences, error } = await supabase
    .from('musicPreferences')
    .select('hiphop,dance,ballad,rnb,rock')
    .eq('mbti', 1)
    .single()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }

  return musicPreferences
}

//비선호도
export const getDislike = async () => {
  let { data: musicPreferences, error } = await supabase
    .from('musicDislikes')
    .select('hiphop,dance,ballad,rnb,rock')
    .eq('mbti', 1)
    .single()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }

  return musicPreferences
}

//mbti별 선호도 상위 장르 음악
export const recommendMusic = async () => {
  try {
    let { data, error } = await supabase
      .from('musicPreferences')
      .select('hiphop, dance, ballad, rnb, rock')
      .eq('mbti', 1)
      .limit(1)
      .single()

    //추천 음악 선별 로직
    const entries = Object.entries(data as MusicPreference)
    //선호도 상위 3개 음악 추천
    entries.sort((a, b) => b[1] - a[1])
    const topArr = entries.slice(0, 3)

    //해당하는 음악 장르 코드 추출
    const genreCodes = topArr.map((item) => genreMatch(item[0]))
    return genreCodes as number[]
  } catch (error) {
    return []
  }
}

export const getRecommendMusic = async (musicPreferenceData) => {
  let { data: musicInfo, error } = await supabase
    .from('musicInfo')
    .select('*')
    .in('genre', musicPreferenceData)
    .limit(3)

  return musicInfo
}

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
