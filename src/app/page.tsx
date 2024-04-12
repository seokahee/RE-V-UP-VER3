import Footer from '@/components/Footer'
import GenreMusicList from '@/components/main/GenreMusicList'
import MainBanner from '@/components/main/MainBanner'
import TopLikedBoard from '@/components/main/TopLikedBoard'
import MusicPlayer from '@/components/player/MusicPlayer'
import UserReSessionProvider from './UserReSessionProvider'

const Home = () => {
  return (
    <>
      <UserReSessionProvider>
        <GenreMusicList />
        <MainBanner />
        <TopLikedBoard />
        <MusicPlayer />
        <Footer />
      </UserReSessionProvider>
    </>
  )
}

export default Home
