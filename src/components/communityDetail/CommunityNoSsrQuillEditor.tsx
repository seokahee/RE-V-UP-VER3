import dynamic from 'next/dynamic'
import Image from 'next/image'
import loading from '@/../public/images/loadingBar.gif'

export const CommunityNoSsrQuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import('./CommunityQuillEditor')
    const comp = ({ forwardedRef, ...props }: any) => {
      return <RQ ref={forwardedRef} {...props} />
    }
    return comp
  },
  {
    ssr: false,
    loading: () => {
      return (
        <div>
          <Image src={loading} width={50} height={50} alt='로딩바' />
        </div>
      )
    },
  },
)
