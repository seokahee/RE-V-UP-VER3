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
import useInput from '@/hooks/useInput'
import LikeButton from './LikeButton'
import Link from 'next/link'

const CommunityContents = () => {
  const router = useRouter()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { data: userSessionInfo } = useSession()
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

    deleteCommunityMutation.mutate(currentBoardId)
    alert('삭제되었습니다.')
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

  return (
    <div>
      <div>
        <div>
          <button onClick={onBackButtonHandler}>이전으로 가기</button>
          {isEdit ? (
            <div>
              <button onClick={onEditCancelHandler}>수정취소</button>
              <button onClick={onBoardEditCompleteHandler}>수정완료</button>
            </div>
          ) : null}
        </div>
        {userId === uid && !isEdit && (
          <button onClick={onBoardEditHandler}>수정</button>
        )}
        {userId === uid && (
          <button type='button' onClick={onDeleteBoardHandler}>
            삭제
          </button>
        )}
        <div>
          {isEdit ? (
            <input
              type='text'
              name='boardTitle'
              value={updatedTitle}
              onChange={onChangeEditForm}
            />
          ) : (
            <div>{`제목 : ${boardTitle}`}</div>
          )}
          <div>{nickname}</div>
          <Link href={`/userpage/${userId}`}>
            <figure>
              {userImage ? (
                <Image
                  src={`${userImage}`}
                  alt='유저 이미지'
                  width={56}
                  height={56}
                />
              ) : (
                <div className='h-[56px] w-[56px] bg-white'>
                  <i></i>
                </div>
              )}
            </figure>
          </Link>
          <div>{onDateTimeHandler(date)}</div>
          <figure>
            <Image
              src={`${thumbnail}`}
              alt='노래 앨범 이미지'
              width={56}
              height={56}
            />
          </figure>
          <div>
            <div>{musicTitle}</div>
            <div>{artist}</div>
            <div>{runTime}</div>
            <div>
              <button onClick={(e) => onAddPlayerHandler(e, uid, musicId)}>
                플레이어에 음악추가
              </button>
              <button
                type='button'
                className='absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2'
                onClick={() => onClickAddMyPlayListHandler(musicId)}
              >
                마플리
              </button>
            </div>
          </div>
          {isEdit ? (
            <textarea
              id='content'
              name='content'
              value={updatedContent}
              onChange={onChangeEditForm}
              cols={30}
              rows={10}
            ></textarea>
          ) : (
            <div>{`내용 : ${content}`}</div>
          )}

          <div>
            <LikeButton boardId={currentBoardId} />
            <div>{comment.length ? comment.length : 0}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityContents
