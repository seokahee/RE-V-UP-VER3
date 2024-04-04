// app>api>auth>[...nextauth]>route.ts

import { supabase } from "@/shared/supabase/supabase";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.status(200).json({ user: session.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

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
          .select("userId, email, nickname")
          .eq("email", `${email}`)
          .single();
        console.log(data);

        if (data) {
          // 반환하는 객체의 형식을 User 형식으로 변경
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
