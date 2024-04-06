import type { UserChar } from "@/types/main/types";
import { supabase } from "../supabase/supabase";

//조회 - 지수님
export const getUserChar = async (
  userId: string
): Promise<UserChar | undefined> => {
  try {
    let { data, error } = await supabase
      .from("userInfo")
      .select("userChar")
      .eq("userId", userId)
      .limit(1)
      .single();
    if (error) {
      return {} as UserChar;
    }
    return data as UserChar | undefined;
  } catch (error) {
    return undefined;
  }
};

//userInfo에 userChar 넣는 값
export const addUserChar = async ({
  userId,
  personalUser,
}: {
  userId: string;
  personalUser: UserChar;
}) => {
  const { data, error } = await supabase
    .from("userInfo")
    .update({ userChar: personalUser })
    .eq("userId", userId)
    .select();
  if (error) {
    throw new Error(error?.message || "An unknown error occurred");
  }
};

//퍼스널 뮤직에 진단 결과 넣는 값

//퍼스널 뮤직에 진단 조회

//마이플레이리스트 , 현재 재생목록에 insert
export const insertCurrentMusic = async ({
  userId,
  musicId,
}: {
  userId: string;
  musicId: string;
}) => {
  try {
    await supabase
      .from("playlistCurrent")
      .insert([{ userId: userId, currentMusicIds: [musicId] }])
      .select();
  } catch (error) {
    console.error(error);
  }
};

export const updateCurrentMusic = async ({
  userId,
  currentList,
}: {
  userId: string;
  currentList: string[];
}) => {
  try {
    await supabase
      .from("playlistCurrent")
      .update({ currentMusicIds: [...currentList] })
      .eq("userId", userId)
      .select();
  } catch (error) {
    console.error(error);
  }
};

//mbti 선호도, 비선호도 조회하는 값

//음악 조회하는 값
