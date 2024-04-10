export type MusicInfoType = {
  artist: string
  musicId: string
  musicSource: string
  musicTitle: string
  release: string
  thumbnail: string
}

export type CurrentPlaylistType = {
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

export type MusicListProps = {
  item: CurrentPlaylistType
  currentItems: CurrentPlaylistType[]
  checkedList: string[]
  isRandom: boolean
  onChangeCheckMusicHandler: (checked: boolean, id: string) => void
  onDeleteCurrentMusicHandler: () => void
  onInsertMyPlayListHandler: () => void
  onRandomMusicHandler: () => void
  setMusicIndex: (index: number) => void
}

export type PlayerProps = {
  currentItems: CurrentPlaylistType[]
  musicIndex: number
  onPreviousHandler: () => void
  onNextTrackHandler: () => void
}
