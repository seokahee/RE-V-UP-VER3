import { supabase } from '../supabase/supabase'

export const getUserVisibilityData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('userInfo')
      .select(
        'userId, mbtiOpen, personalMusicOpen,playlistOpen, postsOpen,likedPostsOpen',
      )
      .eq('userId', userId)
      .single()
    if (error) {
      console.error(error)
      return
    }

    return data
  } catch (error) {
    console.error(error)
  }
}
