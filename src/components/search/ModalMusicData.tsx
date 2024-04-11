import { MusicInfoType } from '@/types/musicPlayer/types'
import Image from 'next/image'

const ModalMusicData = ({ item }: { item: MusicInfoType }) => {
  return (
    <div key={item.musicId} className='flex items-center space-x-3'>
      <div>
        <Image
          src={item.thumbnail}
          alt='Album Thumbnail'
          width={100}
          height={100}
          className='rounded-lg'
        />
      </div>
      <div className='flex flex-col'>
        <div className='font-bold'>Title {item.musicTitle}</div>
        <div className='text-gray-600'>Artist {item.artist}</div>
        <div className='text-gray-600'>{item.release}</div>
      </div>
    </div>
  )
}

export default ModalMusicData
