import {
  addCommnity,
  getLikeListCommunity,
  readCommuDetail,
  updateCommuity,
} from '@/types/communityDetail/detailTypes'
import { supabase } from '../supabase/supabase'

export const readCommunityDetail = async (boardId: string) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .select(
        'boardId, boardTitle, date, musicId, content, likeList, userId, userInfo(nickname, userImage, userId), comment(commentId), musicInfo(musicId, musicTitle, artist, thumbnail)',
      )
      .eq('boardId', boardId)
      .single()

    if (!data) {
      return {} as readCommuDetail
    }
    return data
  } catch (error) {
    console.error(error)
    return {} as readCommuDetail
  }
}

export const addCommnityBoard = async ({
  boardTitle,
  content,
  userId,
  musicId,
}: addCommnity) => {
  const { data, error } = await supabase
    .from('community')
    .insert([{ boardTitle, content, userId, musicId, likeList: [] }])
    .select()

  if (error) {
    console.log(error)
    throw new Error('내용을 저장하는 중에 오류가 생겼습니다. 문의해주세요.')
  }
}

export const updateCommnityBoard = async ({
  boardId,
  boardTitle,
  content,
}: updateCommuity) => {
  const { data, error } = await supabase
    .from('community')
    .update({ boardId, boardTitle, content })
    .eq('boardId', boardId)
    .select()

  if (error) {
    throw new Error('내용을 수정하는 중에 오류가 생겼습니다. 문의해주세요.')
  }
  return data
}

export const deleteCommunityBoard = async (boardId: string) => {
  const { error } = await supabase
    .from('community')
    .delete()
    .eq('boardId', boardId)

  if (error) {
    throw new Error('오류로 인해 삭제할 수 없습니다. 문의해주세요.')
  }
}

export const getClickLikedUser = async (
  boardId: string,
): Promise<getLikeListCommunity> => {
  const { data: clickLikedUser, error } = await supabase
    .from('community')
    .select('likeList')
    .eq('boardId', boardId)
    .single()

  if (error) {
    console.error('정보를 가져오지 못 하고 있습니다.', error)
    return {} as getLikeListCommunity
  }

  return clickLikedUser as getLikeListCommunity
}

export const addLikedUser = async (
  likeList: string[],
  boardId: string,
  uid: string,
) => {
  const { data, error } = await supabase
    .from('community')
    .update({ likeList: [...likeList, uid] })
    .eq('boardId', boardId)
    .select()

  if (error) {
    throw error
  }
}

export const removeLikedUser = async (
  likeList: string[],
  boardId: string,
  uid: string,
) => {
  const { data, error } = await supabase
    .from('community')
    .update({ likeList: likeList.filter((id) => id !== uid) })
    .eq('boardId', boardId)
    .select()

  if (error) {
    throw error
  }
}
