'use client'
import { getMusicPreferenceData, getUserChar } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import GenreMusicRecommendations from './GenreMusicRecommendations'
import GenreRandomMusic from './GenreRandomMusic'

const NoSearchResult = () => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user.uid as string

  const { data: userData } = useQuery({
    queryFn: () => getUserChar(uid),
    queryKey: ['userChar'],
  })

  const { data: musicPreferenceData } = useQuery({
    queryFn: () => getMusicPreferenceData(userData?.userChar.mbti as number),
    queryKey: ['userMusicPreference', userData],
    enabled: typeof userData?.userChar?.mbti === 'number',
  })

  return (
    <div className='flex h-[440px] w-[732px] flex-col'>
      {musicPreferenceData ? (
        <GenreMusicRecommendations musicPreferenceData={musicPreferenceData} />
      ) : (
        <GenreRandomMusic />
      )}
    </div>
  )
}

export default NoSearchResult
