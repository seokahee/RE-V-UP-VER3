import { TopLikedBoard } from "@/types/types";
import { supabase } from "../supabase/supabase";

export const getTopLikedBoardData = async (): Promise<TopLikedBoard[]> => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  oneWeekAgo.setHours(0, 0, 0, 0);

  try {
    const { data, error } = await supabase
      .from("community")
      .select("boardId, boardTitle, likeList, userId, userInfo(nickname, userImage), comment(commentId)")
      .gte("date", oneWeekAgo.toISOString())
      .lte("date", currentDate.toISOString())
      .limit(6);

    return data as TopLikedBoard[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
