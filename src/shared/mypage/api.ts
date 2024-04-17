import type { Board, PlaylistMy, UserInfo } from '@/types/mypage/types'
import { supabase } from '../supabase/supabase'

export const getUserAndPlaylistData = async (
  userId: string,
): Promise<UserInfo> => {
  try {
    const { data, error } = await supabase
      .from('userInfo')
      .select(
        'userId, email, userType, nickname, following, follower, userChar, mbtiOpen, personalMusicOpen, playlistOpen, postsOpen, likedPostsOpen, userImage, personalMusic(resultSentence)',
      )
      .eq('userId', userId)
      .limit(1)
      .single()

    return data as UserInfo
  } catch (error) {
    console.error(error)
    return {} as UserInfo
  }
}

export const getUserPlaylistMyMusicInfoData = async (
  myMusicIds: string[],
): Promise<PlaylistMy[]> => {
  try {
    console.log('music', myMusicIds)

    const { data, error } = await supabase
      .from('musicInfo')
      .select('*')
      .in('musicId', myMusicIds)

    console.log(data)

    return data as PlaylistMy[]
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getMyMusicCount = async (
  myMusicIds: string[],
): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('musicInfo')
      .select('*')
      .in('musicId', myMusicIds)

    if (error) {
      console.error(error)
      return 0
    }

    return data?.length
  } catch (error) {
    console.error(error)
    return 0
  }
}

export const getUserMyPlaylistData = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('playlistMy')
      .select('myMusicIds')
      .eq('userId', userId)
      .single()

    if (!data) {
      const newData = { userId, myMusicIds: [] }
      const { error: insertError } = await supabase
        .from('playlistMy')
        .insert(newData)

      if (insertError) {
        console.error('Error inserting data:', insertError.message)
      }
    }

    if (data?.myMusicIds && data.myMusicIds.length > 0) {
      const { data: myPlaylistData, error } = await supabase
        .from('musicInfo')
        .select('*')
        .in('musicId', data.myMusicIds)
      console.log([data, myPlaylistData])
      return { playlistMyIds: data.myMusicIds, myPlaylistData: myPlaylistData }
    }

    return { playlistMyIds: [], myPlaylistData: [] }
  } catch (error) {
    console.log(error)
  }
}

export const updateMyMusicIds = async ({
  userId,
  myMusicIds,
}: {
  userId: string
  myMusicIds: string[]
}) => {
  try {
    const { data, error } = await supabase
      .from('playlistMy')
      .update({ myMusicIds: [...myMusicIds] })
      .eq('userId', userId)
      .select()

    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateUserInfo = async ({
  userId,
  nickname,
  likedPostsOpen,
  mbtiOpen,
  personalMusicOpen,
  playlistOpen,
  postsOpen,
}: {
  userId: string
  nickname: string
  likedPostsOpen: boolean
  mbtiOpen: boolean
  personalMusicOpen: boolean
  playlistOpen: boolean
  postsOpen: boolean
}) => {
  try {
    const { data, error } = await supabase
      .from('userInfo')
      .update({
        nickname,
        likedPostsOpen,
        mbtiOpen,
        personalMusicOpen,
        playlistOpen,
        postsOpen,
      })
      .eq('userId', userId)
      .select()
  } catch (error) {
    console.error(error)
  }
}

export const uploadUserThumbnail = async ({
  userId,
  file,
}: {
  userId: string
  file: File
}) => {
  try {
    const fileName = crypto.randomUUID()
    const { data, error } = await supabase.storage
      .from('userThumbnail')
      .upload(`${userId}/${fileName}`, file)

    if (error) {
      console.log('파일이 업로드 되지 않습니다.', error)
      return
    }
    const { data: urlData } = await supabase.storage
      .from('userThumbnail')
      .getPublicUrl(data.path)

    const { data: url, error: imageError } = await supabase
      .from('userInfo')
      .update({ userImage: urlData.publicUrl })
      .eq('userId', userId)
      .select('userImage')
    if (error) {
      console.error(imageError)
      return
    }
    return url
  } catch (error) {
    console.log(error)
  }
}

export const getMyWriteListData = async (
  userId: string,
  start: number,
  end: number,
): Promise<Board[]> => {
  try {
    const { data, error } = await supabase
      .from('community')
      .select(
        '*, musicInfo(thumbnail, musicTitle), userInfo(nickname, userImage), comment(commentId)',
      )
      .eq('userId', userId)
      .range(start, end)

    if (error) {
      console.error(error)
      return []
    }

    return data as Board[]
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getMyWriteListCount = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('community')
      .select('boardId')
      .eq('userId', userId)

    if (error) {
      console.error(error)
      return 0
    }

    return data?.length
  } catch (error) {
    console.log(error)
    return 0
  }
}

export const getFollowData = async (ids: string[]) => {
  try {
    const { data, error } = await supabase
      .from('userInfo')
      .select('userId, nickname, userImage,following, follower')
      .in('userId', ids)
    if (error) {
      console.error(error)
      return
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getFollowDataFollowing = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('userInfo')
      .select('following')
      .eq('userId', userId)
      .limit(1)
      .single()

    const followingIds = data?.following ? data?.following : []

    const { data: followingData, error } = await supabase
      .from('userInfo')
      .select('userId, nickname, userImage,following, follower')
      .in('userId', followingIds)
    if (error) {
      console.error(error)
      return []
    }

    return followingData
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getFollowDataFollower = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('userInfo')
      .select('follower')
      .eq('userId', userId)
      .limit(1)
      .single()

    const followerIds = data?.follower ? data?.follower : []

    const { data: followerData } = await supabase
      .from('userInfo')
      .select('userId, nickname, userImage,following, follower')
      .in('userId', followerIds)
    if (error) {
      console.error(error)
      return
    }

    return followerData
  } catch (error) {
    console.log(error)
  }
}

export const updateFollow = async ({
  userId,
  targetId,
  followingData,
  newTargetData,
}: {
  userId: string
  targetId: string
  followingData: string[]
  newTargetData: string[]
}) => {
  try {
    const { data, error: followingError } = await supabase
      .from('userInfo')
      .update({ following: [...followingData] })
      .eq('userId', userId)
      .select('userId, nickname, userImage,following, follower')

    const { error: followerError } = await supabase
      .from('userInfo')
      .update({ follower: [...newTargetData] })
      .eq('userId', targetId)
  } catch (error) {
    console.error(error)
  }

  return
}

export const getLikeBoardData = async (
  userId: string,
  start: number,
  end: number,
): Promise<Board[]> => {
  try {
    const { data, error } = await supabase
      .from('community')
      .select(
        '*, musicInfo(thumbnail, musicTitle), userInfo(nickname, userImage), comment(commentId)',
      )
      .contains('likeList', [userId])
      .range(start, end)
    if (error) {
      console.error(error)
      return []
    }

    return data as Board[]
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getLikeBoardCount = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('community')
      .select('boardId')
      .contains('likeList', [userId])

    if (error) {
      console.error(error)
      return 0
    }

    return data?.length
  } catch (error) {
    console.log(error)
    return 0
  }
}
