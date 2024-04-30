import { MusicInfoType } from '@/types/musicPlayer/types'

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
  setCurrentPageData: (page: number) => void,
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
      setCurrentPageData(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPageData(currentPage - 1)
    }
  }
  return { currentItems, nextPage, prevPage, totalPages }
}

export const resetPagination = (setCurrentPageData: (page: number) => void) => {
  setCurrentPageData(1)
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
