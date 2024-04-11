import Footer from '@/components/Footer'
import GenreMusicList from '@/components/main/GenreMusicList'
import MainBanner from '@/components/main/MainBanner'
import TopLikedBoard from '@/components/main/TopLikedBoard'
import MusicPlayer from '@/components/player/MusicPlayer'
import PersonalModal from '@/components/personal/PersonalModal'

const Home = () => {
  return (
    <>
      <PersonalModal />
      <GenreMusicList />
      <MainBanner />
      <TopLikedBoard />
      <MusicPlayer />
      <Footer />
    </>
  )
}

export default Home
