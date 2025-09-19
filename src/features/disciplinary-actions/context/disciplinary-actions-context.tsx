import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

export interface DisciplinaryAction {
  id: number
  typeSanction: string
  classification: string
  numeroDecision: string
  dateDecision: string
  dateEffet: string
  motifSanction: string
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

type DisciplinaryActionDialogType = 'add' | 'edit' | 'delete'

interface DisciplinaryActionContextType {
  open: DisciplinaryActionDialogType | null
  setOpen: (str: DisciplinaryActionDialogType | null) => void
  currentRow: DisciplinaryAction | null
  setCurrentRow: React.Dispatch<React.SetStateAction<DisciplinaryAction | null>>
  disciplinaryActions: DisciplinaryAction[]
  setDisciplinaryActions: React.Dispatch<React.SetStateAction<DisciplinaryAction[]>>
  employeeInfo: EmployeeInfo | null
  setEmployeeInfo: React.Dispatch<React.SetStateAction<EmployeeInfo | null>>
}

const DisciplinaryActionContext = React.createContext<DisciplinaryActionContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function DisciplinaryActionProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<DisciplinaryActionDialogType>(null)
  const [currentRow, setCurrentRow] = useState<DisciplinaryAction | null>(null)
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null)
  const [disciplinaryActions, setDisciplinaryActions] = useState<DisciplinaryAction[]>([
    {
      id: 1,
      typeSanction: "Warning",
      classification: "Minor",
      numeroDecision: "DEC-2023-001",
      dateDecision: "2023-01-15",
      dateEffet: "2023-01-16",
      motifSanction: "Late arrival to work on multiple occasions",
    },
    {
      id: 2,
      typeSanction: "Suspension",
      classification: "Major",
      numeroDecision: "DEC-2022-045",
      dateDecision: "2022-06-01",
      dateEffet: "2022-06-02",
      motifSanction: "Violation of company policy regarding client confidentiality",
    },
    {
      id: 3,
      typeSanction: "Reprimand",
      classification: "Minor",
      numeroDecision: "DEC-2021-012",
      dateDecision: "2021-03-01",
      dateEffet: "2021-03-02",
      motifSanction: "Inappropriate behavior towards colleagues",
    },
  ])

  return (
    <DisciplinaryActionContext.Provider 
      value={{ 
        open, 
        setOpen, 
        currentRow, 
        setCurrentRow, 
        disciplinaryActions, 
        setDisciplinaryActions,
        employeeInfo,
        setEmployeeInfo
      }}
    >
      {children}
    </DisciplinaryActionContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDisciplinaryAction = () => {
  const disciplinaryActionContext = React.useContext(DisciplinaryActionContext)

  if (!disciplinaryActionContext) {
    throw new Error('useDisciplinaryAction has to be used within <DisciplinaryActionProvider>')
  }

  return disciplinaryActionContext
}
