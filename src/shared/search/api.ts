import { supabase } from '../supabase/supabase'

export const getSearchedMusicData = async (keyword: string) => {
  const { data } = await supabase
    .from('musicInfo')
    .select(
      'musicId, musicTitle, artist, lyrics ,thumbnail, release, musicSource,runTime',
    )
    .or(`musicTitle.ilike.%${keyword}%,artist.ilike.%${keyword}%`)
    .order('musicTitle', { ascending: false })
  return data
}

export const getSearchedCommunityData = async (keyword: string) => {
  const { data } = await supabase
    .from('community')
    .select(
      'boardId, boardTitle, likeList, date, userId, userInfo(nickname, userImage), musicInfo(thumbnail), comment(commentId)',
    )
    .ilike('boardTitle', `%${keyword}%`)
    .order('date', { ascending: false })
  return data
}
