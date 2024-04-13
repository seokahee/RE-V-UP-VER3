import Footer from '@/components/Footer'
import GenreMusicList from '@/components/main/GenreMusicList'
import MainBanner from '@/components/main/MainBanner'
import TopLikedBoard from '@/components/main/TopLikedBoard'
import PersonalModal from '@/components/personal/PersonalModal'
import UserReSessionProvider from './UserReSessionProvider'
import Container from '@/components/common/Container'

const Home = () => {
  return (
    <>
      <UserReSessionProvider>
        <Container>
          <PersonalModal />
          <GenreMusicList />
          <MainBanner />
          <TopLikedBoard />
          <Footer />
        </Container>
      </UserReSessionProvider>
    </>
  )
}

export default Home
