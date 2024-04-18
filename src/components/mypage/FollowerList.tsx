import { getFollowDataFollower, updateFollow } from '@/shared/mypage/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'
import ButtonSecondary from '../../util/ButtonSecondary'
import Link from 'next/link'
import Image from 'next/image'

type FollowProps = {
  data: string[]
  myFollowing?: string[]
}

const FollowerList = ({ data, myFollowing }: FollowProps) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const queryClient = useQueryClient()

  const {
    data: followData,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getFollowDataFollower(uid),
    queryKey: ['follower'],
    enabled: !!uid,
  })

  const unFollowMutation = useMutation({
    mutationFn: updateFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follower'] })
      queryClient.invalidateQueries({ queryKey: ['mypage'] })
      queryClient.invalidateQueries({ queryKey: ['following'] })
    },
  })

  const onClickUnFollow = (userId: string, targetId: string) => {
    const newData = data.filter((item) => item !== targetId)
    const targetUserData = followData?.find(
      (item) => item.userId === targetId,
    )?.follower
    const newTargetData = targetUserData?.filter((item) => item !== userId)!

    unFollowMutation.mutate({
      userId,
      targetId,
      followingData: newData,
      newTargetData,
    })
  }

  const onClickFollow = (userId: string, targetId: string) => {
    const data = myFollowing ? myFollowing : []
    const newData = [...data, targetId]

    const newTargetData = followData?.find(
      (item) => item.userId === targetId,
    )?.follower!
    newTargetData?.push(userId)

    unFollowMutation.mutate({
      userId,
      targetId,
      followingData: newData,
      newTargetData,
    })
  }

  if (isError) {
    return '에러가 발생했습니다!'
  }

  if (isLoading) {
    return '데이터를 불러오는 중입니다.'
  }

  return (
    <ul className='list-none'>
      {followData?.map((item) => {
        return (
          <li key={item.userId} className='flex justify-between py-4'>
            <div className='flex items-center'>
              <figure className='flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full'>
                {item.userImage && (
                  <Image
                    src={item.userImage}
                    width={56}
                    height={56}
                    alt={`${item.nickname} 프로필 이미지`}
                  />
                )}
              </figure>
              <Link
                href={`/userpage/${item.userId}`}
                className='ml-4 text-[1.125rem]'
              >
                {item.nickname}
              </Link>
            </div>
            <>
              {myFollowing && !myFollowing.find((el) => el === item.userId) ? (
                <ButtonSecondary
                  onClick={() => onClickFollow(uid, item.userId)}
                >
                  팔로우
                </ButtonSecondary>
              ) : (
                <ButtonSecondary
                  onClick={() => onClickUnFollow(uid, item.userId)}
                >
                  취소
                </ButtonSecondary>
              )}
            </>
          </li>
        )
      })}
      {followData?.length === 0 && (
        <li className='text-center'>팔로워 리스트가 나타납니다.</li>
      )}
    </ul>
  )
}

export default FollowerList
