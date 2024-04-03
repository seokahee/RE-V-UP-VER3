import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/shared/supabase/supabase";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "아이디",
          type: "email",
        },
        password: {
          label: "비밀번호",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (credentials !== undefined) {
          try {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: credentials.email,
              password: credentials.password,
            });
            if (error) {
              throw new Error("다시 로그인해주세요");
            }
            if (data) {
              return data.user;
            }
            if (!data) {
              console.error("해당 이메일이 없습니다.");
              return null;
            }
          } catch (error) {
            console.error("다시 로그인 해주세요.");
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
