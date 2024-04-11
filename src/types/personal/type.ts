export type personalMusicTest = {
  personalMusicId: string
  resultSentence: string
  result: string[]
}

export type PersonalInfo = {
  mbti: string
  gender: string
}

export type PersonalRecommendProps = {
  userChar: {
    gender: string
    mbti: string
    uid: string
  }
}
