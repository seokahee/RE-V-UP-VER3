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
  isLyrics: boolean
  currentPlayList: CurrentPlayListType[]
  musicIndex: number
  onPreviousHandler: () => void
  onNextTrackHandler: () => void
  onLyricsToggle: () => void
  onInsertMyPlayListHandler: () => void
}

export type MusicListProps = {
  isLyrics: boolean
  currentPlayList: CurrentPlayListType[]
  checkedList: string[]
  isRandom: boolean
  onChangeCheckMusicHandler: (checked: boolean, id: string) => void
  onDeleteCurrentMusicHandler: () => void
  onRandomMusicHandler: () => void
  setMusicIndex: (index: number) => void
}

/* Frame 593 */

// box-sizing: border-box;

// /* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 8px;
// gap: 8px;

// position: absolute;
// width: 48px;
// height: 48px;
// left: 24px;
// top: 454px;

// background: #292929;
// border: 2px solid rgba(0, 0, 0, 0.7);
// box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(255, 255, 255, 0.1), inset 0px -4px 4px rgba(255, 255, 255, 0.1), inset 0px 3px 1px rgba(255, 255, 255, 0.1), inset 0px 4px 4px rgba(255, 255, 255, 0.2);
// border-radius: 100px;
