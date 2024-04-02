"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const Join = () => {
  const joinState = {
    userEmail: "",
    userPw: "",
    userPwCheck: "",
    userNickname: "",
  };
  const [join, setJoin] = useState(joinState);

  const validatePassword = !(join.userPw === join.userPwCheck);
  const validatePwLength = join.userPw.length < 6;
  const validateEmptyValue = !(
    join.userEmail ||
    join.userPwCheck ||
    join.userNickname
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setJoin((preForm) => ({ ...preForm, [name]: value }));
  };

  const onJoinHandler = () => {
    if (validateEmptyValue) {
      alert("빈칸 없이 작성해 주세요.");
    }
    if (validatePassword) {
      alert("비밀번호를 다시 입력해주세요.");
      return;
    }
    if (validatePwLength) {
      alert("비밀번호는 최소 6글자 이상 작성해 주세요");
      return;
    }
  };

  return (
    <div>
      <div>
        <h2>회원가입</h2>
      </div>
      <form>
        <div>
          <input
            type="email"
            name="userEmail"
            placeholder="이메일"
            value={join.userEmail}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input
            type="password"
            name="userPw"
            placeholder="비밀번호"
            value={join.userPw}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input
            type="password"
            name="userPwCheck"
            placeholder="비밀번호 확인"
            value={join.userPwCheck}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input
            type="text"
            name="userNickname"
            placeholder="닉네임"
            value={join.userNickname}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <button onClick={onJoinHandler}>다음</button>
        </div>
      </form>

      <div className="flex gap-[10px]">
        <p>이미 계정이 있으신가요?</p>
        <Link href={"/login"} className="font-bold">
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default Join;
