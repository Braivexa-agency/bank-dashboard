import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { disciplinaryActionsApi } from '@/lib/api/disciplinary-actions'
import type { DisciplinaryAction } from '@/stores/dataStore'
import { toast } from 'sonner'

export function useDisciplinaryActions(informationSheetId?: number) {
  return useQuery({
    queryKey: ['disciplinary-actions', informationSheetId],
    queryFn: () => disciplinaryActionsApi.getAll(informationSheetId),
  })
}

export function useDisciplinaryAction(id: number) {
  return useQuery({
    queryKey: ['disciplinary-actions', id],
    queryFn: () => disciplinaryActionsApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateDisciplinaryAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (action: Partial<DisciplinaryAction> & { informationSheetId: number }) =>
      disciplinaryActionsApi.create(action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disciplinary-actions'] })
      toast.success('Disciplinary action created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create disciplinary action')
      console.error(error)
    },
  })
}

export function useUpdateDisciplinaryAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DisciplinaryAction> }) =>
      disciplinaryActionsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['disciplinary-actions'] })
      queryClient.invalidateQueries({ queryKey: ['disciplinary-actions', variables.id] })
      toast.success('Disciplinary action updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update disciplinary action')
      console.error(error)
    },
  })
}

export function useDeleteDisciplinaryAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => disciplinaryActionsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disciplinary-actions'] })
      toast.success('Disciplinary action deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete disciplinary action')
      console.error(error)
    },
  })
}

