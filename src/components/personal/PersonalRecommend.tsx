import React, { useState } from 'react'
import Image from 'next/image'
import {
  recommendMusic,
  getRecommendMusic,
  inssertPersonalMusic,
  getCurrentMusics,
  insertPersonalResult,
} from '@/shared/personal/personalApi'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

import type { PersonalRecommendProps } from '@/types/personal/type'

const PersonalRecommend: React.FC<PersonalRecommendProps> = ({ userChar }) => {
  const [checked, setIsChecked] = useState<string[]>([])
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

  const { data: current } = useQuery({
    queryFn: () => getCurrentMusics(userChar.uid),
    queryKey: ['testbbb'],
  })

  const currentList = current?.[0].currentMusicIds
  console.log('현재 재생 음악', current?.[0].currentMusicIds)

  // console.log('장르코드', musicPreferenceData)
  // console.log('추천음악', recommend)

  //퍼스널 결과 디비에
  const inssertPersonalMusicMutation = useMutation({
    mutationFn: inssertPersonalMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personal'] })
    },
  })

  //퍼스널 결과 현재 재생 리스트에
  const personalResultMutation = useMutation({
    mutationFn: insertPersonalResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testbbb'] })
    },
  })

  const testOnSubmit = () => {
    inssertPersonalMusicMutation.mutate({ userChar, recommend })
    alert('추가')
  }

  const testArr = () => {
    const musicList = [...currentList, checked]
    console.log(musicList)
    personalResultMutation.mutate({ userId: userChar.uid, musicList })
  }
  return (
    <div>
      <p>추천음악</p>
      {recommend?.map((item) => (
        <div key={item.musicId}>
          <input
            type='checkbox'
            onChange={(e) => setIsChecked(e.target.value)}
            value={item.musicId}
          />
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
      <button disabled={!checked} onClick={testArr}>
        현재 재생 목록에 추가
      </button>
      <br />
      <button onClick={testOnSubmit}>DB에 결과진단 추가</button>
    </div>
  )
}

export default PersonalRecommend
