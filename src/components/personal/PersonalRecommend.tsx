'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {
  recommendMusic,
  getRecommendMusic,
  insertPersonalMusic,
  getCurrentMusics,
  getPersonaledUser,
  updatePersonalMusic,
  insertPersonalResult,
} from '@/shared/personal/personalApi'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import CheckboxItem from '../mypage/CheckboxItem'
import type { PersonalRecommendProps } from '@/types/personal/type'
import { useRouter } from 'next/navigation'

const PersonalRecommend: React.FC<PersonalRecommendProps> = ({ userChar }) => {
  const [checkedList, setCheckedList] = useState<string[]>([])
  const queryClient = useQueryClient()
  const mbtiStatus = userChar.mbti
  const router = useRouter()

  //뮤직 장르 코드
  const { data: musicPreferenceData } = useQuery({
    queryFn: () => recommendMusic(mbtiStatus),
    queryKey: ['personal'],
  })

  //추천 음악
  const { data: recommend } = useQuery({
    queryFn: () => getRecommendMusic(musicPreferenceData as number[]),
    queryKey: ['recommendMusic'],
  })

  const onChangeCheckMusicHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      const checkList = checkedList.filter((el) => el !== id)
      setCheckedList(checkList)
    }
  }

  //퍼스널 뮤직진단 사용자 리스트
  const { data: personalUser } = useQuery({
    queryFn: () => getPersonaledUser(),
    queryKey: ['personalReuslt'],
  })

  //퍼스널 뮤직 진단에 추가
  const addPersonalResultMutation = useMutation({
    mutationFn: insertPersonalMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalReuslt'] })
      setCheckedList([])
    },
  })

  //퍼스널 뮤직 진단을 이전에 받았을 경우 진단 수정
  const updatePersonalResultMutation = useMutation({
    mutationFn: updatePersonalMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalReuslt'] })
      setCheckedList([])
    },
  })

  const updateCurrentMusicMutation = useMutation({
    mutationFn: insertPersonalResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalReuslt'] })
      setCheckedList([])
    },
  })

  //현재 재생목록 리스트
  const { data: current } = useQuery({
    queryFn: () => getCurrentMusics(userChar.uid),
    queryKey: ['currentMusic'],
  })

  if (!current) {
    return
  }
  const currentList = current?.[0].currentMusicIds as string[]

  //현재 재생목록에 결과추가
  const onSubmitCurrentMusic = () => {
    if (checkedList.length === 0) {
      alert('선택된 곡이 없습니다.')
      return
    }

    const filterMusic = checkedList.filter((musicId) =>
      currentList.includes(musicId),
    )

    if (filterMusic.length > 0) {
      alert('이미 현재 재생목록에 있는 곡입니다.')
      setCheckedList([])
      return
    }

    const musicList = [...currentList, ...checkedList] as string[]
    updateCurrentMusicMutation.mutate({ userId: userChar.uid, musicList })
    onSubmitPersonalResult()
    router.push('/')
  }
  //퍼스널 DB에 결과추가
  const onSubmitPersonalResult = () => {
    const personalMusicData = {
      userChar,
      checkedList,
    }

    if (personalUser?.find((user) => user.userId === userChar.uid)) {
      alert('진단 결과 업데이트 및 곡 추가가 완료됐습니다.')
      updatePersonalResultMutation.mutate(personalMusicData)
    } else {
      alert('곡 추가가 완료됐습니다.')
      addPersonalResultMutation.mutate(personalMusicData)
    }
  }

  return (
    <div>
      <p>추천음악</p>
      {recommend?.map((item) => (
        <div key={item.musicId}>
          <CheckboxItem
            checked={checkedList.includes(item.musicId)}
            id={item.musicId}
            onChangeCheckMusicHandler={(e) =>
              onChangeCheckMusicHandler(e.target.checked, item.musicId)
            }
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
          {currentList.includes(item.musicId) ? '현재 재생중' : ''}
          <br />
        </div>
      ))}
      <button onClick={onSubmitCurrentMusic}>현재 재생 목록에 추가</button>
      <br />
    </div>
  )
}

export default PersonalRecommend
