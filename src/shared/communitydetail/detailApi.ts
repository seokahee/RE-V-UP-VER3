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
      .single()

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
    throw new Error('내용을 저장하는 중에 오류가 생겼습니다. 문의해주세요.')
  }
  return data
}

export const updateCommnityBoard = async (
  boardId: string | string[],
  boardTitle: string,
  content: string,
) => {
  const { data, error } = await supabase
    .from('community')
    .update({ boardTitle, content })
    .eq('boardId', boardId)
    .select()

  if (error) {
    throw new Error('내용을 수정하는 중에 오류가 생겼습니다. 문의해주세요.')
  }
}

export const deleteCommunityBoard = async (boardId: string | string[]) => {
  const { error } = await supabase
    .from('community')
    .delete()
    .eq('boardId', boardId)

  if (error) {
    throw new Error('오류로 인해 삭제할 수 없습니다. 문의해주세요.')
  }
}
