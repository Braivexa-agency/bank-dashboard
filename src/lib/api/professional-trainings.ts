import apiClient from '../api-client'

export interface ProfessionalTraining {
  id: number
  informationSheetId?: number
  specialite: string | null
  autreSpecialite: string | null
  etablissement: string | null
  diplome: string | null
  autreDiplome: string | null
  observations: string | null
}

export interface ProfessionalTrainingResponse {
  id: number
  information_sheet_id?: number
  specialite: string | null
  autre_specialite: string | null
  etablissement: string | null
  diplome: string | null
  autre_diplome: string | null
  observations: string | null
  created_at?: string
  updated_at?: string
}

function transformProfessionalTraining(data: ProfessionalTrainingResponse): ProfessionalTraining {
  return {
    id: data.id,
    informationSheetId: data.information_sheet_id,
    specialite: data.specialite,
    autreSpecialite: data.autre_specialite,
    etablissement: data.etablissement,
    diplome: data.diplome,
    autreDiplome: data.autre_diplome,
    observations: data.observations,
  }
}

export const professionalTrainingsApi = {
  // Get all professional trainings
  getAll: async (informationSheetId?: number): Promise<ProfessionalTraining[]> => {
    const params = informationSheetId ? { information_sheet_id: informationSheetId } : {}
    const response = await apiClient.get<ProfessionalTrainingResponse[]>('/professional-trainings', { params })
    const data = Array.isArray(response.data) ? response.data : []
    return data.map(transformProfessionalTraining)
  },

  // Get single professional training
  getById: async (id: number): Promise<ProfessionalTraining> => {
    const response = await apiClient.get<ProfessionalTrainingResponse>(`/professional-trainings/${id}`)
    return transformProfessionalTraining(response.data)
  },

  // Create professional training
  create: async (training: Partial<ProfessionalTraining> & { informationSheetId?: number }): Promise<ProfessionalTraining> => {
    const apiData = {
      information_sheet_id: training.informationSheetId,
      specialite: training.specialite || null,
      autre_specialite: training.autreSpecialite || null,
      etablissement: training.etablissement || null,
      diplome: training.diplome || null,
      autre_diplome: training.autreDiplome || null,
      observations: training.observations || null,
    }

    const response = await apiClient.post<ProfessionalTrainingResponse>('/professional-trainings', apiData)
    return transformProfessionalTraining(response.data)
  },

  // Update professional training
  update: async (id: number, training: Partial<ProfessionalTraining> & { informationSheetId?: number }): Promise<ProfessionalTraining> => {
    const apiData: Record<string, unknown> = {}
    
    if (training.informationSheetId !== undefined) apiData.information_sheet_id = training.informationSheetId
    if (training.specialite !== undefined) apiData.specialite = training.specialite
    if (training.autreSpecialite !== undefined) apiData.autre_specialite = training.autreSpecialite
    if (training.etablissement !== undefined) apiData.etablissement = training.etablissement
    if (training.diplome !== undefined) apiData.diplome = training.diplome
    if (training.autreDiplome !== undefined) apiData.autre_diplome = training.autreDiplome
    if (training.observations !== undefined) apiData.observations = training.observations

    const response = await apiClient.put<ProfessionalTrainingResponse>(`/professional-trainings/${id}`, apiData)
    return transformProfessionalTraining(response.data)
  },

  // Delete professional training
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/professional-trainings/${id}`)
  },
}
