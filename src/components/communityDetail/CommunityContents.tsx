'use client'

import { MouseEvent, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  useCoummunityCreateItem,
  useCoummunityItem,
} from '@/query/communityDetail/mutation'
import { musicDataInCommuDetail } from '@/query/communityDetail/queryKey'
import type { readCommuDetail } from '@/types/communityDetail/detailTypes'
import { onDateTimeHandler } from '@/util/util'
import message from '@/../public/images/message-text-square-02-gray.svg'
import goback from '@/../public/images/community-detail-Image/back-allow.svg'
import detailEdit from '@/../public/images/community-detail-Image/detail-edit.svg'
import detailDelete from '@/../public/images/community-detail-Image/detail-delete.svg'
import addCurrMusic from '@/../public/images/community-detail-Image/add-current-music.svg'
import addMyPlayList from '@/../public/images/community-detail-Image/add-my-playlist.svg'
import useInput from '@/hooks/useInput'
import LikeButton from './LikeButton'
import Link from 'next/link'

import {
  ADDED_CURRENT_MUSIC_SHADOW,
  ADD_CURRENT_MUSIC_SHADOW,
  ALLOW_SHADOW,
  BOARD_TITLE_SHADOW,
} from './communityCss'

const CommunityContents = () => {
  const router = useRouter()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { data: userSessionInfo, status } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const { id: currentBoardId }: { id: string } = useParams()
  const { updateMutation, insertMutation } = useCoummunityCreateItem()
  const {
    playListCurrent,
    myPlayList,
    readDetailData,
    isPending,
    isLoading,
    error,
  } = musicDataInCommuDetail(uid, currentBoardId)

  const {
    updateCommunityMutation,
    deleteCommunityMutation,
    insertMyMutation,
    updateMyMutation,
  } = useCoummunityItem()

  const {
    boardId,
    boardTitle,
    date,
    musicId,
    content,
    likeList,
    userInfo,
    comment,
    musicInfo,
  } = readDetailData || ({} as readCommuDetail)
  const { nickname, userImage, userId } = userInfo || {}
  const { musicTitle, artist, thumbnail, runTime } = musicInfo || {}

  const {
    form: editForm,
    setForm: setEditForm,
    onChange: onChangeEditForm,
  } = useInput({ boardTitle, content })
  const { boardTitle: updatedTitle, content: updatedContent } = editForm

  const onBoardEditHandler = (e: MouseEvent) => {
    e.preventDefault()

    setIsEdit(!isEdit)
    setEditForm({ boardTitle, content })
  }

  const onBoardEditCompleteHandler = async (e: MouseEvent) => {
    e.preventDefault()

    if (boardId && updatedTitle && updatedContent) {
      updateCommunityMutation.mutate({
        boardId,
        boardTitle: updatedTitle,
        content: updatedContent,
      })
    }
    alert('내용을 수정하셨습니다.')
    setIsEdit(false)
  }

  const onDeleteBoardHandler = async (e: MouseEvent) => {
    e.preventDefault()

    if (window.confirm('삭제하시겠습니까?') === true) {
      deleteCommunityMutation.mutate(currentBoardId)
      alert('삭제되었습니다.')
    } else {
      alert('삭제를 취소하셨습니다.')
      return
    }
    router.back()
  }

  const onEditCancelHandler = () => {
    setIsEdit(false)
  }

  const onBackButtonHandler = () => {
    setIsEdit(false)
    router.back()
  }

  const onAddPlayerHandler = (e: MouseEvent, uid: string, musicId: string) => {
    e.preventDefault()
    if (!uid) {
      alert(
        '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
      )
      router.replace('/login')
      return
    }

    if (playListCurrent && playListCurrent.length > 0) {
      const currentList = playListCurrent[0].currentMusicIds
      if (currentList.find((el) => el === musicId)) {
        alert('이미 추가된 노래입니다.')
        return
      }

      currentList.push(musicId)
      updateMutation.mutate({ userId: uid, currentList })
    } else {
      insertMutation.mutate({ userId: uid, musicId })
    }
    alert('현재 재생목록에 추가 되었습니다.')
  }

  const onClickAddMyPlayListHandler = async (musicId: string) => {
    if (uid === '' || !uid) {
      alert(
        '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
      )
      router.replace('/login')
      return
    }

    if (window.confirm('마이플레이 리스트에 추가하시겠습니까?')) {
      if (myPlayList && myPlayList.length > 0) {
        const myList = myPlayList[0].myMusicIds

        if (myList.find((el) => el === musicId)) {
          alert('이미 추가된 노래입니다.')
          return
        }
        myList.push(musicId)
        updateMyMutation.mutate({ userId: uid, myMusicList: myList })
      } else {
        const myMusicId = [musicId]
        insertMyMutation.mutate({ userId: uid, musicId: myMusicId })
      }
      alert('마이플레이리스트에 추가 되었습니다.')
    }
  }

  if (!boardTitle || !content || !comment || !date) return null
  if (!likeList) return null

  if (isPending && isLoading) {
    return <div>정보를 가져오고 있습니다..로딩바자리임</div>
  }

  if (error) {
    return <div>정보를 가져오지 못하고 있습니다. 로딩바자뤼</div>
  }
  if (status === 'unauthenticated') {
    alert('로그인한 유저만 이용 가능합니다.')
    router.replace('/')
    return
  }

  return (
    <div className='mb-[8px] flex w-[732px] flex-col'>
      <div className='flex flex-col gap-[16px]'>
        <section
          className={`mt-[32px] flex h-[72px] w-[100%] items-center justify-center rounded-[16px] border-[4px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] px-[16px] py-[12px] ${BOARD_TITLE_SHADOW}`}
        >
          <button
            onClick={onBackButtonHandler}
            className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.1)] ${ALLOW_SHADOW}`}
          >
            <Image src={goback} alt='이전으로 아이콘' width={24} height={24} />
          </button>
          <h3 className='mx-[auto] text-[18px] font-bold'>
            음악 추천 게시판🦻
          </h3>
          {isEdit ? (
            <div>
              <button onClick={onEditCancelHandler}>수정취소</button>
              <button onClick={onBoardEditCompleteHandler}>수정완료</button>
            </div>
          ) : null}
        </section>

        <div className='flex w-full flex-col gap-[40px]'>
          <article className='flex gap-[16px] border-b-[1px] border-solid border-[#000000] px-[16px] py-[30px]'>
            <div className='flex'>
              <Link
                href={`/userpage/${userId}`}
                className={`${uid === userId ? 'pointer-events-none' : 'cursor-pointer'}`}
              >
                <figure className='h-[56px] w-[56px] rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)] bg-[#2B2B2B]'>
                  {userImage ? (
                    <Image
                      src={`${userImage}`}
                      alt='유저 이미지'
                      width={56}
                      height={56}
                      title={`${nickname}님의 페이지로 이동`}
                      className='h-[56px] w-[56px] rounded-full'
                    />
                  ) : (
                    <div className='h-[56px] w-[56px] rounded-full'>
                      <i></i>
                    </div>
                  )}
                </figure>
              </Link>
            </div>

            <section className='flex w-full flex-col'>
              <div className='flex justify-between'>
                {isEdit ? (
                  <input
                    type='text'
                    name='boardTitle'
                    maxLength={40}
                    value={updatedTitle}
                    onChange={onChangeEditForm}
                    className='text-[18px]  font-bold text-black '
                  />
                ) : (
                  <div>
                    <p className=' text-[18px] font-bold '>{`${boardTitle}`}</p>
                  </div>
                )}
                <div>
                  <div>
                    {userId === uid && !isEdit && (
                      <button onClick={onBoardEditHandler}>
                        <Image
                          src={detailEdit}
                          alt='상세페이지 수정 아이콘'
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {userId === uid && (
                      <button type='button' onClick={onDeleteBoardHandler}>
                        <Image
                          src={detailDelete}
                          alt='상세페이지 삭제 아이콘'
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div>
                  <p className=' text-[14px] font-bold'>{nickname}</p>
                </div>
                <div>{onDateTimeHandler(date)}</div>
              </div>
            </section>
          </article>
          <article
            className={`flex w-full justify-between gap-[24px] rounded-[32px] bg-[rgba(255,255,255,0.1)] py-[20px] pl-[40px] pr-[20px]  ${ADDED_CURRENT_MUSIC_SHADOW}`}
          >
            <div className='flex w-full items-center justify-between '>
              <section className='flex items-center gap-[32px]'>
                <figure className='flex h-[80px] w-[80px] items-center rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.5)]'>
                  <Image
                    src={`${thumbnail}`}
                    alt='노래 앨범 이미지'
                    width={80}
                    height={80}
                    className='rounded-full '
                  />
                </figure>
                <article className='flex flex-col gap-[8px] '>
                  <div>
                    <p className='text-[24px] font-bold'>{musicTitle}</p>
                  </div>
                  <div>
                    <p className='font-bold text-[rgba(255,255,255,0.4)]'>
                      {artist}
                    </p>
                  </div>
                </article>
              </section>
              <section className='flex'>
                <div className='flex items-center text-[16px] font-bold'>
                  {runTime}
                </div>
              </section>
            </div>
            <div className='flex items-center justify-center gap-[16px]'>
              <button
                onClick={(e) => onAddPlayerHandler(e, uid, musicId)}
                className={`flex h-[48px] w-[48px] items-center justify-center rounded-[100%] border border-solid border-[#292929] bg-[#292929] p-[8px] ${ADD_CURRENT_MUSIC_SHADOW}`}
              >
                <Image
                  src={addCurrMusic}
                  alt='현재재생목록추가 아이콘'
                  width={24}
                  height={24}
                />
              </button>
              <button
                type='button'
                className={`flex h-[48px] w-[48px] items-center justify-center rounded-[100%] border border-solid border-[#292929] bg-[#292929] p-[8px] ${ADD_CURRENT_MUSIC_SHADOW}`}
                onClick={() => onClickAddMyPlayListHandler(musicId)}
              >
                <Image
                  src={addMyPlayList}
                  alt='마이플레이리스트에 저장 아이콘'
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </article>
          <article className='px-[16px] pb-[72px] text-[16px] font-bold'>
            {isEdit ? (
              <textarea
                id='content'
                name='content'
                value={updatedContent}
                onChange={onChangeEditForm}
                cols={30}
                rows={4}
                maxLength={100}
                className='w-full text-black'
              ></textarea>
            ) : (
              <div className='h-[200px] w-full px-[15px]'>{`${content}`}</div>
            )}
          </article>
        </div>

        <div className='flex w-full flex-col gap-[40px] '>
          <div className='flex gap-[16px]'>
            <div className='flex gap-[7px]'>
              <figure>
                <Image src={message} alt='댓글 아이콘' width={24} height={24} />
              </figure>
              <div>{comment.length ? comment.length : 0}</div>
            </div>
            <LikeButton boardId={currentBoardId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityContents
