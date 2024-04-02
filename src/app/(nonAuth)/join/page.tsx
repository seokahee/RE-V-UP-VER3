"use client";

import { FormEvent, useRef } from "react";
import Link from "next/link";
import useInput from "@/hooks/useInput";
import { signUp } from "@/shared/join/joinApi";

const Join = () => {
  const joinState = {
    userEmail: "",
    userPw: "",
    userPwCheck: "",
    userNickname: "",
    checkAgree: false,
  };
  const {
    form: join,
    setForm: setJoin,
    onChange: onChangeHandler,
    reset,
  } = useInput(joinState);

  const checkboxRef = useRef(null);
  const { userEmail, userPw, userPwCheck, userNickname, checkAgree } = join;

  const validateCheckAgree = checkAgree;
  const validatePwLength = userPw.length < 6;
  const validatePassword = !(userPw === userPwCheck);
  const validateEmptyValue = !(userEmail || userPwCheck || userNickname);

  const onClickCheckboxHandler = () => {
    setJoin((prevForm) => ({ ...prevForm, checkAgree: !prevForm.checkAgree }));
  };

  const onJoinHandler = (e: FormEvent) => {
    e.preventDefault();
    if (validateEmptyValue) {
      alert("빈칸 없이 작성해 주세요.");
      return;
    }
    if (validatePassword) {
      alert("비밀번호를 다시 입력해주세요.");
      return;
    }
    if (validatePwLength) {
      alert("비밀번호는 최소 6글자 이상 작성해 주세요");
      return;
    }
    if (validateCheckAgree === false) {
      alert("약관 동의는 필수입니다");
      return;
    }
    signUp({ email: userEmail, password: userPw });
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
            value={userEmail}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input
            type="password"
            name="userPw"
            placeholder="비밀번호"
            value={userPw}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input
            type="password"
            name="userPwCheck"
            placeholder="비밀번호 확인"
            value={userPwCheck}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input
            type="text"
            name="userNickname"
            placeholder="닉네임"
            value={userNickname}
            onChange={onChangeHandler}
          />
        </div>
        <label
          htmlFor="checkAgree"
          className="flex gap-[14px]"
          onClick={onClickCheckboxHandler}
        >
          <div>
            <input
              type="checkbox"
              id="checkAgree"
              name="checkAgree"
              checked={checkAgree}
              ref={checkboxRef}
              onChange={() => {}}
            />
          </div>
          <span id="checkAgree">가입 약관 동의(필수)</span>
        </label>
        <div>
          <textarea name="" id="" cols={30} rows={10}></textarea>
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
