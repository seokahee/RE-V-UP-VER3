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
        <MusicPlayer>
          <GenreMusicList />
          <MainBanner />
          <TopLikedBoard />
          <Footer />
        </MusicPlayer>
      </UserProvider>
    </>
  )
}

export default Home
