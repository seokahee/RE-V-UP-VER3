"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/shared/store";
import { getUserUid } from "@/shared/login/loginApi";

type Props = {
  children?: React.ReactNode;
};
const UserProvider = ({ children }: Props) => {
  const { setUserInfo } = useStore();
  const { data: userSessionInfo } = useSession();

  useEffect(() => {
    const saveStoreUserUid = async () => {
      if (userSessionInfo && userSessionInfo?.user?.email) {
        const data = await getUserUid(userSessionInfo.user.email);

        if (data) {
          const userId = data.userId;
          setUserInfo(userId);
        }
      }
    };

    saveStoreUserUid();
  }, [userSessionInfo]);

  return <div>{children}</div>;
};

export default UserProvider;
