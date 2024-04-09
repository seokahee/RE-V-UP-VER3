import Footer from '@/components/Footer'
import GenreMusicList from '@/components/main/GenreMusicList'
import MainBanner from '@/components/main/MainBanner'
import TopLikedBoard from '@/components/main/TopLikedBoard'
import MusicPlayer from '@/components/player/MusicPlayer'
import UserProvider from './UserProvider'
import SearchHeader from '@/components/SearchHeader'

const Home = () => {
  return (
    <>
      <UserProvider>
        <SearchHeader />
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
