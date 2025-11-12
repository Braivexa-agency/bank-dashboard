import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { nonBankExperiencesApi } from '@/lib/api/non-bank-experiences'
import type { NonBankExperience } from '@/stores/dataStore'
import { toast } from 'sonner'

export function useNonBankExperiences(informationSheetId?: number) {
  return useQuery({
    queryKey: ['non-bank-experiences', informationSheetId],
    queryFn: () => nonBankExperiencesApi.getAll(informationSheetId),
  })
}

export function useNonBankExperience(id: number) {
  return useQuery({
    queryKey: ['non-bank-experiences', id],
    queryFn: () => nonBankExperiencesApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateNonBankExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (experience: Partial<NonBankExperience>) => nonBankExperiencesApi.create(experience),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['non-bank-experiences'] })
      toast.success('Non-bank experience created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create non-bank experience')
      console.error(error)
    },
  })
}

export function useUpdateNonBankExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<NonBankExperience> }) =>
      nonBankExperiencesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['non-bank-experiences'] })
      queryClient.invalidateQueries({ queryKey: ['non-bank-experiences', variables.id] })
      toast.success('Non-bank experience updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update non-bank experience')
      console.error(error)
    },
  })
}

export function useDeleteNonBankExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => nonBankExperiencesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['non-bank-experiences'] })
      toast.success('Non-bank experience deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete non-bank experience')
      console.error(error)
    },
  })
}

