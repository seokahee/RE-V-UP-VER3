import React from 'react'
import Image from 'next/image'
import {
  recommendMusic,
  getRecommendMusic,
} from '@/shared/personal/personalApi'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

import { inssertPersonalMusic } from '@/shared/personal/personalApi'
type PersonalRecommendProps = {
  userChar: {
    gender: string
    mbti: string
    uid: string
  }
}

const PersonalRecommend: React.FC<PersonalRecommendProps> = ({ userChar }) => {
  const queryClient = useQueryClient()
  const mbtiStatus = userChar.mbti
  const { data: musicPreferenceData } = useQuery({
    queryFn: () => recommendMusic(mbtiStatus),
    queryKey: ['test'],
  })

  const { data: recommend } = useQuery({
    queryFn: () => getRecommendMusic(musicPreferenceData),
    queryKey: ['testaaa'],
  })
  // console.log('장르코드', musicPreferenceData)
  // console.log('추천음악', recommend)

  const inssertPersonalMusicMutation = useMutation({
    mutationFn: inssertPersonalMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personal'] })
    },
  })

  const testOnSubmit = () => {
    inssertPersonalMusicMutation.mutate({ userChar, recommend })
  }
  return (
    <div>
      <p>추천음악</p>
      {recommend?.map((item) => (
        <div key={item.musicId}>
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
          <button onClick={testOnSubmit}>추가</button>
        </div>
      ))}
    </div>
  )
}

export default PersonalRecommend
