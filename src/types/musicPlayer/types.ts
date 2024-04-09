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
