import apiClient from '../api-client'
import type { DisciplinaryAction } from '@/stores/dataStore'

export interface DisciplinaryActionResponse {
  id: number
  information_sheet_id: number
  type_sanction: string
  classification: string
  numero_decision: string
  date_decision: string
  date_effet: string
  motif_sanction: string
  created_at?: string
  updated_at?: string
}

function transformDisciplinaryAction(data: DisciplinaryActionResponse): DisciplinaryAction {
  return {
    id: data.id,
    typeSanction: data.type_sanction,
    classification: data.classification,
    numeroDecision: data.numero_decision,
    dateDecision: data.date_decision,
    dateEffet: data.date_effet,
    motifSanction: data.motif_sanction,
  }
}

export const disciplinaryActionsApi = {
  // Get all disciplinary actions
  getAll: async (informationSheetId?: number): Promise<DisciplinaryAction[]> => {
    const params = informationSheetId ? { information_sheet_id: informationSheetId } : {}
    const response = await apiClient.get<DisciplinaryActionResponse[]>('/disciplinary-actions', { params })
    const data = Array.isArray(response.data) ? response.data : []
    return data.map(transformDisciplinaryAction)
  },

  // Get single disciplinary action
  getById: async (id: number): Promise<DisciplinaryAction> => {
    const response = await apiClient.get<DisciplinaryActionResponse>(`/disciplinary-actions/${id}`)
    return transformDisciplinaryAction(response.data)
  },

  // Create disciplinary action
  create: async (action: Partial<DisciplinaryAction> & { informationSheetId: number }): Promise<DisciplinaryAction> => {
    const apiData = {
      information_sheet_id: action.informationSheetId,
      type_sanction: action.typeSanction,
      classification: action.classification,
      numero_decision: action.numeroDecision,
      date_decision: action.dateDecision,
      date_effet: action.dateEffet,
      motif_sanction: action.motifSanction,
    }

    const response = await apiClient.post<DisciplinaryActionResponse>('/disciplinary-actions', apiData)
    return transformDisciplinaryAction(response.data)
  },

  // Update disciplinary action
  update: async (id: number, action: Partial<DisciplinaryAction> & { informationSheetId?: number }): Promise<DisciplinaryAction> => {
    const apiData: Record<string, unknown> = {}
    
    if (action.informationSheetId !== undefined) apiData.information_sheet_id = action.informationSheetId
    if (action.typeSanction !== undefined) apiData.type_sanction = action.typeSanction
    if (action.classification !== undefined) apiData.classification = action.classification
    if (action.numeroDecision !== undefined) apiData.numero_decision = action.numeroDecision
    if (action.dateDecision !== undefined) apiData.date_decision = action.dateDecision
    if (action.dateEffet !== undefined) apiData.date_effet = action.dateEffet
    if (action.motifSanction !== undefined) apiData.motif_sanction = action.motifSanction

    const response = await apiClient.put<DisciplinaryActionResponse>(`/disciplinary-actions/${id}`, apiData)
    return transformDisciplinaryAction(response.data)
  },

  // Delete disciplinary action
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/disciplinary-actions/${id}`)
  },
}

