'use client'

import {
  getUserAndPlaylistData,
  updateNickname,
  uploadUserThumbnail,
} from '@/shared/mypage/api'
import { useStore } from '@/shared/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import Link from 'next/link'
import TabMenu from './TabMenu'
import FollowList from './FollowList'
import MyPlaylist from './MyPlaylist'

const MyInfo = () => {
  const { userInfo } = useStore()

  const [userImage, setUserImage] = useState('')

  const [isModal, setIsModal] = useState(false)
  const [isFollowModal, setIsFollowModal] = useState(false)
  const [nickname, setNickname] = useState('')
  const [checkText, setCheckText] = useState('')
  const nicknameRef = useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = useState({
    mbtiOpen: false,
    personalMusicOpen: false,
    playlistOpen: false,
    postsOpen: false,
    likedPostsOpen: false,
  })

  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserAndPlaylistData(userInfo.uid),
    queryKey: ['mypage', userInfo.uid],
    enabled: !!userInfo.uid,
  })

  const { data: playlistMyData } = useQuery({
    queryFn: () =>
      getUserPlaylistMyMusicInfoData(
        data?.playlistMy?.[0].myMusicIds as string[],
      ),
    queryKey: ['myMusicIds', data?.playlistMy],
    enabled: !!data?.playlistMy?.length,
  })

  const deleteMutation = useMutation({
    mutationFn: updateMyMusicIds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] })
    },
  })

  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] })
    },
  })

  const updateUserThumbnailMutation = useMutation({
    mutationFn: uploadUserThumbnail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] })
    },
  })

  const onClickViewModalHandler = () => {
    setIsModal(true)
  }

  const onClickCloseModalHandler = () => {
    setIsModal(false)
    if (data) {
      setNickname(data.nickname)
      setIsOpen({
        mbtiOpen: data.mbtiOpen,
        personalMusicOpen: data.personalMusicOpen,
        playlistOpen: data.playlistOpen,
        postsOpen: data.postsOpen,
        likedPostsOpen: data.likedPostsOpen,
      })
    }
    setCheckText('')
  }

  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsOpen((prev) => {
        return { ...prev, [e.target.name]: true }
      })
    } else {
      setIsOpen((prev) => {
        return { ...prev, [e.target.name]: false }
      })
    }
  }

  const onClickUpdateHandler = () => {
    if (!nickname.trim()) {
      setCheckText('닉네임을 입력해주세요')
      nicknameRef.current?.focus()
      return
    }
    const {
      likedPostsOpen,
      mbtiOpen,
      personalMusicOpen,
      playlistOpen,
      postsOpen,
    } = isOpen
    updateNicknameMutation.mutate({
      userId: userInfo.uid,
      nickname,
      likedPostsOpen,
      mbtiOpen,
      personalMusicOpen,
      playlistOpen,
      postsOpen,
    })
    alert('정보 변경이 완료되었습니다.')
    onClickCloseModalHandler()
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value
    setNickname(nickname)
  }

  const selectFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0] as File

    if (window.confirm('선택한 이미지로 업로드를 진행할까요?')) {
      const data = await updateUserThumbnailMutation.mutateAsync({
        userId: userInfo.uid,
        file,
      })
      setUserImage(data?.[0].userImage as string)
      alert('업로드 완료!')
    }
  }

  const onClickCloseFollowModalHandler = () => {
    setIsFollowModal(false)
  }

  const onClickViewFollowModalHandler = () => {
    setIsFollowModal(true)
  }

  const tabArr = [
    {
      id: 0,
      title: '팔로잉',
      content: <FollowList data={data?.following!} dataKey={'following'} />,
    },
    {
      id: 1,
      title: '팔로워',
      content: (
        <FollowList
          data={data?.follower!}
          dataKey={'follower'}
          myFollowing={data?.following!}
        />
      ),
    },
  ]

  useEffect(() => {
    if (data) {
      setNickname(data.nickname)
      setUserImage(data?.userImage)
      setIsOpen({
        mbtiOpen: data.mbtiOpen,
        personalMusicOpen: data.personalMusicOpen,
        playlistOpen: data.playlistOpen,
        postsOpen: data.postsOpen,
        likedPostsOpen: data.likedPostsOpen,
      })
    }
  }, [data])

  if (isError) {
    return <>에러발생</>
  }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <section className='p-[40px]'>
      <div>
        <div className='flex justify-between'>
          <div>
            <figure className='w-[80px] h-[80px] flex overflow-hidden rounded-full bg-slate-200'>
              {userImage && (
                <Image
                  src={userImage}
                  width={80}
                  height={80}
                  alt={`${data?.nickname} 프로필 이미지`}
                  priority={true}
                />
              )}
            </figure>
          </div>
          <Link href='/personal-music'>퍼스널 뮤직 진단 다시받기</Link>
        </div>
        <span className='cursor-pointer' onClick={onClickViewModalHandler}>
          {data?.nickname} &gt;
        </span>
        <p onClick={onClickViewFollowModalHandler} className='cursor-pointer'>
          팔로잉 {data?.following.length} 팔로워 {data?.follower.length}
        </p>
        <p>
          {data?.userChar?.mbti}
          {data?.personalMusic?.resultSentence}
        </p>
      </div>
      <MyPlaylist data={data!} />
      {isModal && (
        <Modal onClick={onClickCloseModalHandler}>
          <label className='[&>input]:hidden'>
            <figure className='w-[80px] h-[80px] flex overflow-hidden rounded-full bg-slate-200'>
              {userImage && (
                <Image
                  src={userImage}
                  width={80}
                  height={80}
                  alt={`${data?.nickname} 프로필 이미지`}
                  priority={true}
                />
              )}
            </figure>
            <input type='file' onChange={selectFileHandler} accept='image/*' />
          </label>
          <label>
            <input
              type='text'
              value={nickname}
              className='w-full'
              ref={nicknameRef}
              onChange={onChangeInput}
              placeholder='변경할 닉네임을 입력해주세요'
            />
          </label>
          <p className='h-5 text-sm text-red-500'>{checkText}</p>
          <h3>
            내 활동 공개여부{' '}
            <span>*체크 비활성화 시 다른 유저에게 보이지 않습니다.</span>
          </h3>
          <ul className='list-none text-white'>
            <li>
              <label>
                <input
                  type='checkbox'
                  name='personalMusicOpen'
                  checked={isOpen.personalMusicOpen}
                  onChange={onChangeCheck}
                />{' '}
                퍼스널 뮤직
              </label>
            </li>
            <li>
              <label>
                <input
                  type='checkbox'
                  name='mbtiOpen'
                  checked={isOpen.mbtiOpen}
                  onChange={onChangeCheck}
                />{' '}
                MBTI
              </label>
            </li>
            <li>
              <label>
                <input
                  type='checkbox'
                  name='postsOpen'
                  checked={isOpen.postsOpen}
                  onChange={onChangeCheck}
                />{' '}
                작성한 게시물
              </label>
            </li>
            <li>
              <label>
                <input
                  type='checkbox'
                  name='likedPostsOpen'
                  checked={isOpen.likedPostsOpen}
                  onChange={onChangeCheck}
                />{' '}
                좋아요 한 글
              </label>
            </li>
            <li>
              <label>
                <input
                  type='checkbox'
                  name='playlistOpen'
                  checked={isOpen.playlistOpen}
                  onChange={onChangeCheck}
                />{' '}
                플레이리스트
              </label>
            </li>
          </ul>
          <div className='mt-4 flex justify-between'>
            <button type='button' onClick={onClickCloseModalHandler}>
              취소
            </button>
            <button type='button' onClick={onClickUpdateHandler}>
              수정하기
            </button>
          </div>
        </Modal>
      )}

      {isFollowModal && (
        <Modal onClick={onClickCloseFollowModalHandler}>
          <TabMenu data={tabArr} width={'w-1/2'} />
        </Modal>
      )}
    </section>
  )
}

export default MyInfo
