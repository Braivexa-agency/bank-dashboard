import apiClient from '../api-client'
import type { NonBankExperience } from '@/stores/dataStore'

export interface NonBankExperienceResponse {
  id: number
  information_sheet_id?: number | null
  entreprise: string
  lieu_travail: string
  poste_occupe: string
  du: string
  au: string
  duree: string | null
  created_at?: string
  updated_at?: string
}

function transformNonBankExperience(data: NonBankExperienceResponse): NonBankExperience {
  return {
    id: data.id,
    entreprise: data.entreprise,
    lieuTravail: data.lieu_travail,
    posteOccupe: data.poste_occupe,
    du: data.du,
    au: data.au,
    duree: data.duree || '',
  }
}

export const nonBankExperiencesApi = {
  // Get all non-bank experiences
  getAll: async (informationSheetId?: number): Promise<NonBankExperience[]> => {
    const params = informationSheetId ? { information_sheet_id: informationSheetId } : {}
    const response = await apiClient.get<NonBankExperienceResponse[]>('/non-bank-experiences', { params })
    const data = Array.isArray(response.data) ? response.data : []
    return data.map(transformNonBankExperience)
  },

  // Get single non-bank experience
  getById: async (id: number): Promise<NonBankExperience> => {
    const response = await apiClient.get<NonBankExperienceResponse>(`/non-bank-experiences/${id}`)
    return transformNonBankExperience(response.data)
  },

  // Create non-bank experience
  create: async (experience: Partial<NonBankExperience> & { information_sheet_id?: number }): Promise<NonBankExperience> => {
    const apiData = {
      information_sheet_id: experience.information_sheet_id || null,
      entreprise: experience.entreprise,
      lieu_travail: experience.lieuTravail,
      poste_occupe: experience.posteOccupe,
      du: experience.du,
      au: experience.au,
      duree: experience.duree || null,
    }

    const response = await apiClient.post<NonBankExperienceResponse>('/non-bank-experiences', apiData)
    return transformNonBankExperience(response.data)
  },

  // Update non-bank experience
  update: async (id: number, experience: Partial<NonBankExperience> & { information_sheet_id?: number }): Promise<NonBankExperience> => {
    const apiData: Record<string, unknown> = {}
    
    if (experience.information_sheet_id !== undefined) apiData.information_sheet_id = experience.information_sheet_id
    if (experience.entreprise !== undefined) apiData.entreprise = experience.entreprise
    if (experience.lieuTravail !== undefined) apiData.lieu_travail = experience.lieuTravail
    if (experience.posteOccupe !== undefined) apiData.poste_occupe = experience.posteOccupe
    if (experience.du !== undefined) apiData.du = experience.du
    if (experience.au !== undefined) apiData.au = experience.au
    if (experience.duree !== undefined) apiData.duree = experience.duree

    const response = await apiClient.put<NonBankExperienceResponse>(`/non-bank-experiences/${id}`, apiData)
    return transformNonBankExperience(response.data)
  },

  // Delete non-bank experience
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/non-bank-experiences/${id}`)
  },
}

