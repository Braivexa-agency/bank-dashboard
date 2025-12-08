// Employee Information Section Types

export interface Identification {
  matricule: string
  nom: string
  prenom: string
  nomAr?: string
  prenomAr?: string
  nationalId: string
  fatherName: string
  motherName: string
  fatherNameAr?: string
  motherNameAr?: string
  motherLastNameAr?: string
  spouseName: string
  dateOfBirth: string
  wilayaNaissance?: string
  dairaResidence?: string
  address: string
  adresseAr?: string
  gender: string
  maritalStatus: string
  numberOfChildren: number
}

export interface ProfessionalExperience {
  hireDate: string
  bankingExperience: string
  contractType: string
  socialSecurityNumber: string
  educationLevel: string
  diplomaType: string
  academicDiploma: string
  otherDiplomas: string
}

export interface Position {
  currentPosition: string
  positionCode: string
  activity: string
}

export interface Classification {
  group: string
  classe: string
  echelon: string
  indice: string
  pbi: number
}

export interface Assignment {
  structure: string
  structureType: string
  reporting: string
  code: string
  positioning: string
}

export interface Decision {
  decisionType: string
  decisionNumber: string
  decisionDate: string
  effectiveDate: string
  lastDecision: string
}

export interface Suspension {
  suspensionFrom: string
  suspensionTo: string
}

// Banking Experience Details (already exists as separate entity)
export interface BankingExperienceDetails {
  affectation: string
  poste: string
  activite: string
  natureDecision: string
  refDecision: string
  dateDecision: string
  dateEffet: string
  chargeInterim: string
}

// Non-Banking Experience (already exists as separate entity)
export interface NonBankingExperience {
  entreprise: string
  lieuTravail: string
  posteOccupe: string
  du: string
  au: string
  duree: string
}

// Professional Training (already exists as separate entity)
export interface ProfessionalTraining {
  specialite: string
  autreSpecialite: string
  etablissement: string
  diplome: string
  autreDiplome: string
  observations: string
}

// Composed Employee Information Type
export interface EmployeeInformation extends
  Identification,
  ProfessionalExperience,
  Position,
  Classification,
  Assignment,
  Decision,
  Suspension {
  id: number
}
