import Footer from '@/components/Footer'
import GenreMusicList from '@/components/main/GenreMusicList'
import MainBanner from '@/components/main/MainBanner'
import TopLikedBoard from '@/components/main/TopLikedBoard'
import PersonalModal from '@/components/personal/PersonalModal'
import UserReSessionProvider from './UserReSessionProvider'

const Home = () => {
  return (
    <>
      <UserReSessionProvider>
        <PersonalModal />
        <GenreMusicList />
        <MainBanner />
        <TopLikedBoard />
        <Footer />
      </UserReSessionProvider>
    </>
  )
}

export default Home
