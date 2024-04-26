import {
  getCurrentMusics,
  getDislike,
  getPersonaledUser,
  getPreference,
  getRecommendMusic,
  recommendMusic,
} from '@/shared/personal/personalApi'
import { useQuery } from '@tanstack/react-query'
import { PERSONAL_QUERY_KEYS } from './keys.constant'
import { GET_MUSIC_LIST_QUERY_KEYS } from '../musicPlayer/musicPlayerQueryKeys'

export const usePreferenceDataQuery = (mbtiStatus: string) => {
  const { data: musicPreferenceData } = useQuery({
    queryFn: () => recommendMusic(mbtiStatus),
    queryKey: [PERSONAL_QUERY_KEYS.PERSONAL],
  })
  return musicPreferenceData as number[]
}

export const useRecommendDataQuery = (musicPreferenceData: number[]) => {
  const {
    data: recommend,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => getRecommendMusic(musicPreferenceData),
    queryKey: [PERSONAL_QUERY_KEYS.RECOMMEND_MUSIC],
  })

  return { recommend, isPending, isError }
}

export const usePersonalUserQuery = () => {
  const {
    data: personalUser,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => getPersonaledUser(),
    queryKey: [PERSONAL_QUERY_KEYS.PERSONAL_RESULT],
  })
  return { personalUser, isPending, isError }
}

export const useCurrentMusicQuery = (uidStatus: string) => {
  const { data: current, refetch: refetchCurrent } = useQuery({
    queryFn: () => getCurrentMusics(uidStatus),
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_CURRENT_MUSIC_LIST],
  })
  return { current, refetchCurrent }
}

export const usePreferenceQuery = (mbtiStatus: string) => {
  const { data: preference } = useQuery({
    queryFn: () => getPreference(mbtiStatus),
    queryKey: [PERSONAL_QUERY_KEYS.PREFERENCE],
  })
  return preference
}

export const useDisLikeQuery = (mbtiStatus: string) => {
  const { data: dislike } = useQuery({
    queryFn: () => getDislike(mbtiStatus),
    queryKey: [PERSONAL_QUERY_KEYS.DISLIKE],
  })
  return dislike
}
