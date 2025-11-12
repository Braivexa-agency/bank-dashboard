import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bankExperiencesApi } from '@/lib/api/bank-experiences'
import type { BankExperience } from '@/stores/dataStore'
import { toast } from 'sonner'

export function useBankExperiences(informationSheetId?: number) {
  return useQuery({
    queryKey: ['bank-experiences', informationSheetId],
    queryFn: () => bankExperiencesApi.getAll(informationSheetId),
  })
}

export function useBankExperience(id: number) {
  return useQuery({
    queryKey: ['bank-experiences', id],
    queryFn: () => bankExperiencesApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateBankExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (experience: Partial<BankExperience>) => bankExperiencesApi.create(experience),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-experiences'] })
      toast.success('Bank experience created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create bank experience')
      console.error(error)
    },
  })
}

export function useUpdateBankExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<BankExperience> }) =>
      bankExperiencesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bank-experiences'] })
      queryClient.invalidateQueries({ queryKey: ['bank-experiences', variables.id] })
      toast.success('Bank experience updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update bank experience')
      console.error(error)
    },
  })
}

export function useDeleteBankExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => bankExperiencesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-experiences'] })
      toast.success('Bank experience deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete bank experience')
      console.error(error)
    },
  })
}

