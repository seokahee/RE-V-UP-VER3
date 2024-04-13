import { getCurrentMusicData } from '@/shared/main/api'
import { getCurrentMusicList, getMyMusicList } from '@/shared/musicPlayer/api'
import { useQuery } from '@tanstack/react-query'

export const GET_MUSICLIST_QUERY_KEY = {
  GET_CURRENT_MUSICLIST: 'getCurrentMusicList',
  GET_MY_CURRENT_MUSICLIST: 'playListCurrent',
  GET_MY_MUSICLIST: 'getMyMusicList',
}

export const getMusicList = (uid: string) => {
  const { data: currentPlayList, isError } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCurrentMusicList(queryKey[1])
    },
    queryKey: ['getCurrentMusicList', uid],
  })

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: ['playListCurrent'],
    enabled: !!uid,
  })

  const { data: myPlayList } = useQuery({
    queryFn: ({ queryKey }) => {
      return getMyMusicList(queryKey[1])
    },
    queryKey: ['getMyMusicList', uid],
  })

  return { currentPlayList, playListCurrent, myPlayList, isError }
}
