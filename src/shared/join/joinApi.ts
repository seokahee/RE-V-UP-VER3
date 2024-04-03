import { SignUp } from "@/types/types";
import { supabase } from "../supabase/supabase";

export const signUp = async ({ email, password }: SignUp) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("unique")) {
      alert("이미 가입된 이메일입니다.");
    } else {
      console.error("가입 오류:", error.message);
      alert("가입 중 오류가 발생했습니다. 문의해주세요.");
    }
  } else {
    alert("회원가입이 완료되었습니다.");
  }
  return data;
};
