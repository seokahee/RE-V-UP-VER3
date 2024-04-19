import { getCurrentMusicData } from '@/shared/main/api'
import { getCurrentMusicList, getMyMusicList } from '@/shared/musicPlayer/api'
import { getUserMyPlaylistData } from '@/shared/mypage/api'
import { useQuery } from '@tanstack/react-query'

export const GET_MUSIC_LIST_QUERY_KEYS = {
  CURRENT_MUSIC_INFO: 'getCurrentMusicList',
  MY_CURRENT_MUSIC_LIST: 'playListCurrent',
  MY_MUSIC_LIST: 'getMyMusicList',
  MY_MUSIC_INFO: 'myMusicInfo',
}

export const getMusicList = (uid: string) => {
  const { data: currentPlayList, isError } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCurrentMusicList(queryKey[1])
    },
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.CURRENT_MUSIC_INFO, uid],
  })

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_CURRENT_MUSIC_LIST],
    enabled: !!uid,
  })

  const { data: myPlayList } = useQuery({
    queryFn: ({ queryKey }) => {
      return getMyMusicList(queryKey[1])
    },
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_LIST, uid],
  })

  const { data: playlistMyData } = useQuery({
    queryFn: () => getUserMyPlaylistData(uid),
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_INFO],
    enabled: !!uid,
  })

  return {
    currentPlayList,
    playListCurrent,
    myPlayList,
    playlistMyData,
    isError,
  }
}
