import apiClient from '../api-client'
import type { BankExperience } from '@/stores/dataStore'

export interface BankExperienceResponse {
  id: number
  information_sheet_id?: number | null
  affectation: string
  poste: string
  activite: string
  classe: string
  echelon: string
  pbi: number
  nature_decision: string
  ref_decision: string
  date_decision: string
  date_effet: string
  charge_interim: string
  created_at?: string
  updated_at?: string
}

function transformBankExperience(data: BankExperienceResponse): BankExperience {
  return {
    id: data.id,
    affectation: data.affectation,
    poste: data.poste,
    activite: data.activite,
    classe: data.classe,
    echelon: data.echelon,
    pbi: data.pbi,
    natureDecision: data.nature_decision,
    refDecision: data.ref_decision,
    dateDecision: data.date_decision,
    dateEffet: data.date_effet,
    chargeInterim: data.charge_interim,
  }
}

export const bankExperiencesApi = {
  // Get all bank experiences
  getAll: async (informationSheetId?: number): Promise<BankExperience[]> => {
    const params = informationSheetId ? { information_sheet_id: informationSheetId } : {}
    const response = await apiClient.get<BankExperienceResponse[]>('/bank-experiences', { params })
    const data = Array.isArray(response.data) ? response.data : []
    return data.map(transformBankExperience)
  },

  // Get single bank experience
  getById: async (id: number): Promise<BankExperience> => {
    const response = await apiClient.get<BankExperienceResponse>(`/bank-experiences/${id}`)
    return transformBankExperience(response.data)
  },

  // Create bank experience
  create: async (experience: Partial<BankExperience> & { information_sheet_id?: number }): Promise<BankExperience> => {
    const apiData = {
      information_sheet_id: experience.information_sheet_id || null,
      affectation: experience.affectation,
      poste: experience.poste,
      activite: experience.activite,
      classe: experience.classe,
      echelon: experience.echelon,
      pbi: experience.pbi || 0,
      nature_decision: experience.natureDecision,
      ref_decision: experience.refDecision,
      date_decision: experience.dateDecision,
      date_effet: experience.dateEffet,
      charge_interim: experience.chargeInterim || 'No',
    }

    const response = await apiClient.post<BankExperienceResponse>('/bank-experiences', apiData)
    return transformBankExperience(response.data)
  },

  // Update bank experience
  update: async (id: number, experience: Partial<BankExperience> & { information_sheet_id?: number }): Promise<BankExperience> => {
    const apiData: Record<string, unknown> = {}
    
    if (experience.information_sheet_id !== undefined) apiData.information_sheet_id = experience.information_sheet_id
    if (experience.affectation !== undefined) apiData.affectation = experience.affectation
    if (experience.poste !== undefined) apiData.poste = experience.poste
    if (experience.activite !== undefined) apiData.activite = experience.activite
    if (experience.classe !== undefined) apiData.classe = experience.classe
    if (experience.echelon !== undefined) apiData.echelon = experience.echelon
    if (experience.pbi !== undefined) apiData.pbi = experience.pbi
    if (experience.natureDecision !== undefined) apiData.nature_decision = experience.natureDecision
    if (experience.refDecision !== undefined) apiData.ref_decision = experience.refDecision
    if (experience.dateDecision !== undefined) apiData.date_decision = experience.dateDecision
    if (experience.dateEffet !== undefined) apiData.date_effet = experience.dateEffet
    if (experience.chargeInterim !== undefined) apiData.charge_interim = experience.chargeInterim

    const response = await apiClient.put<BankExperienceResponse>(`/bank-experiences/${id}`, apiData)
    return transformBankExperience(response.data)
  },

  // Delete bank experience
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/bank-experiences/${id}`)
  },
}

