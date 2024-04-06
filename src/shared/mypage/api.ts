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

    return data as UserInfo;
  } catch (error) {
    console.error(error);
    return {} as UserInfo;
  }
};

export const getUserPlaylistMyData = async (myMusicIds: string[]): Promise<PlaylistMy[]> => {
  try {
    const { data, error } = await supabase.from("musicInfo").select("*").in("musicId", myMusicIds);

    return data as PlaylistMy[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateMyMusicIds = async ({ userId, myMusicIds }: { userId: string; myMusicIds: string[] }) => {
  try {
    const { data, error } = await supabase
      .from("playlistMy")
      .update({ myMusicIds: [...myMusicIds] })
      .eq("userId", userId)
      .select();
  } catch (error) {
    console.error(error);
  }
};
