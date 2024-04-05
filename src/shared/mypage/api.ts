import { UserInfo } from "@/types/mypage/types";
import { supabase } from "../supabase/supabase";

export const getUserData = async (userId: string): Promise<UserInfo> => {
  try {
    const { data, error } = await supabase
      .from("userInfo")
      .select("userId, email, userType, nickname, following, follower, userChar, mbtiOpen, personalMusicOpen, playlistOpen, postsOpen, likedPostsOpen, userImage")
      .eq("userId", userId)
      .limit(1)
      .single();
    console.log(data, "data");
    return data as UserInfo;
  } catch (error) {
    console.error(error);
    return {} as UserInfo;
  }
};
