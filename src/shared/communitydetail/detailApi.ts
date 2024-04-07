import { readCommuDetail } from "@/types/communityDetail/detailTypes";
import { supabase } from "../supabase/supabase";

export const readCommunityDetail = async (): Promise<readCommuDetail[]> => {
  try {
    const { data, error } = await supabase
      .from("community")
      .select(
        "boardId, boardTitle, date, musicId, content, likeList, userId, userInfo(nickname, userImage), comment(commentId)"
      );
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
