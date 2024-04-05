import GenreMusicList from "@/components/main/GenreMusicList";
import MainBanner from "@/components/main/MainBanner";
import TopLikedBoard from "@/components/main/TopLikedBoard";
import MusicPlayer from "@/components/player/MusicPlayer";
import React from "react";
import UserProvider from "./UserProvider";

const Home = () => {
  return (
    <>
      <UserProvider>
        <GenreMusicList />
        <MainBanner />
        <TopLikedBoard />
        <MusicPlayer />
      </UserProvider>
    </>
  );
};

export default Home;
