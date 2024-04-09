import { queryClient } from '@/app/provider'
import { useMutation } from '@tanstack/react-query'

export const addMutation = (
  fc: (variable: any) => Promise<void>,
  queryKey: string,
) => {
  const mutation = useMutation({
    mutationFn: fc,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
    onError: () => {
      console.error('오류가 발생했습니다.')
    },
  })
  return { mutation }
}
