import { useMutation, useQueryClient } from '@tanstack/react-query'
import { disciplinaryActionsApi } from '@/lib/api/disciplinary-actions'
import { toast } from 'sonner'
import { DisciplinaryAction } from '@/stores/dataStore'

export function useCreateDisciplinaryAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<DisciplinaryAction> & { informationSheetId: number }) => {
      return disciplinaryActionsApi.create(data)
    },
    onSuccess: () => {
      toast.success('Disciplinary action added successfully')
      queryClient.invalidateQueries({ queryKey: ['information-sheets'] })
      queryClient.invalidateQueries({ queryKey: ['disciplinary-actions'] })
    },
    onError: (error) => {
      console.error('Failed to create disciplinary action:', error)
      toast.error('Failed to create disciplinary action')
    },
  })
}

export function useUpdateDisciplinaryAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DisciplinaryAction> }) => {
      return disciplinaryActionsApi.update(id, data)
    },
    onSuccess: () => {
      toast.success('Disciplinary action updated successfully')
      queryClient.invalidateQueries({ queryKey: ['information-sheets'] })
      queryClient.invalidateQueries({ queryKey: ['disciplinary-actions'] })
    },
    onError: (error) => {
      console.error('Failed to update disciplinary action:', error)
      toast.error('Failed to update disciplinary action')
    },
  })
}

export function useDeleteDisciplinaryAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => {
      return disciplinaryActionsApi.delete(id)
    },
    onSuccess: () => {
      toast.success('Disciplinary action deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['information-sheets'] })
      queryClient.invalidateQueries({ queryKey: ['disciplinary-actions'] })
    },
    onError: (error) => {
      console.error('Failed to delete disciplinary action:', error)
      toast.error('Failed to delete disciplinary action')
    },
  })
}
