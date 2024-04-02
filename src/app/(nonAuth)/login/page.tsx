"use client";

import useInput from "@/hooks/useInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const LoginPage = () => {
  const router = useRouter();
  const loginInfo = { email: "", password: "" };
  const {
    form: userlogin,
    setForm: setUserlogin,
    onChange: onChangeHandler,
    reset,
  } = useInput(loginInfo);
  const { email, password } = userlogin;

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((result) => {
      console.log(result);
      if (result?.ok) {
        router.push("/");
      }
      if (result?.error) {
        console.error("로그인 에러입니다.");
      }
    });
  };

  return (
    <div>
      <section>
        <div>
          <p>로그인</p>
        </div>
        <form onSubmit={onLoginHandler}>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeHandler}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChangeHandler}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div>
            <button type="submit">로그인</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
