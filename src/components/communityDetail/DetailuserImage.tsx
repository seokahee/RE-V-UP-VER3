import Link from 'next/link'
import userDefault from '@/../public/images/userDefaultImg.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export type UserProps = {
  userId: string | undefined
  nickname: string | undefined
  userImage: string | null | undefined
}

const DetailuserImage = ({ userId, nickname, userImage }: UserProps) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string

  return (
    <section className='flex'>
      <Link
        href={`/userpage/${userId}`}
        className={`${uid === userId ? 'pointer-events-none' : 'cursor-pointer'}`}
      >
        <figure className='h-[56px] w-[56px] items-center rounded-full '>
          {userImage ? (
            <Image
              src={`${userImage}`}
              alt='유저 이미지'
              width={56}
              height={56}
              title={`${nickname}님의 페이지로 이동`}
              className='h-[56px] w-[56px] rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)] bg-[#2B2B2B]'
            />
          ) : (
            <Image
              src={userDefault}
              alt='유저 이미지'
              width={56}
              height={56}
              title={`${nickname}님의 페이지로 이동`}
              className='h-[56px] w-[56px] rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)] bg-[#2B2B2B]'
            />
          )}
        </figure>
      </Link>
    </section>
  )
}

export default DetailuserImage
