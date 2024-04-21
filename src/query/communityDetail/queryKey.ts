import { getComments } from '@/shared/comment/commentApi'
import { readCommunityDetail } from '@/shared/communitydetail/detailApi'
import { getCurrentMusicData } from '@/shared/main/api'
import { getMyMusicList } from '@/shared/musicPlayer/api'
import { useQuery } from '@tanstack/react-query'
import { GET_USER_INFO } from '../user/userQueryKeys'
import { GET_MUSIC_LIST_QUERY_KEYS } from '../musicPlayer/musicPlayerQueryKeys'

export const GET_COMMUNITY_DETAIL_QUERY_KEYS = {
  COMMUNITY_DETAIL: 'CommunityDetail',
  COMMUNITY_COMMENTS: 'comment',
}

export const musicDataInCommuDetail = (uid: string, currentBoardId: string) => {
  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_CURRENT_MUSIC_LIST],
    enabled: !!uid,
  })

  const { data: myPlayList } = useQuery({
    queryFn: ({ queryKey }) => {
      return getMyMusicList(queryKey[1])
    },
    queryKey: [GET_USER_INFO.MYPAGE, uid],
  })

  const {
    data: readDetailData,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => readCommunityDetail(currentBoardId.toString()),
    queryKey: [GET_COMMUNITY_DETAIL_QUERY_KEYS.COMMUNITY_DETAIL],
  })

  const { data: commentsData } = useQuery({
    queryFn: () => getComments(currentBoardId),
    queryKey: [GET_COMMUNITY_DETAIL_QUERY_KEYS.COMMUNITY_COMMENTS],
  })

  return {
    playListCurrent,
    myPlayList,
    readDetailData,
    isPending,
    isLoading,
    error,
    commentsData,
  }
}
