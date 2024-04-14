import { MouseEvent, useState } from 'react'
import MusicSearchModal from './MusicSearchModal'
import { DOWN_ACTIVE_BUTTON } from '../login/loginCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'

const MusicSearch = () => {
  const [isModal, setIsModal] = useState<boolean>(false)

  const onModalOpenHandler = (e: MouseEvent) => {
    e.preventDefault()
    setIsModal(true)
  }

  return (
    <div className='flex flex-col justify-center gap-[16px]'>
      <div className='flex'>
        <button
          onClick={onModalOpenHandler}
          className={`flex h-[88px] w-[114px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
        >
          음악 등록하기
        </button>
        {isModal && (
          <div>
            <MusicSearchModal isModal={isModal} setIsModal={setIsModal} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MusicSearch
