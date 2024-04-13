export type MusicInfoType = {
  artist: string
  musicId: string
  musicSource: string
  musicTitle: string
  release: string
  thumbnail: string
  runTime: string
}

export type CurrentPlayListType = {
  currentId: string
  currentMusicIds: string[]
  artist: string
  genre: number
  lyrics: string
  musicId: string
  musicSource: string
  musicTitle: string
  release: string
  thumbnail: string
  runTime: string
  userInfo: {
    userId: string
  }
}

export type MyPlayListType = {
  musicId: string
  myMusicIds: string[]
  playlistId: string
  userId: string
}

export type SearchResultType = {
  artist: string
  musicId: string
  musicSource: string
  musicTitle: string
  release: string
  thumbnail: string
  boardId: string
  boardTitle: string
  date: string
  likeList: string[]
  userInfo: {
    nickname: string
    userImage: string
  }
}

export type PlayerProps = {
  currentPlayList: CurrentPlayListType[]
  musicIndex: number
  onPreviousHandler: () => void
  onNextTrackHandler: () => void
}

export type MusicListProps = {
  currentPlayList: CurrentPlayListType[]
  checkedList: string[]
  isRandom: boolean
  onChangeCheckMusicHandler: (checked: boolean, id: string) => void
  onDeleteCurrentMusicHandler: () => void
  onInsertMyPlayListHandler: () => void
  onRandomMusicHandler: () => void
  setMusicIndex: (index: number) => void
}
