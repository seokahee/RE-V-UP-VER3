import CommunityContents from '@/components/communityDetail/CommunityContents'
import loading from '@/../public/images/loadingBar.gif'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const DynamicCommunityContents = dynamic(
  () => import('@/components/communityDetail/CommunityContents'),
  {
    loading: () => (
      <div>
        <Image src={loading} width={50} height={50} alt='로딩바' />
      </div>
    ),
    ssr: false,
  },
)

const CommunityPage = () => {
  return <DynamicCommunityContents />
}

export default CommunityPage
