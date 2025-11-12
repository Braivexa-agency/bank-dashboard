import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { informationSheetsApi } from '@/lib/api/information-sheets'
import type { InformationSheet } from '@/stores/dataStore'
import { toast } from 'sonner'

export function useInformationSheets() {
  return useQuery({
    queryKey: ['information-sheets'],
    queryFn: () => informationSheetsApi.getAll(),
  })
}

export function useInformationSheet(id: number) {
  return useQuery({
    queryKey: ['information-sheets', id],
    queryFn: () => informationSheetsApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateInformationSheet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sheet: Partial<InformationSheet>) => informationSheetsApi.create(sheet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['information-sheets'] })
      toast.success('Information sheet created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create information sheet')
      console.error(error)
    },
  })
}

export function useUpdateInformationSheet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InformationSheet> }) =>
      informationSheetsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['information-sheets'] })
      queryClient.invalidateQueries({ queryKey: ['information-sheets', variables.id] })
      toast.success('Information sheet updated successfully')
    },
    onError: (error) => {
      toast.error('Failed to update information sheet')
      console.error(error)
    },
  })
}

export function useDeleteInformationSheet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => informationSheetsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['information-sheets'] })
      toast.success('Information sheet deleted successfully')
    },
    onError: (error) => {
      toast.error('Failed to delete information sheet')
      console.error(error)
    },
  })
}

