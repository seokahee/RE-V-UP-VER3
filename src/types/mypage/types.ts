export type UserInfo = {
  userId: string
  email: string
  userType: number
  nickname: string
  following: string[]
  follower: string[]
  userChar?: {
    gender?: boolean
    age?: number
    mbti?: number
    resultSentence?: string
  }
  mbtiOpen: boolean
  personalMusicOpen: boolean
  playlistOpen: boolean
  postsOpen: boolean
  likedPostsOpen: boolean
  userImage: string
  personalMusic?: {
    resultSentence?: string
  }
  playlistMy?: {
    myMusicIds?: string[]
    playlistId?: string
  }[]
  playlistCurrent?: {
    currentMusicIds?: string[]
    currentId?: string
  }[]
}

export type PlaylistMy = {
  artist: string
  genre: number
  lyrics: string
  musicId: string
  musicSource: string
  musicTitle: string
  release: string
  thumbnail: string
  runTime: string
}

export type Board = {
  boardId: string
  boardTitle: string
  content: string
  date: string
  likeList: string[]
  musicId: string
  userId: string
  musicInfo: {
    thumbnail: string
    musicTitle: string
  }
  userInfo: {
    nickname: string
    userImage?: string
  }
  comment: {
    commentId: string
  }[]
}
