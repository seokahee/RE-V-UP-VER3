import React, { useState } from 'react'
import Image from 'next/image'
import {
  recommendMusic,
  getRecommendMusic,
  insertPersonalMusic,
  getCurrentMusics,
  insertPersonalResult,
} from '@/shared/personal/personalApi'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

import type { PersonalRecommendProps } from '@/types/personal/type'
type PersonalMusic = {
  recommend: {
    artist: string
    genre: number
    lyrics: string
    musicId: string
    musicSource: string
    musicTitle: string
    release: string
    runTime: string
    thumbnail: string
  }[]
  userChar: {
    gender: string
    mbti: string
    uid: string
  }
}
const PersonalRecommend: React.FC<PersonalRecommendProps> = ({ userChar }) => {
  const [checked, setIsChecked] = useState<string[]>([])
  const queryClient = useQueryClient()
  const mbtiStatus = userChar.mbti

  const { data: musicPreferenceData } = useQuery({
    queryFn: () => recommendMusic(mbtiStatus),
    queryKey: ['test'],
  })

  console.log(musicPreferenceData, 'musicPreferenceData')

  const { data: recommend } = useQuery({
    queryFn: () => getRecommendMusic(musicPreferenceData as number[]),
    queryKey: ['testaaa'],
  })

  const { data: current } = useQuery({
    queryFn: () => getCurrentMusics(userChar.uid),
    queryKey: ['currentMusic'],
  })

  const currentList = current?.[0].currentMusicIds
  console.log('현재 재생 음악', current?.[0].currentMusicIds)
  console.log('현재 재생 음악', current)

  //퍼스널 결과 디비에
  const insertPersonalMusicMutation = useMutation({
    mutationFn: insertPersonalMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personal'] })
    },
  })

  //퍼스널 결과 현재 재생 리스트에
  const personalResultMutation = useMutation({
    mutationFn: insertPersonalResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentMusic'] })
    },
  })

  const onSubmitPersonalMusic = () => {
    const personalMusicData: PersonalMusic = {
      userChar: {
        gender: 'male',
        mbti: 'INFJ',
        uid: '123456',
      },
      recommend: [], // 빈 배열로 초기화
    }

    insertPersonalMusic(personalMusicData)
    alert('디비에 추가 완료 ')
  }

  const onSubmitCurrentMusic = () => {
    // const musicList = [...currentList, checked]
    // console.log(musicList)
    // personalResultMutation.mutate({ userId: userChar.uid, musicList })
    onSubmitPersonalMusic()
  }
  return (
    <div>
      <p>추천음악</p>
      {recommend?.map((item) => (
        <div key={item.musicId}>
          {/* <input
            type='checkbox'
            onChange={(e) => setIsChecked(e.target.value)}
            value={item.musicId}
          /> */}
          <div>
            <Image
              src={item.thumbnail}
              width={120}
              height={120}
              alt={`${item.musicTitle} 앨범 썸네일`}
            />
          </div>
          <div>제목 : {item.musicTitle}</div>
          <div>가수 : {item.artist}</div>
          <br />
        </div>
      ))}
      <button disabled={!checked} onClick={onSubmitCurrentMusic}>
        현재 재생 목록에 추가
      </button>
      <br />
    </div>
  )
}

export default PersonalRecommend
