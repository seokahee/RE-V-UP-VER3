import { PlaylistCurrent } from '@/types/main/types'
import { MusicInfoType } from '@/types/musicPlayer/types'
import { Dispatch, SetStateAction } from 'react'
import Swal from 'sweetalert2'

export const onDateHandler = (itemDate: string) => {
  const date = new Date(itemDate).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return date
}

export const getToday = () => {
  const today = new Date()
  const date = today.toISOString()

  return date
}

export const paging = (
  data: any,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  itemsPer: number = 10,
) => {
  if (!data)
    return {
      currentItems: [],
      nextPage: () => {},
      prevPage: () => {},
      totalPages: 0,
    }

  const itemsPerPage = itemsPer
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  return { currentItems, nextPage, prevPage, totalPages }
}

export const onDateTimeHandler = (itemDate: string) => {
  const date = new Date(itemDate).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
  return date
}

export const dragHandler = (
  e: React.DragEvent<HTMLLIElement>,
  item: MusicInfoType,
) => {
  e.dataTransfer.setData(
    'musicInfo',
    JSON.stringify({
      musicSource: item.thumbnail,
      musicId: item.musicId,
      musicTitle: item.musicTitle,
      musicArtist: item.artist,
      musicLyrics: item.lyrics,
      musicRunTime: item.runTime,
      musicUrl: item.musicSource,
    }),
  )
}

// 헤이 pr올렸으니까 드래그 브랜치는 폭파예정이라구
// 다음에 뭘 할지 의논해보고(현재플리 드래그로 순서 바꿀지 말지)
// 브랜치 새로 게시한뒤 작업해라 이거 지우면 오류 사라질것임
// pr올리기 전 수정내용 싹 푸쉬햇으니 안심하라구
