import { supabase } from "../supabase/supabase";

export const getCurrentMusicList = async (userId: string) => {
  const { data: currentMusic } = await supabase
    .from("playlistCurrent")
    .select("currentId,currentMusicIds,userInfo(userId)")
    .eq("userId", userId);

  if (currentMusic && currentMusic.length > 0) {
    const musicIds = currentMusic.map((item) => {
      return item.currentMusicIds;
    });
    if (musicIds && musicIds.length > 0) {
      const { data: musicInfo } = await supabase
        .from("musicInfo")
        .select("*")
        .in("musicId", musicIds)
        .order("musicTitle", { ascending: false });

      return musicInfo;
    }
  }
  return [];
};

export const getMyMusicList = async (userId: string) => {
  const { data: playlistMy } = await supabase
    .from("playlistMy")
    .select("myMusicIds")
    .eq("userId", userId);
  return playlistMy;
};

export const updateCurrentMusic = async ({
  uid,
  currentMusicData,
}: {
  uid: string;
  currentMusicData: string[];
}) => {
  const { error } = await supabase
    .from("playlistCurrent")
    .update({ currentMusicIds: currentMusicData })
    .eq("userId", uid);
  if (!error) {
    alert("재생 목록이 삭제되었습니다.");
  }
};

export const insertMyPlayMusic = async ({
  userId,
  musicId,
}: {
  userId: string;
  musicId: string[];
}) => {
  try {
    await supabase
      .from("playlistMy")
      .insert([{ userId: userId, myMusicIds: musicId }])
      .select();
  } catch (error) {
    console.error(error);
  }
};

export const updateMyPlayMusic = async ({
  userId,
  myMusicList,
}: {
  userId: string;
  myMusicList: any;
}) => {
  const { data: myPlayList } = await supabase
    .from("playlistMy")
    .update({ myMusicIds: myMusicList })
    .eq("userId", userId)
    .select();

  return myPlayList;
};
