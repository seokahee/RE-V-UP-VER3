import GenreMusicList from "@/components/main/GenreMusicList";
import MainBanner from "@/components/main/MainBanner";
import TopLikedBoard from "@/components/main/TopLikedBoard";
import MusicPlayer from "@/components/player/MusicPlayer";
import React from "react";

const Home = () => {
  return (
    <>
      <GenreMusicList />
      <MainBanner />
      <TopLikedBoard />
      <MusicPlayer />
    </>
  );
};

export default Home;
