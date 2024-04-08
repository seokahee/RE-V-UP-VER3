import { supabase } from "../supabase/supabase";

export const getCurrentMusicList = async (uid: string) => {
  const { data: currentMusic } = await supabase
    .from("playlistCurrent")
    .select("currentId,currentMusicIds,userInfo(userId)")
    .eq("userId", uid);

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
