import { MusicInfoType } from '@/types/musicPlayer/types'
import Image from 'next/image'

const ModalMusicData = ({ item }: { item: MusicInfoType }) => {
  return (
    <div key={item.musicId} className='flex flex-col gap-2'>
      <div>
        <Image
          src={item.thumbnail}
          alt='Album Thumbnail'
          width={100}
          height={100}
        />
        <div>제목 {item.musicTitle}</div>
        <div>가수 {item.artist}</div>
        <div>발매일 {item.release}</div>
        <div className='flex mt-5 gap-3'></div>
      </div>
    </div>
  )
}

export default ModalMusicData
