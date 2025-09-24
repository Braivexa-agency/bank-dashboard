import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

export interface InformationSheet {
  id: number
  matricule: string
  nom: string
  prenom: string
  nationalId: string
  fatherName: string
  motherName: string
  spouseName: string
  dateOfBirth: string
  address: string
  gender: string
  maritalStatus: string
  numberOfChildren: number
  hireDate: string
  bankingExperience: string
  contractType: string
  socialSecurityNumber: string
  educationLevel: string
  diplomaType: string
  academicDiploma: string
  otherDiplomas: string
  currentPosition: string
  positionCode: string
  group: string
  activity: string
  classe: string
  echelon: string
  indice: string
  pbi: string
  structure: string
  reporting: string
  code: string
  structureType: string
  decisionType: string
  decisionNumber: string
  decisionDate: string
  effectiveDate: string
  positioning: string
  suspensionFrom: string
  suspensionTo: string
  lastDecision: string
  // Banking Experience specific fields
  affectation: string
  poste: string
  activite: string
  natureDecision: string
  refDecision: string
  dateDecision: string
  dateEffet: string
  chargeInterim: string
}

type InformationSheetDialogType = 'add' | 'edit' | 'delete'

interface InformationSheetContextType {
  open: InformationSheetDialogType | null
  setOpen: (str: InformationSheetDialogType | null) => void
  currentRow: InformationSheet | null
  setCurrentRow: React.Dispatch<React.SetStateAction<InformationSheet | null>>
  informationSheets: InformationSheet[]
  setInformationSheets: React.Dispatch<React.SetStateAction<InformationSheet[]>>
}

const InformationSheetContext = React.createContext<InformationSheetContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function InformationSheetProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<InformationSheetDialogType>(null)
  const [currentRow, setCurrentRow] = useState<InformationSheet | null>(null)
  const [informationSheets, setInformationSheets] = useState<InformationSheet[]>([
    {
      id: 1,
      matricule: "EMP001",
      nom: "Benali",
      prenom: "Ahmed",
      nationalId: "1234567890123",
      fatherName: "Mohamed Benali",
      motherName: "Aicha Benali",
      spouseName: "Fatima Benali",
      dateOfBirth: "1985-03-15",
      address: "123 Rue de la République, Algiers",
      gender: "M",
      maritalStatus: "Married",
      numberOfChildren: 2,
      hireDate: "2010-06-01",
      bankingExperience: "14 years",
      contractType: "CDI",
      socialSecurityNumber: "123456789012",
      educationLevel: "University",
      diplomaType: "Master's Degree",
      academicDiploma: "Master in Banking and Finance",
      otherDiplomas: "CFA Level 1",
      currentPosition: "Senior Credit Officer",
      positionCode: "CRD001",
      group: "Executive",
      activity: "Credit Analysis",
      classe: "Executive",
      echelon: "12",
      indice: "450",
      pbi: "Yes",
      structure: "Credit Department",
      reporting: "Credit Manager",
      code: "CRD",
      structureType: "Department",
      decisionType: "Positioning",
      decisionNumber: "DEC-2023-001",
      decisionDate: "2023-01-15",
      effectiveDate: "2023-02-01",
      positioning: "Senior Level",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Promotion to Senior Credit Officer",
      // Banking Experience fields
      affectation: "Regional Directorate Algiers",
      poste: "Senior Credit Officer",
      activite: "Credit analysis and approval",
      natureDecision: "Promotion",
      refDecision: "DR-2023-001",
      dateDecision: "2023-01-15",
      dateEffet: "2023-02-01",
      chargeInterim: "No",
    },
    {
      id: 2,
      matricule: "EMP002",
      nom: "Kadri",
      prenom: "Sara",
      nationalId: "9876543210987",
      fatherName: "Ali Kadri",
      motherName: "Fatima Kadri",
      spouseName: "",
      dateOfBirth: "1990-07-22",
      address: "456 Avenue des Martyrs, Oran",
      gender: "F",
      maritalStatus: "Single",
      numberOfChildren: 0,
      hireDate: "2015-09-01",
      bankingExperience: "9 years",
      contractType: "CDI",
      socialSecurityNumber: "987654321098",
      educationLevel: "University",
      diplomaType: "Bachelor's Degree",
      academicDiploma: "Bachelor in Economics",
      otherDiplomas: "Banking Certificate",
      currentPosition: "Customer Service Representative",
      positionCode: "CSR001",
      group: "Execution",
      activity: "Customer Service",
      classe: "Execution",
      echelon: "8",
      indice: "320",
      pbi: "No",
      structure: "Customer Service",
      reporting: "Service Manager",
      code: "CSR",
      structureType: "Department",
      decisionType: "Positioning",
      decisionNumber: "DEC-2022-045",
      decisionDate: "2022-06-01",
      effectiveDate: "2022-07-01",
      positioning: "Standard Level",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Annual performance review",
      // Banking Experience fields
      affectation: "Downtown Branch",
      poste: "Customer Service Representative",
      activite: "Customer service and support",
      natureDecision: "Recruitment",
      refDecision: "DR-2015-012",
      dateDecision: "2015-08-15",
      dateEffet: "2015-09-01",
      chargeInterim: "No",
    },
    {
      id: 3,
      matricule: "EMP003",
      nom: "Boumediene",
      prenom: "Omar",
      nationalId: "4567891234567",
      fatherName: "Hassan Boumediene",
      motherName: "Fatima Boumediene",
      spouseName: "Aicha Boumediene",
      dateOfBirth: "1978-12-10",
      address: "789 Boulevard de la Victoire, Constantine",
      gender: "M",
      maritalStatus: "Married",
      numberOfChildren: 3,
      hireDate: "2005-03-15",
      bankingExperience: "19 years",
      contractType: "CDI",
      socialSecurityNumber: "456789123456",
      educationLevel: "Post Graduate",
      diplomaType: "MBA",
      academicDiploma: "Master of Business Administration",
      otherDiplomas: "Risk Management Certificate",
      currentPosition: "Branch Manager",
      positionCode: "BM001",
      group: "Senior Executive",
      activity: "Branch Management",
      classe: "Senior Executive",
      echelon: "15",
      indice: "650",
      pbi: "Yes",
      structure: "Regional Branch",
      reporting: "Regional Director",
      code: "BM",
      structureType: "Branch",
      decisionType: "Positioning",
      decisionNumber: "DEC-2023-012",
      decisionDate: "2023-03-01",
      effectiveDate: "2023-04-01",
      positioning: "Management Level",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Promotion to Branch Manager",
      // Banking Experience fields
      affectation: "Hydra Branch",
      poste: "Branch Manager",
      activite: "Branch management and operations",
      natureDecision: "Promotion",
      refDecision: "DR-2023-012",
      dateDecision: "2023-03-01",
      dateEffet: "2023-04-01",
      chargeInterim: "No",
    },
  ])

  return (
    <InformationSheetContext.Provider 
      value={{ 
        open, 
        setOpen, 
        currentRow, 
        setCurrentRow, 
        informationSheets, 
        setInformationSheets
      }}
    >
      {children}
    </InformationSheetContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInformationSheet = () => {
  const informationSheetContext = React.useContext(InformationSheetContext)

  if (!informationSheetContext) {
    throw new Error('useInformationSheet has to be used within <InformationSheetProvider>')
  }

  return informationSheetContext
}
