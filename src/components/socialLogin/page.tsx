"use client";

import React from "react";
import Image from "next/image";
import googleImg from "@/../public/images/google.svg";
import kakaoImg from "@/../public/images/kakao.svg";

const SocialLogin = () => {
  const onGoogleLoginHandler = () => {};
  const onKakadoLoginHandler = () => {};

  return (
    <div className="flex justify-center">
      <div className="flex gap-[40px]">
        <button onClick={onGoogleLoginHandler}>
          <Image
            src={googleImg}
            width={40}
            height={40}
            alt="구글로그인"
          ></Image>
        </button>
        <button onClick={onKakadoLoginHandler}>
          <Image
            src={kakaoImg}
            width={40}
            height={40}
            alt="카카오로그인"
          ></Image>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
