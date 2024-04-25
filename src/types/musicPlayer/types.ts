import { Dispatch, SetStateAction } from 'react'

export type MusicInfoType = {
  artist: string
  musicId: string
  musicSource: string
  musicTitle: string
  release: string
  thumbnail: string
  runTime: string
  lyrics: string
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

export type currentMusicIdType = {
  currentId?: string
  currentMusicIds?: {
    id: string
    idx: number
  }
  userId?: string
}

export type PlayerProps = {
  currentPlaying: CurrentPlayListType | null
  isLyrics: boolean
  currentPlayList: CurrentPlayListType[]
  musicIndex: number
  isRandom: boolean
  setCurrentPlaying: Dispatch<SetStateAction<CurrentPlayListType | null>>
  onPreviousHandler: () => void
  onNextTrackHandler: () => void
  onLyricsToggle: () => void
  onInsertMyPlayListHandler: () => void
  onRandomMusicHandler: () => void
}

export type MusicListProps = {
  currentPlaying: CurrentPlayListType | null
  isLyrics: boolean
  checkedList: string[]
  currentPlayList: CurrentPlayListType[]
  selectAll: boolean
  setSelectAll: Dispatch<SetStateAction<boolean>>
  setCheckedList: (value: string[]) => void
  setCurrentPlaying: Dispatch<SetStateAction<CurrentPlayListType | null>>
  onChangeCheckMusicHandler: (checked: boolean, id: string) => void
  onDeleteCurrentMusicHandler: () => void
  setMusicIndex: (index: number) => void
}
