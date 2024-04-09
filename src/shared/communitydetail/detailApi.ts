import {
  addCommnityBoard,
  readCommuDetail,
} from '@/types/communityDetail/detailTypes'
import { supabase } from '../supabase/supabase'

export const readCommunityDetail = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, date, musicId, content, likeList, userId, userInfo(nickname, userImage), comment(commentId), musicInfo(musicId, musicTitle, artist, thumbnail)',
      )
      .eq('boardId', id)

    if (!data) {
      return null
    }
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const addCommnityBoard = async ({
  boardTitle,
  content,
  musicId,
}: addCommnityBoard) => {
  const { data, error } = await supabase
    .from('community')
    .insert([{ boardTitle, content, musicId }])
    .select()
}
