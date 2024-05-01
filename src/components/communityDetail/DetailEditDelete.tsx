import React, { ChangeEvent, MouseEvent } from 'react'
import detailEdit from '@/../public/images/community-detail-Image/detail-edit.svg'
import detailDelete from '@/../public/images/community-detail-Image/detail-delete.svg'
import { onDateTimeHandler } from '@/util/util'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { DetailEditDeleteProps } from '@/types/communityDetail/detailTypes'

const DetailEditDelete = ({
  isEdit,
  userId,
  date,
  nickname,
  boardTitle,
  updatedTitle,
  onChangeEditForm,
  onBoardEditHandler,
  onDeleteBoardHandler,
}: DetailEditDeleteProps) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string

  return (
    <section className='flex w-full flex-col gap-[16px]'>
      <article className='flex w-full justify-between'>
        {isEdit ? (
          <input
            type='text'
            name='boardTitle'
            maxLength={40}
            value={updatedTitle}
            onChange={onChangeEditForm}
            placeholder='제목을 입력해 주세요.(40자 이내)'
            className='flex w-full rounded-[12px] border-none bg-[rgba(255,255,255,0.1)] px-[4px] pt-[4px] text-[18px] font-bold tracking-[-0.03em]'
          />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <p className='flex flex-col items-center justify-center text-center text-[18px] font-bold '>{`${boardTitle}`}</p>
          </div>
        )}
        <section>
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
        </section>
      </article>
      <article className='flex justify-between'>
        <div className='flex items-center'>
          <p className=' text-center text-[14px] font-bold text-[rgba(255,255,255,0.5)]'>
            {nickname}
          </p>
        </div>
        <div className='text-[rgba(255,255,255,0.5)]'>
          {onDateTimeHandler(date)}
        </div>
      </article>
    </section>
  )
}

export default DetailEditDelete
