import { supabase } from '../supabase/supabase'

export const getCommunityList = async (isSort: boolean) => {
  try {
    const { data } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, likeList, date, userId, userInfo(nickname, userImage), musicInfo(thumbnail),comment(commentId)',
      )
      .order(isSort ? 'date' : 'likeCount', { ascending: false })
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
