import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { professionalTrainingsApi, ProfessionalTraining } from '@/lib/api/professional-trainings'

// Query keys
const professionalTrainingsKeys = {
  all: ['professional-trainings'] as const,
  lists: () => [...professionalTrainingsKeys.all, 'list'] as const,
  list: (informationSheetId?: number) => 
    informationSheetId 
      ? [...professionalTrainingsKeys.lists(), { informationSheetId }] as const
      : [...professionalTrainingsKeys.lists()] as const,
  details: () => [...professionalTrainingsKeys.all, 'detail'] as const,
  detail: (id: number) => [...professionalTrainingsKeys.details(), id] as const,
}

// Get all professional trainings (optionally filtered by information sheet)
export function useProfessionalTrainings(informationSheetId?: number) {
  return useQuery({
    queryKey: professionalTrainingsKeys.list(informationSheetId),
    queryFn: () => professionalTrainingsApi.getAll(informationSheetId),
  })
}

// Get single professional training
export function useProfessionalTraining(id: number) {
  return useQuery({
    queryKey: professionalTrainingsKeys.detail(id),
    queryFn: () => professionalTrainingsApi.getById(id),
    enabled: !!id,
  })
}

// Create professional training
export function useCreateProfessionalTraining() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (training: Partial<ProfessionalTraining> & { informationSheetId?: number }) =>
      professionalTrainingsApi.create(training),
    onSuccess: () => {
      // Invalidate all professional trainings queries to refetch
      queryClient.invalidateQueries({ queryKey: professionalTrainingsKeys.lists() })
    },
  })
}

// Update professional training
export function useUpdateProfessionalTraining() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, training }: { id: number; training: Partial<ProfessionalTraining> & { informationSheetId?: number } }) =>
      professionalTrainingsApi.update(id, training),
    onSuccess: (_, variables) => {
      // Invalidate the specific professional training and all lists
      queryClient.invalidateQueries({ queryKey: professionalTrainingsKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: professionalTrainingsKeys.lists() })
    },
  })
}

// Delete professional training
export function useDeleteProfessionalTraining() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => professionalTrainingsApi.delete(id),
    onSuccess: () => {
      // Invalidate all professional trainings queries to refetch
      queryClient.invalidateQueries({ queryKey: professionalTrainingsKeys.lists() })
    },
  })
}
