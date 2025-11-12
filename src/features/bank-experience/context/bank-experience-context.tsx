import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { useBankExperiences } from '@/hooks/use-bank-experiences'
import type { BankExperience } from '@/stores/dataStore'

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
  isLoading: boolean
  employeeInfo: EmployeeInfo | null
  setEmployeeInfo: React.Dispatch<React.SetStateAction<EmployeeInfo | null>>
}

const BankExperienceContext = React.createContext<BankExperienceContextType | null>(null)

interface Props {
  children: React.ReactNode
  informationSheetId?: number
}

export default function BankExperienceProvider({ children, informationSheetId }: Props) {
  const [open, setOpen] = useDialogState<BankExperienceDialogType>(null)
  const [currentRow, setCurrentRow] = useState<BankExperience | null>(null)
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null)
  
  // Fetch bank experiences from API
  const { data: bankExperiences = [], isLoading } = useBankExperiences(informationSheetId)

  return (
    <BankExperienceContext.Provider 
      value={{ 
        open, 
        setOpen, 
        currentRow, 
        setCurrentRow, 
        bankExperiences, 
        isLoading,
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
