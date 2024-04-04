// app>api>auth>[...nextauth]>route.ts

import { supabase } from "@/shared/supabase/supabase";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "email-password-credential",
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
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("이메일과 비밀번호를 입력하세요.");
        }

        const { email, password } = credentials;
        const { data, error } = await supabase
          .from("userInfo")
          .select("userId, email, nickname, password")
          .eq("email", `${email}`)
          .single();

        // const uid = data && data.userId;

        if (data && credentials && data?.password !== password) {
          throw new Error("비밀번호가 다릅니다.");
        }

        if (data) {
          return {
            id: data.userId,
            email: data.email,
            nickname: data.nickname,
          };
        } else {
          throw new Error("해당 이메일이 없습니다.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
