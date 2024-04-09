'use client'

import { FormEvent, MouseEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import {
  deleteCommunityBoard,
  readCommunityDetail,
  updateCommnityBoard,
} from '@/shared/communitydetail/detailApi'
import { COMMUNITY_QUERY_KEY } from '@/query/communityDetail/communityQueryKey'
import Image from 'next/image'
import { onDateHandler } from '@/util/util'
import LikeButton from './LikeButton'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import useInput from '@/hooks/useInput'
import { useStore } from '@/shared/store'

const CommunityContents = () => {
  const router = useRouter()
  const { id } = useParams()
  console.log(id)
  const {
    data: readDetailData,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryKey: [COMMUNITY_QUERY_KEY.READ_BOARD, id],
    queryFn: () => readCommunityDetail(id.toString()),
    // enabled: !!uid,
  })
  if (!readDetailData) return
  const {
    boardId,
    boardTitle,
    date,
    content,
    likeList,
    userInfo,
    comment,
    musicInfo,
  } = readDetailData
  const { nickname, userImage } = userInfo!
  const { musicTitle, artist, thumbnail } = musicInfo!
  console.log(boardTitle, content)
  if (!boardTitle || !content) return null
  // const {
  //   form: editForm,
  //   setForm: setEditForm,
  //   onChange: onChangeEditForm,
  //   reset,
  // } = useInput({ boardTitle, content })

  const { userInfo: userUid } = useStore()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { uid } = userUid
  const [editForm, setEditForm] = useState({ boardTitle, content })
  const editValueTitle = editForm.boardTitle
  const editValueContent = editForm.content

  if (!likeList) return

  const onBoardEditHandler = (e: MouseEvent) => {
    e.preventDefault()
    setIsEdit(!isEdit)
    setEditForm({ boardTitle, content })
  }

  const onBoardEditCompleteHandler = async (e: MouseEvent) => {
    e.preventDefault()
    setEditForm((preEditForm) => {
      if (boardId === id) {
        return {
          ...preEditForm,
          boardTitle: editValueTitle,
          content: editValueContent,
        }
      }
      return preEditForm
    })
    alert('내용을 수정하셨습니다.')

    await updateCommnityBoard(boardId, editValueTitle, editValueContent)
    setIsEdit(false)
  }

  const onDeleteBoardHandler = async (e: MouseEvent) => {
    e.preventDefault()
    await deleteCommunityBoard(id)
  }

  const onEditCancelHandler = () => {
    setIsEdit(false)
  }
  const onBackButtonHandler = () => {
    setIsEdit(false)
    router.back()
  }

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
          {/* <button onClick={onBackButtonHandler}>이전으로 가기</button>
          {isEdit ? (
            <button onClick={onEditCancelHandler}>수정취소</button>
          ) : (
            <></>
          )}

          {isEdit ? (
            <button onClick={onBoardEditCompleteHandler}>수정완료</button>
          ) : (
            <></>
          )}
        </div>
        {isEdit ? (
          <div></div>
        ) : (
          <button onClick={onBoardEditHandler}>수정</button>
        )}

        <button type='button' onClick={onDeleteBoardHandler}>
          삭제
        </button>
        <div key={boardId}>
          {isEdit ? (
            <input
              type='text'
              name='boardTitle'
              value={editValueTitle}
              onChange={onChangeEditForm}
            />
          ) : (
            <div>{`제목 : ${boardTitle}`}</div>
          )}
          <div>{nickname}</div>
          <figure>
            {userImage ? (
              <Image
                src={`${userImage}`}
                alt='유저 이미지'
                width={56}
                height={56}
              />
            ) : null}
          </figure>
          <div>{onDateHandler(date)}</div>
          <figure>
            <Image
              src={`${thumbnail}`}
              alt='노래 앨범 이미지'
              width={56}
              height={56}
            />
          </figure>
          <div>{musicTitle}</div>
          <div>{artist}</div>
          {isEdit ? (
            <textarea
              id='content'
              name='content'
              value={editValueContent}
              onChange={onChangeEditForm}
              cols={30}
              rows={10}
            ></textarea>
          ) : (
            <div>{`내용 : ${content}`}</div>
          )}
          <div>
            <LikeButton />
            {likeList.length}
          </div>
          <div>{comment.length}</div> */}
        </div>
      </div>
    </div>
  )
}

export default CommunityContents
