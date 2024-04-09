import { supabase } from '../supabase/supabase'

export const readCommunityDetail = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, date, musicId, content, likeList, userId, userInfo(nickname, userImage), comment(commentId), musicInfo(musicId, musicTitle, artist, thumbnail)',
      )
      .eq('boardId', id)
    return data
  } catch (error) {
    console.error(error)
    return
  }
}
