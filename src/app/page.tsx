import Footer from '@/components/Footer'
import GenreMusicList from '@/components/main/GenreMusicList'
import MainBanner from '@/components/main/MainBanner'
import TopLikedBoard from '@/components/main/TopLikedBoard'
import MusicPlayer from '@/components/player/MusicPlayer'

const Home = () => {
  return (
    <>
      <GenreMusicList />
      <MainBanner />
      <TopLikedBoard />
      <MusicPlayer />
      <Footer />
    </>
  )
}

export default Home
