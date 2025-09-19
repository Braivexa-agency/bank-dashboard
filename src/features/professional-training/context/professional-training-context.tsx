import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

export interface ProfessionalTraining {
  id: number
  specialite: string
  autreSpecialite: string
  etablissement: string
  du: string
  au: string
  diplome: string
  autreDiplome: string
  observations: string
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

type ProfessionalTrainingDialogType = 'add' | 'edit' | 'delete'

interface ProfessionalTrainingContextType {
  open: ProfessionalTrainingDialogType | null
  setOpen: (str: ProfessionalTrainingDialogType | null) => void
  currentRow: ProfessionalTraining | null
  setCurrentRow: React.Dispatch<React.SetStateAction<ProfessionalTraining | null>>
  professionalTrainings: ProfessionalTraining[]
  setProfessionalTrainings: React.Dispatch<React.SetStateAction<ProfessionalTraining[]>>
  employeeInfo: EmployeeInfo | null
  setEmployeeInfo: React.Dispatch<React.SetStateAction<EmployeeInfo | null>>
}

const ProfessionalTrainingContext = React.createContext<ProfessionalTrainingContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ProfessionalTrainingProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ProfessionalTrainingDialogType>(null)
  const [currentRow, setCurrentRow] = useState<ProfessionalTraining | null>(null)
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null)
  const [professionalTrainings, setProfessionalTrainings] = useState<ProfessionalTraining[]>([
    {
      id: 1,
      specialite: "Banking & Finance",
      autreSpecialite: "Risk Management",
      etablissement: "Algiers Business School",
      du: "2020-09-01",
      au: "2021-06-30",
      diplome: "Master's Degree",
      autreDiplome: "Professional Certificate",
      observations: "Completed with distinction",
    },
    {
      id: 2,
      specialite: "Information Technology",
      autreSpecialite: "Cybersecurity",
      etablissement: "National Institute of Computer Science",
      du: "2019-01-15",
      au: "2019-12-15",
      diplome: "Certificate",
      autreDiplome: "Advanced Diploma",
      observations: "Specialized in banking security systems",
    },
    {
      id: 3,
      specialite: "Management",
      autreSpecialite: "Leadership",
      etablissement: "International Management Institute",
      du: "2018-03-01",
      au: "2018-08-31",
      diplome: "Executive Program",
      autreDiplome: "Leadership Certificate",
      observations: "Focused on team management and strategic planning",
    },
  ])

  return (
    <ProfessionalTrainingContext.Provider 
      value={{ 
        open, 
        setOpen, 
        currentRow, 
        setCurrentRow, 
        professionalTrainings, 
        setProfessionalTrainings,
        employeeInfo,
        setEmployeeInfo
      }}
    >
      {children}
    </ProfessionalTrainingContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProfessionalTraining = () => {
  const professionalTrainingContext = React.useContext(ProfessionalTrainingContext)

  if (!professionalTrainingContext) {
    throw new Error('useProfessionalTraining has to be used within <ProfessionalTrainingProvider>')
  }

  return professionalTrainingContext
}
