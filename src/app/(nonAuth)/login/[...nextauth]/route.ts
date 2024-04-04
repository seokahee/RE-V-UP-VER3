import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/shared/supabase/supabase";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
        },
        password: {
          label: "비밀번호",
          type: "password",
        },
      },
      async authorize(credentials, _) {
        if (!credentials) {
          throw new Error("이메일과 비밀번호를 입력하세요.");
        }
        try {
          const { email, password } = credentials;
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            throw new Error("다시 로그인해주세요");
          }
          if (data) {
            return data.user;
          }
          if (!data) {
            throw new Error("해당 이메일이 없습니다.");
          }
        } catch (error) {
          throw new Error("다시 로그인 해주세요.");
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export default handler;
