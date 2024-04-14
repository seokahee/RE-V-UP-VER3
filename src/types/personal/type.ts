export type personalMusicTest = {
  personalMusicId: string
  resultSentence: string
  result: string[]
}

export type PersonalInfo = {
  gender: string
  mbti: string
}

export type PersonalGender = {
  gender: string
}

export type PersonalRecommendProps = {
  userChar: {
    gender: string
    mbti: string
    uid: string
  }
}

export type ResultChartProps = {
  userChar: {
    gender: string
    mbti: string
  }
}

export type recommend = {
  artist: string
  genre: string
  lyrics: string
  musicId: string
  musicSource: string
  musicTitle: string
  release: string
  runTime: string
  thumbnail: string
}

export type PersonalMusic = {
  checkedList: string[]
  userChar: {
    gender: string
    mbti: string
    uid: string
  }
}

export type PersonlResult = {
  userId: string
  userChar: {
    gender: string
    mbti: string
  }
  musicList: string[]
}
