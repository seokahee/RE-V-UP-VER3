import MainBanner from "@/components/main/MainBanner";
import TopLikedBoard from "@/components/main/TopLikedBoard";
import React from "react";
import UserProvider from "./UserProvider";

const Home = () => {
  return (
    <>
      <UserProvider>
        <MainBanner />
        <TopLikedBoard />
      </UserProvider>
    </>
  );
};

export default Home;
