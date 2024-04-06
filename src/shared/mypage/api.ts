import { PlaylistMy, UserInfo } from "@/types/mypage/types";
import { supabase } from "../supabase/supabase";

export const getUserAndPlaylistData = async (userId: string): Promise<UserInfo> => {
  try {
    const { data, error } = await supabase
      .from("userInfo")
      .select(
        "userId, email, userType, nickname, following, follower, userChar, mbtiOpen, personalMusicOpen, playlistOpen, postsOpen, likedPostsOpen, userImage, personalMusic(resultSentence), playlistMy(myMusicIds, playlistId)"
      )
      .eq("userId", userId)
      .limit(1)
      .single();

    if (data?.playlistMy.length === 0) {
      const newData = { userId, myMusicIds: [] };
      const { error: insertError } = await supabase.from("playlistMy").insert(newData);

      if (insertError) {
        console.error("Error inserting data:", insertError.message);
      }
    }
    console.log(data, "data");
    return data as UserInfo;
  } catch (error) {
    console.error(error);
    return {} as UserInfo;
  }
};

export const getUserPlaylistMyData = async (myMusicIds: string[]): Promise<PlaylistMy[]> => {
  try {
    const { data, error } = await supabase.from("musicInfo").select("*").in("musicId", myMusicIds);

    console.log(data, "data");
    return data as PlaylistMy[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
