import { getUserAndPlaylistData, updateFollow } from '@/shared/mypage/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UserPlaylist from './UserPlaylist'
import { useSession } from 'next-auth/react'

const UserInfo = () => {
  const { id } = useParams<{ id: string }>()
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const queryClient = useQueryClient()

  const [isFollow, setIsFollow] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserAndPlaylistData(id),
    queryKey: ['userpage', id],
    enabled: !!id,
  })

  const { data: myInfo } = useQuery({
    queryFn: () => getUserAndPlaylistData(uid),
    queryKey: ['mypage', uid],
    enabled: !!uid,
  })

  const unFollowMutation = useMutation({
    mutationFn: updateFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userpage'] })
    },
  })

  const onClickUnFollow = () => {
    const newData = myInfo?.following.filter((item) => item !== id)!
    const newTargetData = data?.follower?.filter((item) => item !== uid)!

    unFollowMutation.mutate({
      userId: uid,
      targetId: id,
      followingData: newData,
      newTargetData,
    })
    setIsFollow(false)
  }

  const onClickFollow = () => {
    const newData = myInfo?.following?.slice()!
    newData.push(id)
    const newTargetData = data?.follower.slice()!
    newTargetData?.push(uid)

    unFollowMutation.mutate({
      userId: uid,
      targetId: id,
      followingData: newData,
      newTargetData,
    })
    setIsFollow(true)
  }

  useEffect(() => {
    if (data?.follower.find((id) => id === uid)) {
      setIsFollow(true)
    }
  }, [data])

  if (isError) {
    return <>에러발생</>
  }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <section>
      <div>
        <div className='flex justify-between'>
          <div>
            <figure className='w-[80px] h-[80px] flex overflow-hidden rounded-full bg-slate-200'>
              {data?.userImage && (
                <Image
                  src={data?.userImage}
                  width={80}
                  height={80}
                  alt={`${data?.nickname} 프로필 이미지`}
                  priority={true}
                />
              )}
            </figure>
          </div>
          <div>
            {isFollow ? (
              <button type='button' onClick={onClickUnFollow}>
                취소
              </button>
            ) : (
              <button type='button' onClick={onClickFollow}>
                팔로우
              </button>
            )}
          </div>
        </div>
        <p>{data?.nickname}</p>
        <p>
          팔로잉 {data?.following.length} 팔로워 {data?.follower.length}
        </p>
        <p>
          {data?.mbtiOpen ? data?.userChar?.mbti : ''}
          {data?.personalMusicOpen ? data?.personalMusic?.resultSentence : ' '}
        </p>
      </div>
      <UserPlaylist data={data!} isVisibility={data?.playlistOpen!} />
    </section>
  )
}

export default UserInfo
