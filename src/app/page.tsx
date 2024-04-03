import MainBanner from "@/components/main/MainBanner";
import TopLikedBoard from "@/components/main/TopLikedBoard";
import React from "react";

const Home = () => {
  return (
    <h1>
      <MainBanner />
      <TopLikedBoard />
    </h1>
  );
};

export default Home;
