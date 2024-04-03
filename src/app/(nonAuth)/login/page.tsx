"use client";

import useInput from "@/hooks/useInput";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const LoginPage = () => {
  const router = useRouter();
  // const data = useSession();
  // console.log(data);
  const loginInfo = { email: "", password: "", checkStayLogin: false };
  const {
    form: userlogin,
    setForm: setUserlogin,
    onChange: onChangeHandler,
    reset,
  } = useInput(loginInfo);
  const { email, password, checkStayLogin } = userlogin;

  const onClickCheckboxHandler = () => {
    setUserlogin((prevForm) => ({
      ...prevForm,
      checkStayLogin: !prevForm.checkStayLogin,
    }));
  };

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
        <div>
          <label htmlFor="checkStayLogin" onClick={onClickCheckboxHandler}>
            <input
              type="checkbox"
              id="checkStayLogin"
              name="checkStayLogin"
              checked={checkStayLogin}
              onChange={() => {}}
            />
            <p id="checkStayLogin">로그인 유지</p>
          </label>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
