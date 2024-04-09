import { readCommuDetail } from '@/types/communityDetail/detailTypes'
import { supabase } from '../supabase/supabase'

export const readCommunityDetail = async (boardId: string) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, date, musicId, content, likeList, userId, userInfo(nickname, userImage), comment(commentId), musicInfo(musicId, musicTitle, artist, thumbnail)',
      )
      .eq('boardId', boardId)

    if (!data) {
      return null
    }
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const addCommnityBoard = async (
  boardTitle: string,
  content: string,
  uid: string,
  musicId: string,
) => {
  const { data, error } = await supabase
    .from('community')
    .insert([{ boardTitle, content, userId: uid, musicId }])
    .select()

  if (error) {
    return
  }
  return data
}
