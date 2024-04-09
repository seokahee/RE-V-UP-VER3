import { MouseEvent, useState } from 'react'
import MusicSearchModal from './MusicSearchModal'

const MusicSearch = () => {
  const [isModal, setIsModal] = useState<boolean>(false)

  const onModalOpenHandler = (e: MouseEvent) => {
    e.preventDefault()
    setIsModal(true)
  }

  return (
    <div>
      <button onClick={onModalOpenHandler}>음악 등록하기</button>
      {isModal && (
        <div>
          <MusicSearchModal isModal={isModal} setIsModal={setIsModal} />
        </div>
      )}
    </div>
  )
}

export default MusicSearch
