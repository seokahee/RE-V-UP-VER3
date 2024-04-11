import { Dispatch, SetStateAction } from 'react'

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
) => {
  if (!data)
    return {
      currentItems: [],
      nextPage: () => {},
      prevPage: () => {},
      totalPages: 0,
    }

  const itemsPerPage = 10
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

export const modalPaging = (
  data: any,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
) => {
  if (!data) {
    return {
      currentItems: [],
      nextPage: () => {},
      prevPage: () => {},
      totalPages: 0,
    }
  }

  const itemsPerPage = 5
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
