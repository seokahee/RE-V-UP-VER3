"use client";

import useInput from "@/hooks/useInput";
import React from "react";

const LoginPage = () => {
  const loginInfo = { email: "", password: "" };
  const {
    form: userlogin,
    setForm: setUserlogin,
    onChange: onChangeHandler,
    reset,
  } = useInput(loginInfo);

  return (
    <div>
      <section>
        <div>
          <p>로그인</p>
        </div>
        <form>
          <div>
            <input
              type="email"
              onChange={onChangeHandler}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={onChangeHandler}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div>
            <button>로그인</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
