import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

export interface NonBankExperience {
  id: number
  entreprise: string
  lieuTravail: string
  posteOccupe: string
  du: string
  au: string
  duree: string
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

type NonBankExperienceDialogType = 'add' | 'edit' | 'delete'

interface NonBankExperienceContextType {
  open: NonBankExperienceDialogType | null
  setOpen: (str: NonBankExperienceDialogType | null) => void
  currentRow: NonBankExperience | null
  setCurrentRow: React.Dispatch<React.SetStateAction<NonBankExperience | null>>
  nonBankExperiences: NonBankExperience[]
  setNonBankExperiences: React.Dispatch<React.SetStateAction<NonBankExperience[]>>
  employeeInfo: EmployeeInfo | null
  setEmployeeInfo: React.Dispatch<React.SetStateAction<EmployeeInfo | null>>
}

const NonBankExperienceContext = React.createContext<NonBankExperienceContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function NonBankExperienceProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<NonBankExperienceDialogType>(null)
  const [currentRow, setCurrentRow] = useState<NonBankExperience | null>(null)
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null)
  const [nonBankExperiences, setNonBankExperiences] = useState<NonBankExperience[]>([
    {
      id: 1,
      entreprise: "Tech Solutions Inc.",
      lieuTravail: "Algiers, Algeria",
      posteOccupe: "Software Developer",
      du: "2020-01-15",
      au: "2022-03-30",
      duree: "2 years 2 months",
    },
    {
      id: 2,
      entreprise: "Digital Marketing Agency",
      lieuTravail: "Oran, Algeria",
      posteOccupe: "Marketing Specialist",
      du: "2018-06-01",
      au: "2019-12-31",
      duree: "1 year 6 months",
    },
    {
      id: 3,
      entreprise: "Consulting Firm",
      lieuTravail: "Constantine, Algeria",
      posteOccupe: "Business Analyst",
      du: "2017-03-01",
      au: "2018-05-31",
      duree: "1 year 2 months",
    },
  ])

  return (
    <NonBankExperienceContext.Provider 
      value={{ 
        open, 
        setOpen, 
        currentRow, 
        setCurrentRow, 
        nonBankExperiences, 
        setNonBankExperiences,
        employeeInfo,
        setEmployeeInfo
      }}
    >
      {children}
    </NonBankExperienceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNonBankExperience = () => {
  const nonBankExperienceContext = React.useContext(NonBankExperienceContext)

  if (!nonBankExperienceContext) {
    throw new Error('useNonBankExperience has to be used within <NonBankExperienceProvider>')
  }

  return nonBankExperienceContext
}
