export type CommunityType = {
  boardId: string
  boardTitle: string
  date: string
  likeList: string[]
  userInfo: {
    nickname: string
    userImage: string
  }
  musicInfo: {
    thumbnail: string
  }
  comment: {
    commentId: string
  }
}
