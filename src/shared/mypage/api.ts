import { PlaylistMy, UserInfo } from "@/types/mypage/types";
import { supabase } from "../supabase/supabase";
import { randomUUID } from "crypto";

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

export const getUserPlaylistMyMusicInfoData = async (myMusicIds: string[]): Promise<PlaylistMy[]> => {
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

export const updateNickname = async ({ userId, nickname }: { userId: string; nickname: string }) => {
  try {
    const { data, error } = await supabase.from("userInfo").update({ nickname }).eq("userId", userId).select();
  } catch (error) {
    console.error(error);
  }
};

export const uploadUserThumbnail = async ({ userId, file }: { userId: string; file: File }) => {
  try {
    const { data, error } = await supabase.storage.from("userThumbnail").upload(`${userId}/${file.name}`, file);

    if (error) {
      console.log("파일이 업로드 되지 않습니다.", error);
      return;
    }
    const { data: urlData } = await supabase.storage.from("userThumbnail").getPublicUrl(data.path);

    const { data: url, error: imageError } = await supabase.from("userInfo").update({ userImage: urlData.publicUrl }).eq("userId", userId).select("userImage");
    if (error) {
      console.error(imageError);
      return;
    }
    return url;
  } catch (error) {
    console.log(error);
  }
};
