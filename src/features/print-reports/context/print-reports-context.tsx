import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

export interface EmployeeInfo {
  matricule: string
  nom: string
  prenom: string
  filsDe: string
  etDe: string
  dateNaissance: string
  situationFamiliale: string
  sexe: string
  nomConjoint?: string
  dateRecrutement: string
  natureContrat: string
  posteOccupe: string
  groupe: string
  chargeInterim?: string
  structure: string
  rattachement: string
  code: string
  typeStructure: string
  activite: string
  experienceBanque: string
  positionnement: string
  affectation: string
}

export interface CNASInfo {
  numeroAdherent: string
  adresseAdherent: string
}

export interface EnqueteInfo {
  wilayaNaissance: string
  wilayaResidence: string
  numeroTelephone: string
}

export interface PrintReport {
  id: number
  type: 'attestation' | 'certificat' | 'fiche-carriere' | 'fiche-renseignement'
  title: string
  description: string
  status: 'available' | 'generating' | 'completed' | 'error'
  generatedAt?: string
  downloadUrl?: string
}

type PrintReportDialogType = 'add' | 'edit' | 'delete'

interface PrintReportsContextType {
  open: PrintReportDialogType | null
  setOpen: (str: PrintReportDialogType | null) => void
  currentRow: PrintReport | null
  setCurrentRow: React.Dispatch<React.SetStateAction<PrintReport | null>>
  printReports: PrintReport[]
  setPrintReports: React.Dispatch<React.SetStateAction<PrintReport[]>>
  employeeInfo: EmployeeInfo | null
  setEmployeeInfo: React.Dispatch<React.SetStateAction<EmployeeInfo | null>>
  cnasInfo: CNASInfo | null
  setCnasInfo: React.Dispatch<React.SetStateAction<CNASInfo | null>>
  enqueteInfo: EnqueteInfo | null
  setEnqueteInfo: React.Dispatch<React.SetStateAction<EnqueteInfo | null>>
}

const PrintReportsContext = React.createContext<PrintReportsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function PrintReportsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<PrintReportDialogType>(null)
  const [currentRow, setCurrentRow] = useState<PrintReport | null>(null)
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null)
  const [cnasInfo, setCnasInfo] = useState<CNASInfo | null>(null)
  const [enqueteInfo, setEnqueteInfo] = useState<EnqueteInfo | null>(null)
  const [printReports, setPrintReports] = useState<PrintReport[]>([
    {
      id: 1,
      type: 'attestation',
      title: 'Work Certificate',
      description: 'Official work attestation document',
      status: 'available',
      generatedAt: '2024-01-15T10:30:00Z',
      downloadUrl: '/reports/work-certificate-001.pdf'
    },
    {
      id: 2,
      type: 'certificat',
      title: 'Employment Certificate',
      description: 'Detailed employment certificate with career history',
      status: 'completed',
      generatedAt: '2024-01-14T14:20:00Z',
      downloadUrl: '/reports/employment-certificate-002.pdf'
    },
    {
      id: 3,
      type: 'fiche-carriere',
      title: 'Career Sheet',
      description: 'Complete career progression and experience summary',
      status: 'generating',
    },
    {
      id: 4,
      type: 'fiche-renseignement',
      title: 'Information Sheet',
      description: 'Comprehensive employee information and data sheet',
      status: 'available',
      generatedAt: '2024-01-13T09:15:00Z',
      downloadUrl: '/reports/information-sheet-004.pdf'
    }
  ])

  return (
    <PrintReportsContext.Provider 
      value={{ 
        open, 
        setOpen, 
        currentRow, 
        setCurrentRow, 
        printReports, 
        setPrintReports,
        employeeInfo,
        setEmployeeInfo,
        cnasInfo,
        setCnasInfo,
        enqueteInfo,
        setEnqueteInfo
      }}
    >
      {children}
    </PrintReportsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePrintReports = () => {
  const printReportsContext = React.useContext(PrintReportsContext)

  if (!printReportsContext) {
    throw new Error('usePrintReports has to be used within <PrintReportsProvider>')
  }

  return printReportsContext
}
