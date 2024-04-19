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
import userDefault from '@/../public/images/userDefaultImg.svg'
import useInput from '@/hooks/useInput'
import LikeButton from './LikeButton'
import Link from 'next/link'

import {
  ADDED_CURRENT_MUSIC_SHADOW,
  ADD_CURRENT_MUSIC_SHADOW,
  ALLOW_SHADOW,
  BOARD_TITLE_SHADOW,
} from './communityCss'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import CommentsPage from '@/app/(auth)/comment/page'
import { DOWN_ACTIVE_BUTTON } from '../login/loginCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'
import Swal from 'sweetalert2'

const CommunityContents = () => {
  const router = useRouter()
  const { setIsChooseMusic } = useMusicSearchedStore()
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
    commentsData,
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
  const commentLength =
    commentsData && commentsData.length > 99
      ? 99
      : commentsData
        ? commentsData.length
        : 0
  const commentPlusCondition =
    commentsData && commentsData.length && commentsData.length > 99 ? '+' : null

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
    await Swal.fire({
      title: '게시글 수정',
      text: '내용을 수정하셨습니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#685BFF',
      color: '#ffffff',
      background: '#2B2B2B',
    })

    setIsEdit(false)
  }

  const onDeleteBoardHandler = async (e: MouseEvent) => {
    e.preventDefault()

    Swal.fire({
      title: '게시글 삭제',
      text: '정말 삭제 하시겠습니까?',

      showCancelButton: true,
      confirmButtonColor: '#685BFF',
      cancelButtonColor: '#000000',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      color: '#ffffff',
      background: '#2B2B2B',

      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCommunityMutation.mutate(currentBoardId)
        Swal.fire({
          title: '게시글 삭제',
          text: '게시글을 삭제하셨습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#685BFF',
          color: '#ffffff',
          background: '#2B2B2B',
        })
      } else {
        Swal.fire({
          title: '게시글 삭제 취소',
          text: '삭제를 취소하셨습니다.',
          confirmButtonText: '취소',
          confirmButtonColor: '#685BFF',
          color: '#ffffff',
          background: '#2B2B2B',
        })
        return
      }
      router.back()
    })
  }

  const onEditCancelHandler = () => {
    setIsEdit(false)
  }

  const onBackButtonHandler = () => {
    setIsEdit(false)
    setIsChooseMusic(false)
    router.back()
  }

  const onAddPlayerHandler = async (
    e: MouseEvent,
    uid: string,
    musicId: string,
  ) => {
    e.preventDefault()
    if (!uid) {
      await Swal.fire({
        text: '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })

      router.replace('/login')
      return
    }

    if (playListCurrent && playListCurrent.length > 0) {
      const currentList = playListCurrent[0].currentMusicIds
      if (currentList.find((el) => el === musicId)) {
        await Swal.fire({
          text: '이미 추가된 노래입니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#685BFF',
          color: '#ffffff',
          background: '#2B2B2B',
        })

        return
      }

      currentList.push(musicId)
      updateMutation.mutate({ userId: uid, currentList })
    } else {
      insertMutation.mutate({ userId: uid, musicId })
    }
    await Swal.fire({
      text: '현재 재생목록에 추가 되었습니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#685BFF',
      color: '#ffffff',
      background: '#2B2B2B',
    })
  }

  const onClickAddMyPlayListHandler = async (musicId: string) => {
    if (uid === '' || !uid) {
      await Swal.fire({
        text: '로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      router.replace('/login')
      return
    }
    //////////////////
    Swal.fire({
      text: '마이플레이 리스트에 추가하시겠습니까?',

      showCancelButton: true,
      confirmButtonColor: '#685BFF',
      cancelButtonColor: '#000000',
      confirmButtonText: '추가',
      cancelButtonText: '취소',
      color: '#ffffff',
      background: '#2B2B2B',

      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (myPlayList && myPlayList.length > 0) {
          const myList = myPlayList[0].myMusicIds

          if (myList.find((el) => el === musicId)) {
            Swal.fire({
              text: '이미 추가된 노래입니다.',
              confirmButtonText: '확인',
              confirmButtonColor: '#685BFF',
              color: '#ffffff',
              background: '#2B2B2B',
            })
            return
          }
          myList.push(musicId)
          updateMyMutation.mutate({ userId: uid, myMusicList: myList })
        } else {
          const myMusicId = [musicId]
          insertMyMutation.mutate({ userId: uid, musicId: myMusicId })
        }
        Swal.fire({
          text: '마이플레이리스트에 추가 되었습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#685BFF',
          color: '#ffffff',
          background: '#2B2B2B',
        })
      }
    })
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
    Swal.fire({
      text: '로그인한 유저만 이용 가능합니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#685BFF',
      color: '#ffffff',
      background: '#2B2B2B',
    })
    router.replace('/')
    return
  }

  return (
    <div className='flex w-[732px] flex-col'>
      <div className='mb-[8px] flex flex-col gap-[16px]'>
        <section
          className={`justify-betweeen relative mt-[32px] flex h-[72px] w-[100%] items-center rounded-[16px] border-[4px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] px-[16px] py-[12px] ${BOARD_TITLE_SHADOW}`}
        >
          <div>
            {isEdit ? (
              <button
                onClick={onEditCancelHandler}
                className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.1)] ${ALLOW_SHADOW}`}
              >
                <Image
                  src={goback}
                  alt='수정취소 아이콘'
                  width={24}
                  height={24}
                />
              </button>
            ) : (
              <button
                onClick={onBackButtonHandler}
                className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.1)] ${ALLOW_SHADOW}`}
              >
                <Image
                  src={goback}
                  alt='이전으로 아이콘'
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
          <h3 className='mx-[auto] text-[18px] font-bold'>
            음악 추천 게시판🦻
          </h3>
          {isEdit ? (
            <div className='absolute right-[12px] top-[12.5%]'>
              <button
                onClick={onBoardEditCompleteHandler}
                className={`flex h-[48px] w-[120px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
              >
                <p>수정완료</p>
              </button>
            </div>
          ) : null}
        </section>

        <div className='flex w-full flex-col gap-[40px]'>
          <article className='flex items-center gap-[16px] border-b-[1px] border-solid border-[#000000] px-[16px] py-[30px]'>
            <div className='flex'>
              <Link
                href={`/userpage/${userId}`}
                className={`${uid === userId ? 'pointer-events-none' : 'cursor-pointer'}`}
              >
                <figure className='h-[56px] w-[56px] items-center rounded-full '>
                  {userImage ? (
                    <Image
                      src={`${userImage}`}
                      alt='유저 이미지'
                      width={56}
                      height={56}
                      title={`${nickname}님의 페이지로 이동`}
                      className='h-[56px] w-[56px] rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)] bg-[#2B2B2B]'
                    />
                  ) : (
                    <Image
                      src={userDefault}
                      alt='유저 이미지'
                      width={56}
                      height={56}
                      title={`${nickname}님의 페이지로 이동`}
                      className='h-[56px] w-[56px] rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)] bg-[#2B2B2B]'
                    />
                  )}
                </figure>
              </Link>
            </div>

            <section className='flex w-full flex-col gap-[16px]'>
              <div className='flex w-full justify-between'>
                {isEdit ? (
                  <input
                    type='text'
                    name='boardTitle'
                    maxLength={40}
                    value={updatedTitle}
                    onChange={onChangeEditForm}
                    className='flex w-full rounded-[12px] border-none bg-[rgba(255,255,255,0.1)] px-[4px] pt-[4px] text-[18px] font-bold tracking-[-0.03em]'
                  />
                ) : (
                  <div className='flex flex-col items-center justify-center'>
                    <p className='flex flex-col items-center justify-center text-center text-[18px] font-bold '>{`${boardTitle}`}</p>
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
                <div className='flex items-center'>
                  <p className=' text-center text-[14px] font-bold text-[rgba(255,255,255,0.5)]'>
                    {nickname}
                  </p>
                </div>
                <div className='text-[rgba(255,255,255,0.5)]'>
                  {onDateTimeHandler(date)}
                </div>
              </div>
            </section>
          </article>
          <article
            className={`flex w-full justify-between gap-[24px] rounded-[32px] bg-[rgba(255,255,255,0.1)] py-[20px] pl-[40px] pr-[20px]  ${ADDED_CURRENT_MUSIC_SHADOW}`}
          >
            <div className='flex w-full items-center justify-between '>
              <section className='flex items-center gap-[32px]'>
                <figure className='flex h-[80px] w-[80px] items-center rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)]'>
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
                maxLength={200}
                className='mb-4 h-[200px] w-full  rounded-lg border-none bg-[rgba(255,255,255,0.1)] p-2 px-[15px]'
              ></textarea>
            ) : (
              <div className='h-[200px] w-full px-[15px] tracking-[-0.03em]'>{`${content}`}</div>
            )}
          </article>
        </div>

        <div className='flex w-full flex-col gap-[40px] '>
          <div className='flex gap-[16px]'>
            <div className='flex gap-[7px]'>
              <figure>
                <Image src={message} alt='댓글 아이콘' width={24} height={24} />
              </figure>
              <div className='text-[rgba(255,255,255,0.5)]'>
                <p>
                  {commentLength}
                  {commentPlusCondition}
                </p>
              </div>
            </div>
            <LikeButton boardId={currentBoardId} />
          </div>
        </div>
      </div>
      {isEdit ? null : <CommentsPage />}
    </div>
  )
}

export default CommunityContents
