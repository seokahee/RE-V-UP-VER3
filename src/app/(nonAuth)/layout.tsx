"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/shared/store";
import { getUserUid } from "@/shared/login/loginApi";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { setUserInfo } = useStore();
  const { data: userEmail } = useSession();

  useEffect(() => {
    const saveStoreUserUid = async () => {
      if (userEmail && userEmail?.user?.email) {
        const data = await getUserUid(userEmail.user.email);
        if (data) {
          const userId = data.userId;
          setUserInfo(userId);
        }
      }
    };

    saveStoreUserUid();
  }, [userEmail]);

  return <div>{children}</div>;
};

export default AuthLayout;
