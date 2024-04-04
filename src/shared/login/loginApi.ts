import { SignUp } from "@/types/types";
import { supabase } from "../supabase/supabase";

export const getUserUid = async (email: string) => {
  const { data: user, error } = await supabase
    .from("userInfo")
    .select("*")
    .eq("email", email)
    .single();

  if (user) {
    console.log("User data:", user.userId);
  }
  if (error) {
    console.error("Error fetching user data:", error.message);
  }
  return user;
};

export const findUserPassword = async (loginEmail: string) => {
  let { data, error } = await supabase.auth.resetPasswordForEmail(loginEmail);
  console.log(data);
  if (!data || error) {
    alert("이메일을 다시 입력해주세요!");
  }

  return data;
};
