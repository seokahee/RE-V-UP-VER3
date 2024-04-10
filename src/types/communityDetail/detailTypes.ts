export type readCommuDetail = {
  boardId?: string
  boardTitle?: string
  content?: string
  date?: string
  musicId?: string
  likeList: string[] | null
  userId?: string
  userInfo?: {
    nickname: string
    userImage: string | null
    userId: string
  }
  comment?: {
    commentId?: string
  }[]
  musicInfo?: {
    musicId?: string
    musicTitle?: string
    artist?: string
    thumbnail?: string
  }
}

export type UserInfo = {
  nickname?: string
  userImage?: string | null
  userId?: string
}

export type CommentType = {
  commentId?: string
}

export type MusicInfoType = {
  musicId?: string
  musicTitle?: string
  artist?: string
  thumbnail?: string
}
export type readCommuDetailDataType = {
  boardId?: string
  boardTitle?: string
  content?: string
  date?: string
  musicId?: string
  likeList: string[] | null
  userId?: string
  userInfo?: UserInfo
  comment?: CommentType
  musicInfo?: MusicInfoType
}

export type addCommnity = {
  boardTitle?: string
  content: string
  musicId: string
  userId: string
}

export type updateCommuity = {
  boardId: string
  boardTitle: string
  content: string
}
