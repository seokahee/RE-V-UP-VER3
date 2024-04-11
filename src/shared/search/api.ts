import { supabase } from '../supabase/supabase'

export const getSearchedMusicData = async (
  keyword: string,
  selectedTabs: string,
) => {
<<<<<<< HEAD
  if (selectedTabs === 'musicInfo') {
    const { data } = await supabase
      .from('musicInfo')
      .select('musicId, musicTitle, artist, thumbnail, release, musicSource')
      .or(`musicTitle.like.%${keyword}%,artist.like.%${keyword}%`)
      .order('musicTitle', { ascending: false })
    return data
  }
=======
  const { data } = await supabase
    .from('musicInfo')
    .select('musicId, musicTitle, artist, thumbnail, release, musicSource')
    .or(`musicTitle.like.%${keyword}%,artist.like.%${keyword}%`)
    .order('musicTitle', { ascending: false })
  return data
>>>>>>> 74e444fc08bf58b1a4f772bbc5f67ac123594eb2
}

export const getSearchedCommunityData = async (
  keyword: string,
  selectedTabs: string,
) => {
<<<<<<< HEAD
  if (selectedTabs === 'community') {
    const { data } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, likeList, date, userId, userInfo(nickname, userImage), musicInfo(thumbnail)',
      )
      .like('boardTitle', `%${keyword}%`)
      .order('date', { ascending: false })
    return data
  }
=======
  const { data } = await supabase
    .from('community')
    .select(
      'boardId, boardTitle, likeList, date, userId, userInfo(nickname, userImage), musicInfo(thumbnail)',
    )
    .like('boardTitle', `%${keyword}%`)
    .order('date', { ascending: false })
  return data
>>>>>>> 74e444fc08bf58b1a4f772bbc5f67ac123594eb2
}

export const modalMusicSearchData = async (keyword: string) => {
  const { data } = await supabase
    .from('musicInfo')
    .select('musicId, musicTitle, artist, thumbnail, release, musicSource')
    .or(`musicTitle.like.%${keyword}%,artist.like.%${keyword}%`)
    .order('musicTitle', { ascending: false })
  return data
}
