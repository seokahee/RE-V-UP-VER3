import { SignUp } from "@/types/types";
import { supabase } from "../supabase/supabase";

export const signUp = async ({ email, password }: SignUp) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert("회원가입이 완료되었습니다.");
  }
  return data;
};
