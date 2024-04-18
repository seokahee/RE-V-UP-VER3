import { supabase } from '../supabase/supabase'

export const getCommunityList = async (isSort: boolean) => {
  try {
    const { data } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, likeList, date, userId, userInfo(nickname, userImage), musicInfo(thumbnail),comment(commentId)',
      )
      .order(isSort ? 'date' : 'likeList', { ascending: false })
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

// 페이지네이션에서 좋아요 리스트 기준 정렬을 해줘야함
