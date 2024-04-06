import GenreMusicList from "@/components/main/GenreMusicList";
import MainBanner from "@/components/main/MainBanner";
import TopLikedBoard from "@/components/main/TopLikedBoard";
import MusicPlayer from "@/components/player/MusicPlayer";
import React from "react";
import UserProvider from "./UserProvider";
import PersonalModal from "@/components/personal/PersonalModal";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <UserProvider>
        <PersonalModal />
        <GenreMusicList />
        <MainBanner />
        <TopLikedBoard />
        <MusicPlayer />
        <Footer />
      </UserProvider>
    </>
  );
};

export default Home;
