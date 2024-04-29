import type { MusicPreference } from '@/types/main/types'
import type { PersonalInfo, PersonalMusic } from '@/types/personal/type'
import { supabase } from '../supabase/supabase'
import { genreMatch } from '@/util/main/util'
import { mbtiMatch, SentenceMatch } from '@/util/personal/util'

//MBTI 선호도 조회
export const getPreference = async (mbtiStatus: string) => {
  const mbtiCode = mbtiMatch(mbtiStatus)
  let { data: musicPreferences, error } = await supabase
    .from('musicPreferences')
    .select('hiphop,dance,ballad,rnb,rock')
    .eq('mbti', mbtiCode)
    .single()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }

  return musicPreferences
}

//MBTI 비선호도 조회
export const getDislike = async (mbtiStatus: string) => {
  const mbtiCode = mbtiMatch(mbtiStatus)
  let { data: musicPreferences, error } = await supabase
    .from('musicDislikes')
    .select('hiphop,dance,ballad,rnb,rock')
    .eq('mbti', mbtiCode)
    .single()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }

  return musicPreferences
}

//mbti별 선호도 상위 장르 3개
export const recommendMusic = async (mbtiStatus: string) => {
  const mbtiCode = mbtiMatch(mbtiStatus)
  try {
    let { data } = await supabase
      .from('musicPreferences')
      .select('hiphop, dance, ballad, rnb, rock')
      .eq('mbti', mbtiCode)
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
    throw error
  }
}

//퍼스널 진단 결과 -추천음악
export const getRecommendMusic = async (musicPreferenceData: number[]) => {
  let { data: musicInfo, error } = await supabase
    .from('musicInfo')
    .select('*')
    .in('genre', musicPreferenceData)
  const randomMusic = musicInfo?.sort(() => Math.random() - 0.5)
  const recommendMusicInfo = randomMusic?.slice(0, 3)

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
  return recommendMusicInfo
}
//userInfo 테이블에 userChar 추가
export const insertUserChar = async ({
  userId,
  personalUser,
}: {
  userId: string
  personalUser: PersonalInfo
}) => {
  const mbtiSentence = SentenceMatch(personalUser.mbti)
  const { data, error } = await supabase
    .from('userInfo')
    .update({
      userChar: {
        ...personalUser,
        mbti: personalUser.mbti,
        resultSentence: mbtiSentence,
      },
    })
    .eq('userId', userId)
    .select()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
  return data
}

//퍼스널 뮤직 테이블에 추가하는 값
export const insertPersonalMusic = async (personalMusic: PersonalMusic) => {
  const { userChar, resultMusic } = personalMusic
  const mbtiSentence = SentenceMatch(userChar.mbti)

  const { data, error } = await supabase
    .from('personalMusic')
    .insert([
      {
        resultSentence: mbtiSentence,
        userId: userChar.uid,
        result: resultMusic,
      },
    ])
    .select()
  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
  return data
}
//진단 여부 확인
export const getPersonaledUser = async () => {
  let { data: personalMusic, error } = await supabase
    .from('personalMusic')
    .select('userId')
  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
  return personalMusic
}

//이미 진단을 받은 경우
export const updatePersonalMusic = async (personalMusic: PersonalMusic) => {
  const { userChar, resultMusic } = personalMusic
  const mbtiSentence = SentenceMatch(userChar.mbti)

  const { data, error } = await supabase
    .from('personalMusic')
    .update({
      resultSentence: mbtiSentence,
      result: resultMusic,
    })
    .eq('userId', userChar.uid)
    .select()
  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }

  return data
}

//현재 재생 목록 조회
export const getCurrentMusics = async (userId: string) => {
  let { data: playlistCurrent, error } = await supabase
    .from('playlistCurrent')
    .select('currentMusicIds')
    .eq('userId', userId)
  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
  return playlistCurrent
}

//현재 재생목록에 음악 추가
export const updatePersonalResult = async ({
  userId,
  musicList,
}: {
  userId: string
  musicList: string[]
}) => {
  const { data, error } = await supabase
    .from('playlistCurrent')
    .update({ currentMusicIds: musicList })
    .eq('userId', userId)
    .select()
  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
  return data
}

//현재 재생목록이 없을 경우 추가
export const insertPersonalResult = async ({
  userId,
  musicList,
}: {
  userId: string
  musicList: string[]
}) => {
  console.log(userId, '유저 아이디')
  console.log(musicList, '음악목록')

  const { data, error } = await supabase
    .from('playlistCurrent')
    .insert([{ userId: userId, currentMusicIds: musicList }])
    .select()

  if (error) {
    throw new Error(error?.message || 'An unknown error occurred')
  }
  return data
}
