"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/shared/store";
import { getUserUid } from "@/shared/login/loginApi";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userInfo, setUserInfo } = useStore();
  const { data: userEmail, status } = useSession();
  console.log("userEmail==>", userEmail);
  const router = useRouter();

  useEffect(() => {
    const saveStoreUserUid = async () => {
      if (userEmail && userEmail?.user?.email) {
        const data = await getUserUid(userEmail.user.email);
        if (data) {
          console.log(1);
          const userId = data.userId;
          setUserInfo(userId);
        }
      }
    };

    saveStoreUserUid();
  }, []);

  return <div>{children}</div>;
};

export default AuthLayout;
