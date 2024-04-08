"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/shared/store";
import {
  getUserUid,
  getUserUidProviderUserInfo,
} from "@/shared/login/loginApi";
import {
  saveSignUpInProviderUserInfo,
  updateInProviderUserInfo,
} from "@/shared/join/joinApi";

type Props = {
  children?: React.ReactNode;
};
const UserProvider = ({ children }: Props) => {
  const { setUserInfo } = useStore();
  const { data: userSessionInfo } = useSession();

  useEffect(() => {
    const saveStoreUserUid = async () => {
      if (
        userSessionInfo &&
        userSessionInfo?.user?.email &&
        userSessionInfo.user.uid
      ) {
        const userData = await getUserUid(userSessionInfo.user.email);
        const providerUserData = await getUserUidProviderUserInfo(
          userSessionInfo.user.email
        );
        const { uid, name, email } = userSessionInfo.user;
        console.log("providerUserData==>", providerUserData);
        const password = "noPassword";
        const userType = 1;

        const googleUserData = {
          userId: uid,
          email,
          nickname: name,
          password,
          userType,
        };

        if (providerUserData) {
          if (providerUserData.userId.includes(uid)) {
            await updateInProviderUserInfo(googleUserData);
            setUserInfo(uid);
          } else {
            await saveSignUpInProviderUserInfo(googleUserData);
            setUserInfo(uid);
          }
        } else {
          await saveSignUpInProviderUserInfo(googleUserData);
          setUserInfo(uid);
        }

        if (userData) {
          const userId = userData.userId;
          setUserInfo(userId);
        }
      }
    };

    saveStoreUserUid();
  }, [userSessionInfo]);

  return <div>{children}</div>;
};

export default UserProvider;
