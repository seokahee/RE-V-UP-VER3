"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Modal from "@/util/Modal";
import useInput from "@/hooks/useInput";
import { findUserPassword } from "@/shared/login/loginApi";
import findPwImg from "@/../public/images/findPassword.svg";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [spendEmail, setSpendEmail] = useState<string>("");
  const needLoginInfo = { email: "", password: "", checkStayLogin: false };

  const {
    form: userlogin,
    setForm: setUserlogin,
    onChange: onChangeHandler,
  } = useInput(needLoginInfo);
  const { email, password, checkStayLogin } = userlogin;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onClickCheckboxHandler = () => {
    setUserlogin((prevForm) => ({
      ...prevForm,
      checkStayLogin: !prevForm.checkStayLogin,
    }));
  };

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const signResult = await signIn("email-password-credential", {
        email: email,
        password: password,
        redirect: false,
      });

      if (signResult && signResult.ok === true) {
        alert(`V-UP에 오신 걸 환영합니다!`);
        router.push("/");
      }

      if (signResult && signResult.error) {
        alert(signResult.error);
      }
    } catch (error) {
      throw new Error("회원정보를 불러오지 못하고 있습니다.");
    }
  };

  const findPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (spendEmail) {
      const data = await findUserPassword(spendEmail);
      if (!data) {
        alert("존재하지 않는 정보입니다!");
      } else {
        alert("비밀번호를 복구하는 이메일을 보냈습니다!");
      }

      setSpendEmail("");
    }
  };

  const logOut = async () => {
    await signOut();
    localStorage.clear();

    const loginStatus = await getSession();
    if (loginStatus === null) {
      alert("로그아웃 되셨습니다.");
    }
  };

  if (status === "loading") {
    return <div>로딩주우우웅</div>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="text-black z-1500">
          <div>비밀번호 찾기 모달입니다</div>
          <input
            type="email"
            value={spendEmail}
            onChange={(e) => setSpendEmail(e.target.value)}
          />
          <button onClick={findPassword} className="cursor-pointer">
            비밀번호 찾기
          </button>
        </div>
      </Modal>
      <section className="absolute w-516 left-1/2 transform -translate-x-1/2 translate-y-auto bg-white bg-opacity-10 shadow-lg border border-gray-100 border-opacity-10 rounded-2xl">
        <div>
          <p>V-UP에 오신 걸 환영합니다</p>
        </div>
        <div>
          <form onSubmit={onLoginHandler} className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[16px]">
              <div>
                <label htmlFor="email" className="flex flex-col ">
                  <p className="text-white-30">이메일</p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    placeholder="이메일을 입력하세요"
                    className="flex items-center gap-2 w-320 bg-white bg-opacity-10 border-2 border-white border-opacity-10 shadow-md rounded-lg"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="password" className="flex flex-col ">
                  <p className="text-white-30">비밀번호</p>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    placeholder="비밀번호를 입력하세요"
                    className="flex items-center gap-2 w-320 bg-white bg-opacity-10 border-2 border-white border-opacity-10 shadow-md rounded-lg"
                  />
                </label>
              </div>
            </div>
            <div>
              <button type="submit">로그인</button>
            </div>
          </form>
        </div>
        <div className="flex w-full h-full gap-[8px] items-center justify-start">
          <label
            htmlFor="checkStayLogin"
            onClick={onClickCheckboxHandler}
            className="flex items-center justify-center gap-[8px]"
          >
            <input
              type="checkbox"
              id="checkStayLogin"
              name="checkStayLogin"
              checked={checkStayLogin}
              onChange={() => {}}
              className="w-[24px] h-[24px] bg-opacity-10 shadow-sm rounded-[4px]"
            />
            <span className="text-center text-[14px]">로그인 유지</span>
          </label>
        </div>
        <div>
          <div className="flex justify-center items-center mx-auto w-101 gap-[2px]">
            <button onClick={openModal} className="text-[14px] text-white-50">
              비밀번호 찾기
            </button>
            <Image
              src={findPwImg}
              width={20}
              height={20}
              alt="오른쪽방향화살표"
            ></Image>
          </div>
        </div>
        <div>
          <p>아직 회원이 아니신가요? </p>
          <Link href={"/join"}>
            <p>회원가입 하기</p>
          </Link>
        </div>
        <div>
          <button onClick={logOut}>로그아웃</button>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
