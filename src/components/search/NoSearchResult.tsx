'use client'
import { getMusicPreferenceData, getUserChar } from '@/shared/main/api'
import { useStore } from '@/shared/store'
import { useQuery } from '@tanstack/react-query'
import GenreMusicRecommendations from './GenreMusicRecommendations'
import GenreRandomMusic from './GenreRandomMusic'

const NoSearchResult = () => {
  const { userInfo } = useStore()

  const { data: userData } = useQuery({
    queryFn: () => getUserChar(userInfo.uid),
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
