import {
  insertPersonalMusic,
  insertPersonalResult,
  insertUserChar,
  updatePersonalMusic,
  updatePersonalResult,
} from '@/shared/personal/personalApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PERSONAL_QUERY_KEYS } from './keys.constant'

export const useMutatePersonal = (
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const queryClient = useQueryClient()
  const addPersonalResultMutation = useMutation({
    mutationFn: insertPersonalMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PERSONAL_QUERY_KEYS.PERSONAL_RESULT],
      })
      setCheckedList([])
    },
  })

  const updatePersonalResultMutation = useMutation({
    mutationFn: updatePersonalMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PERSONAL_QUERY_KEYS.PERSONAL_RESULT],
      })
      setCheckedList([])
    },
  })

  const updateCurrentMusicMutation = useMutation({
    mutationFn: updatePersonalResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PERSONAL_QUERY_KEYS.PERSONAL_RESULT],
      })
      setCheckedList([])
    },
  })

  const insertCurrentMusicMutation = useMutation({
    mutationFn: insertPersonalResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PERSONAL_QUERY_KEYS.PERSONAL_RESULT],
      })
      setCheckedList([])
    },
  })

  return {
    addPersonalResultMutation,
    updatePersonalResultMutation,
    updateCurrentMusicMutation,
    insertCurrentMusicMutation,
  }
}

export const useMutateUserChar = () => {
  const queryClient = useQueryClient()
  const insertUserCharMutation = useMutation({
    mutationFn: insertUserChar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PERSONAL_QUERY_KEYS.PERSONAL_USER],
      })
    },
  })
  return insertUserCharMutation
}
