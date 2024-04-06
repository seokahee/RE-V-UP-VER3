import Footer from "@/components/Footer";
import GenreMusicList from "@/components/main/GenreMusicList";
import MainBanner from "@/components/main/MainBanner";
import TopLikedBoard from "@/components/main/TopLikedBoard";
import CurrentMusicPlayer from "@/components/player/CurrentMusicPlayer";
import UserProvider from "./UserProvider";

const Home = () => {
  return (
    <>
      <UserProvider>
        <GenreMusicList />
        <MainBanner />
        <TopLikedBoard />
        <CurrentMusicPlayer />
        <Footer />
      </UserProvider>
    </>
  );
};

export default Home;
