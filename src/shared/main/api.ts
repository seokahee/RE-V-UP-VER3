import type {
  Banner,
  GenreMusicInfo,
  MusicPreference,
  PlaylistCurrent,
  TopLikedBoard,
  UserChar,
} from '@/types/main/types'
import { supabase } from '../supabase/supabase'
import { genreMatch } from '@/util/main/util'

export const getBannerData = async (userId: string): Promise<Banner[]> => {
  try {
    const { data, error } = await supabase
      .from('advertisement')
      .select('adId, userId, imageUrl')
      .eq('userId', userId)
    console.log(data)
    return data as Banner[]
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getTopLikedBoardData = async (): Promise<TopLikedBoard[]> => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
  oneWeekAgo.setHours(0, 0, 0, 0)

  try {
    const { data, error } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, likeList, userId, userInfo(nickname, userImage), comment(commentId)',
      )
      .gte('date', oneWeekAgo.toISOString())
      .lte('date', currentDate.toISOString())
      .limit(6)

    return data as TopLikedBoard[]
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getGenreMusicData = async (
  genreCodes: number[],
): Promise<GenreMusicInfo[]> => {
  try {
    const { data } = await supabase
      .from('musicInfo')
      .select(
        'musicTitle, genre, artist, thumbnail, lyrics, release, musicId, musicSource',
      )
      .in('genre', genreCodes)
      .limit(10)

    return data as GenreMusicInfo[]
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getRandomMusicData = async (): Promise<GenreMusicInfo[]> => {
  try {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'
    const random = Math.floor(Math.random() * 10)
    const { data } = await supabase
      .from('musicInfo')
      .select(
        'musicTitle, genre, artist, thumbnail, lyrics, release, musicId, musicSource',
      )
      .like('musicSource', `%${alphabets[random]}%`)
      .limit(10)

    return data as GenreMusicInfo[]
  } catch (error) {
    console.error(error)
    return []
  }
}

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

export const getMusicPreferenceData = async (mbti: number) => {
  try {
    let { data, error } = await supabase
      .from('musicPreferences')
      .select('hiphop, dance, ballad, rnb, rock')
      .eq('mbti', mbti)
      .limit(1)
      .single()

    const entries = Object.entries(data as MusicPreference)
    entries.sort((a, b) => b[1] - a[1])
    const topArr = entries.slice(0, 3)

    const genreCodes = topArr.map((item) => genreMatch(item[0]))
    return genreCodes as number[]
  } catch (error) {
    return []
  }
}

export const getCurrentMusicData = async (
  userId: string,
): Promise<PlaylistCurrent[]> => {
  try {
    const { data } = await supabase
      .from('playlistCurrent')
      .select('currentId, userId, currentMusicIds')
      .eq('userId', userId)

    return data as PlaylistCurrent[]
  } catch (error) {
    console.error(error)
    return []
  }
}

export const insertCurrentMusic = async ({
  userId,
  musicId,
}: {
  userId: string
  musicId: string
}) => {
  try {
    await supabase
      .from('playlistCurrent')
      .insert([{ userId: userId, currentMusicIds: [musicId] }])
      .select()
  } catch (error) {
    console.error(error)
  }
}

export const updateCurrentMusic = async ({
  userId,
  currentList,
}: {
  userId: string
  currentList: string[]
}) => {
  try {
    await supabase
      .from('playlistCurrent')
      .update({ currentMusicIds: [...currentList] })
      .eq('userId', userId)
      .select()
  } catch (error) {
    console.error(error)
  }
}
