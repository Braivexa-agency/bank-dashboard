import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

export interface BankExperience {
  id: number
  affectation: string
  poste: string
  activite: string
  classe: string
  echelon: string
  pbi: number
  natureDecision: string
  refDecision: string
  dateDecision: string
  dateEffet: string
  chargeInterim: string
}

export interface EmployeeInfo {
  employeeId: string
  lastName: string
  firstName: string
  fatherName: string
  motherName: string
  dateOfBirth: string
  maritalStatus: string
  gender: string
  spouseName: string
  currentPosition: string
  group: string
  hireDate: string
  contractType: string
  assignment: string
  structure: string
  reporting: string
  code: string
  structureType: string
  activity: string
  bankingExperience: string
  positioning: string
}

type BankExperienceDialogType = 'add' | 'edit' | 'delete'

interface BankExperienceContextType {
  open: BankExperienceDialogType | null
  setOpen: (str: BankExperienceDialogType | null) => void
  currentRow: BankExperience | null
  setCurrentRow: React.Dispatch<React.SetStateAction<BankExperience | null>>
  bankExperiences: BankExperience[]
  setBankExperiences: React.Dispatch<React.SetStateAction<BankExperience[]>>
  employeeInfo: EmployeeInfo | null
  setEmployeeInfo: React.Dispatch<React.SetStateAction<EmployeeInfo | null>>
}

const BankExperienceContext = React.createContext<BankExperienceContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function BankExperienceProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<BankExperienceDialogType>(null)
  const [currentRow, setCurrentRow] = useState<BankExperience | null>(null)
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null)
  const [bankExperiences, setBankExperiences] = useState<BankExperience[]>([
    {
      id: 1,
      affectation: "Regional Directorate Algiers",
      poste: "Customer Advisor",
      activite: "Customer portfolio management",
      classe: "Executive",
      echelon: "12",
      pbi: 1,
      natureDecision: "Appointment",
      refDecision: "DR-2023-001",
      dateDecision: "2023-01-15",
      dateEffet: "2023-02-01",
      chargeInterim: "No",
    },
    {
      id: 2,
      affectation: "Downtown Branch",
      poste: "Credit Officer",
      activite: "Credit analysis and approval",
      classe: "Executive",
      echelon: "10",
      pbi: 1,
      natureDecision: "Promotion",
      refDecision: "DR-2022-045",
      dateDecision: "2022-06-01",
      dateEffet: "2022-07-01",
      chargeInterim: "No",
    },
    {
      id: 3,
      affectation: "Hydra Branch",
      poste: "Teller",
      activite: "Daily banking operations",
      classe: "Execution",
      echelon: "8",
      pbi: 0,
      natureDecision: "Recruitment",
      refDecision: "DR-2020-012",
      dateDecision: "2020-03-01",
      dateEffet: "2020-04-01",
      chargeInterim: "No",
    },
  ])

  return (
    <BankExperienceContext.Provider 
      value={{ 
        open, 
        setOpen, 
        currentRow, 
        setCurrentRow, 
        bankExperiences, 
        setBankExperiences,
        employeeInfo,
        setEmployeeInfo
      }}
    >
      {children}
    </BankExperienceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBankExperience = () => {
  const bankExperienceContext = React.useContext(BankExperienceContext)

  if (!bankExperienceContext) {
    throw new Error('useBankExperience has to be used within <BankExperienceProvider>')
  }

  return bankExperienceContext
}
