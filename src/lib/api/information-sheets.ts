import apiClient from '../api-client'
import type { InformationSheet } from '@/stores/dataStore'

export interface InformationSheetResponse extends InformationSheet {
  bank_experiences?: BankExperience[]
  non_bank_experiences?: NonBankExperience[]
  disciplinary_actions?: DisciplinaryAction[]
  professional_trainings?: ProfessionalTraining[]
}

export interface BankExperience {
  id: number
  information_sheet_id?: number
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

export interface NonBankExperience {
  id: number
  information_sheet_id?: number
  entreprise: string
  lieu_travail: string
  poste_occupe: string
  du: string
  au: string
  duree: string | null
  created_at?: string
  updated_at?: string
}

export interface DisciplinaryAction {
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

export interface ProfessionalTraining {
  id: number
  information_sheet_id: number
  specialite: string | null
  autre_specialite: string | null
  etablissement: string | null
  diplome: string | null
  autre_diplome: string | null
  observations: string | null
  created_at?: string
  updated_at?: string
}

// Transform API response to match frontend format
function transformInformationSheet(data: any): InformationSheet {
  return {
    id: data.id,
    matricule: data.matricule,
    nom: data.nom,
    prenom: data.prenom,
    nationalId: data.national_id,
    fatherName: data.father_name || '',
    motherName: data.mother_name || '',
    spouseName: data.spouse_name || '',
    dateOfBirth: data.date_of_birth,
    address: data.address || '',
    gender: data.gender,
    maritalStatus: data.marital_status,
    numberOfChildren: data.number_of_children || 0,
    hireDate: data.hire_date,
    bankingExperience: data.banking_experience || '',
    contractType: data.contract_type,
    socialSecurityNumber: data.social_security_number || '',
    educationLevel: data.education_level || '',
    diplomaType: data.diploma_type || '',
    academicDiploma: data.academic_diploma || '',
    otherDiplomas: data.other_diplomas || '',
    currentPosition: data.current_position,
    positionCode: data.position_code || '',
    group: data.group,
    activity: data.activity || '',
    classe: data.classe || '',
    echelon: data.echelon || '',
    indice: data.indice || '',
    pbi: data.pbi || 0,
    structure: data.structure,
    reporting: data.reporting || '',
    code: data.code || '',
    structureType: data.structure_type || '',
    decisionType: data.decision_type || '',
    decisionNumber: data.decision_number || '',
    decisionDate: data.decision_date || '',
    effectiveDate: data.effective_date || '',
    positioning: data.positioning || '',
    suspensionFrom: data.suspension_from || '',
    suspensionTo: data.suspension_to || '',
    lastDecision: data.last_decision || '',
    // Banking Experience fields
    affectation: data.affectation || '',
    poste: data.poste || '',
    activite: data.activite || '',
    natureDecision: data.nature_decision || '',
    refDecision: data.ref_decision || '',
    dateDecision: data.date_decision || '',
    dateEffet: data.date_effet || '',
    chargeInterim: data.charge_interim || '',
    // Non-Banking Experience fields
    entreprise: data.entreprise || '',
    lieuTravail: data.lieu_travail || '',
    posteOccupe: data.poste_occupe || '',
    du: data.du || '',
    au: data.au || '',
    duree: data.duree || '',
    // Professional Training fields
    specialite: data.specialite || '',
    autreSpecialite: data.autre_specialite || '',
    etablissement: data.etablissement || '',
    diplome: data.diplome || '',
    autreDiplome: data.autre_diplome || '',
    observations: data.observations || '',
    // Related data
    disciplinaryActions: (data.disciplinary_actions || []).map((da: any) => ({
      id: da.id,
      typeSanction: da.type_sanction,
      classification: da.classification,
      numeroDecision: da.numero_decision,
      dateDecision: da.date_decision,
      dateEffet: da.date_effet,
      motifSanction: da.motif_sanction,
    })),
  }
}

// API functions
export const informationSheetsApi = {
  // Get all information sheets
  getAll: async (): Promise<InformationSheet[]> => {
    const response = await apiClient.get<{ data?: InformationSheetResponse[] }>('/information-sheets')
    const data = response.data as any
    const sheets = Array.isArray(data) ? data : (data?.data || [])
    return sheets.map(transformInformationSheet)
  },

  // Get single information sheet
  getById: async (id: number): Promise<InformationSheet> => {
    const response = await apiClient.get<InformationSheetResponse>(`/information-sheets/${id}`)
    return transformInformationSheet(response.data)
  },

  // Create information sheet
  create: async (sheet: Partial<InformationSheet>): Promise<InformationSheet> => {
    // Transform frontend format to API format
    const apiData: any = {
      matricule: sheet.matricule,
      nom: sheet.nom,
      prenom: sheet.prenom,
      national_id: sheet.nationalId,
      father_name: sheet.fatherName,
      mother_name: sheet.motherName,
      spouse_name: sheet.spouseName,
      date_of_birth: sheet.dateOfBirth,
      address: sheet.address,
      gender: sheet.gender,
      marital_status: sheet.maritalStatus,
      number_of_children: sheet.numberOfChildren,
      hire_date: sheet.hireDate,
      banking_experience: sheet.bankingExperience,
      contract_type: sheet.contractType,
      social_security_number: sheet.socialSecurityNumber,
      education_level: sheet.educationLevel,
      diploma_type: sheet.diplomaType,
      academic_diploma: sheet.academicDiploma,
      other_diplomas: sheet.otherDiplomas,
      current_position: sheet.currentPosition,
      position_code: sheet.positionCode,
      group: sheet.group,
      activity: sheet.activity,
      classe: sheet.classe,
      echelon: sheet.echelon,
      indice: sheet.indice,
      pbi: sheet.pbi,
      structure: sheet.structure,
      reporting: sheet.reporting,
      code: sheet.code,
      structure_type: sheet.structureType,
      decision_type: sheet.decisionType,
      decision_number: sheet.decisionNumber,
      decision_date: sheet.decisionDate,
      effective_date: sheet.effectiveDate,
      positioning: sheet.positioning,
      suspension_from: sheet.suspensionFrom,
      suspension_to: sheet.suspensionTo,
      last_decision: sheet.lastDecision,
    }

    const response = await apiClient.post<InformationSheetResponse>('/information-sheets', apiData)
    return transformInformationSheet(response.data)
  },

  // Update information sheet
  update: async (id: number, sheet: Partial<InformationSheet>): Promise<InformationSheet> => {
    const apiData: any = {}
    
    if (sheet.matricule !== undefined) apiData.matricule = sheet.matricule
    if (sheet.nom !== undefined) apiData.nom = sheet.nom
    if (sheet.prenom !== undefined) apiData.prenom = sheet.prenom
    if (sheet.nationalId !== undefined) apiData.national_id = sheet.nationalId
    if (sheet.fatherName !== undefined) apiData.father_name = sheet.fatherName
    if (sheet.motherName !== undefined) apiData.mother_name = sheet.motherName
    if (sheet.spouseName !== undefined) apiData.spouse_name = sheet.spouseName
    if (sheet.dateOfBirth !== undefined) apiData.date_of_birth = sheet.dateOfBirth
    if (sheet.address !== undefined) apiData.address = sheet.address
    if (sheet.gender !== undefined) apiData.gender = sheet.gender
    if (sheet.maritalStatus !== undefined) apiData.marital_status = sheet.maritalStatus
    if (sheet.numberOfChildren !== undefined) apiData.number_of_children = sheet.numberOfChildren
    if (sheet.hireDate !== undefined) apiData.hire_date = sheet.hireDate
    if (sheet.bankingExperience !== undefined) apiData.banking_experience = sheet.bankingExperience
    if (sheet.contractType !== undefined) apiData.contract_type = sheet.contractType
    if (sheet.socialSecurityNumber !== undefined) apiData.social_security_number = sheet.socialSecurityNumber
    if (sheet.educationLevel !== undefined) apiData.education_level = sheet.educationLevel
    if (sheet.diplomaType !== undefined) apiData.diploma_type = sheet.diplomaType
    if (sheet.academicDiploma !== undefined) apiData.academic_diploma = sheet.academicDiploma
    if (sheet.otherDiplomas !== undefined) apiData.other_diplomas = sheet.otherDiplomas
    if (sheet.currentPosition !== undefined) apiData.current_position = sheet.currentPosition
    if (sheet.positionCode !== undefined) apiData.position_code = sheet.positionCode
    if (sheet.group !== undefined) apiData.group = sheet.group
    if (sheet.activity !== undefined) apiData.activity = sheet.activity
    if (sheet.classe !== undefined) apiData.classe = sheet.classe
    if (sheet.echelon !== undefined) apiData.echelon = sheet.echelon
    if (sheet.indice !== undefined) apiData.indice = sheet.indice
    if (sheet.pbi !== undefined) apiData.pbi = sheet.pbi
    if (sheet.structure !== undefined) apiData.structure = sheet.structure
    if (sheet.reporting !== undefined) apiData.reporting = sheet.reporting
    if (sheet.code !== undefined) apiData.code = sheet.code
    if (sheet.structureType !== undefined) apiData.structure_type = sheet.structureType
    if (sheet.decisionType !== undefined) apiData.decision_type = sheet.decisionType
    if (sheet.decisionNumber !== undefined) apiData.decision_number = sheet.decisionNumber
    if (sheet.decisionDate !== undefined) apiData.decision_date = sheet.decisionDate
    if (sheet.effectiveDate !== undefined) apiData.effective_date = sheet.effectiveDate
    if (sheet.positioning !== undefined) apiData.positioning = sheet.positioning
    if (sheet.suspensionFrom !== undefined) apiData.suspension_from = sheet.suspensionFrom
    if (sheet.suspensionTo !== undefined) apiData.suspension_to = sheet.suspensionTo
    if (sheet.lastDecision !== undefined) apiData.last_decision = sheet.lastDecision

    const response = await apiClient.put<InformationSheetResponse>(`/information-sheets/${id}`, apiData)
    return transformInformationSheet(response.data)
  },

  // Delete information sheet
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/information-sheets/${id}`)
  },
}

