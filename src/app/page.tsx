import Footer from '@/components/Footer'
import GenreMusicList from '@/components/main/GenreMusicList'
import MainBanner from '@/components/main/MainBanner'
import TopLikedBoard from '@/components/main/TopLikedBoard'
import UserProvider from './UserProvider'
import MusicPlayer from '@/components/player/MusicPlayer'

const Home = () => {
  return (
    <>
      <UserProvider>
        <GenreMusicList />
        <MainBanner />
        <TopLikedBoard />
        <MusicPlayer />
        <Footer />
      </UserProvider>
    </>
  )
}

export default Home
