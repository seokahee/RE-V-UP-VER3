import { readCommunityDetail } from '@/shared/communitydetail/detailApi'
import { getCurrentMusicData } from '@/shared/main/api'
import { getMyMusicList } from '@/shared/musicPlayer/api'
import { useQuery } from '@tanstack/react-query'

export const COMMUNITY_DETAIL_QUERY_KEY = {
  COMMUNITY_DETAIL: 'CommunityDetail',
  PLAYLIST_CURRENT: 'playListCurrent',
  GET_MY_MUSICLIST: 'mypage',
}

export const musicDataInCommuDetail = (uid: string, currentBoardId: string) => {
  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: [COMMUNITY_DETAIL_QUERY_KEY.PLAYLIST_CURRENT],
    enabled: !!uid,
  })

  const { data: myPlayList } = useQuery({
    queryFn: ({ queryKey }) => {
      return getMyMusicList(queryKey[1])
    },
    queryKey: [COMMUNITY_DETAIL_QUERY_KEY.GET_MY_MUSICLIST, uid],
  })

  const {
    data: readDetailData,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => readCommunityDetail(currentBoardId.toString()),
    queryKey: [COMMUNITY_DETAIL_QUERY_KEY.COMMUNITY_DETAIL],
  })

  return {
    playListCurrent,
    myPlayList,
    readDetailData,
    isPending,
    isLoading,
    error,
  }
}
