import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash, IconFileCertificate, IconFileSpreadsheet, IconFileText } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InformationSheet } from '@/stores/dataStore'
import { useBankExperience } from '@/features/bank-experience/context/bank-experience-context'
import { useNonBankExperience } from '@/features/non-bank-experience/context/non-bank-experience-context'
import { useUiActions } from '@/stores/useUiStore'
import { dataActions } from '@/stores/dataStore'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

interface DataTableRowActionsProps {
  row: Row<InformationSheet>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { openInformationSheet, setInformationSheetCurrentRow, openDisciplinaryAction } = useUiActions()
  const { setOpen: setBankOpen, setCurrentRow: setBankCurrentRow } = useBankExperience()
  const { setOpen: setNonBankOpen, setCurrentRow: setNonBankCurrentRow } = useNonBankExperience()
  const navigate = useNavigate()
  
  const handleDeleteDisciplinaryAction = (actionId: number) => {
    // Find the action to get its details for the confirmation and toast message
    const actionToDelete = row.original.disciplinaryActions.find(action => action.id === actionId)
    
    // Show confirmation dialog
    if (window.confirm(`Are you sure you want to delete the disciplinary action "${actionToDelete?.typeSanction}"?`)) {
      // Delete from global store
      dataActions.deleteDisciplinaryAction(actionId)
      
      // Remove from the current employee's disciplinary actions
      const updatedEmployee = {
        ...row.original,
        disciplinaryActions: row.original.disciplinaryActions.filter(action => action.id !== actionId)
      }
      
      // Update the information sheets by updating the specific employee
      dataActions.updateInformationSheet(row.original.id, {
        disciplinaryActions: updatedEmployee.disciplinaryActions
      })
      
      // Show success message
      toast.success(
        `Disciplinary action "${actionToDelete?.typeSanction}" deleted successfully!`
      )
    }
  }
  
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuItem
            onClick={() => {
              setInformationSheetCurrentRow(row.original)
              openInformationSheet('edit', row.original.id)
            }}
          >
            Edit
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          
          {/* Work Certificate Action - Navigate to print reports page with query parameter */}
          <DropdownMenuItem
            onClick={() => {
              // Store the current employee info for the work certificate
              setInformationSheetCurrentRow(row.original)
              // Navigate to the print reports page with certificate view
              navigate({ to: '/print-reports', search: { view: 'certificate' } })
            }}
          >
            View Work Certificate
            <DropdownMenuShortcut>
              <IconFileCertificate size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          
          {/* Detailed Work Certificate Action - Navigate to print reports page with query parameter */}
          <DropdownMenuItem
            onClick={() => {
              // Store the current employee info for the detailed work certificate
              setInformationSheetCurrentRow(row.original)
              // Navigate to the print reports page with detailed certificate view
              navigate({ to: '/print-reports', search: { view: 'detailed' } })
            }}
          >
            View Detailed Certificate
            <DropdownMenuShortcut>
              <IconFileSpreadsheet size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          {/* Enquête Wilaya - Navigate to print reports page with query parameter */}
          <DropdownMenuItem
            onClick={() => {
              // Store the current employee info for the Enquête Wilaya
              setInformationSheetCurrentRow(row.original)
              // Navigate to the print reports page with Enquête Wilaya view
              navigate({ to: '/print-reports', search: { view: 'enquete-wilaya' } })
            }}
          >
            View Enquête Wilaya
            <DropdownMenuShortcut>
              <IconFileText size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          {/* Career Sheet - Navigate to print reports page with query parameter */}
          <DropdownMenuItem
            onClick={() => {
              // Store the current employee info for the Career Sheet
              setInformationSheetCurrentRow(row.original)
              // Navigate to the print reports page with Career Sheet view
              navigate({ to: '/print-reports', search: { view: 'career' } })
            }}
          >
            View Career Sheet
            <DropdownMenuShortcut>
              <IconFileText size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          
          {(() => {
            const r = row.original
            const hasBank = !!(
              r.affectation || r.poste || r.activite || r.natureDecision || r.refDecision || r.dateDecision || r.dateEffet
            )
            return hasBank ? (
              <DropdownMenuItem
                onClick={() => {
                  setBankCurrentRow({
                    id: r.id ?? 0,
                    affectation: r.affectation ?? '',
                    poste: r.poste ?? '',
                    activite: r.activite ?? '',
                    classe: r.classe ?? '',
                    echelon: r.echelon ?? '',
                    pbi: typeof r.pbi === 'number' ? r.pbi : (r.pbi === 'Yes' ? 1 : 0),
                    natureDecision: r.decisionType ?? r.natureDecision ?? '',
                    refDecision: r.decisionNumber ?? r.refDecision ?? '',
                    dateDecision: r.decisionDate ?? r.dateDecision ?? '',
                    dateEffet: r.effectiveDate ?? r.dateEffet ?? '',
                    chargeInterim: r.chargeInterim ?? '',
                  })
                  setBankOpen('edit')
                }}
              >
                Edit Banking Exp.
                <DropdownMenuShortcut>
                  <IconEdit size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ) : null
          })()}
          {(() => {
            const r = row.original
            const hasNonBank = !!(
              r.entreprise || r.lieuTravail || r.posteOccupe || r.du || r.au || r.duree
            )
            return hasNonBank ? (
              <DropdownMenuItem
                onClick={() => {
                  setNonBankCurrentRow({
                    id: r.id ?? 0,
                    entreprise: r.entreprise ?? '',
                    lieuTravail: r.lieuTravail ?? '',
                    posteOccupe: r.posteOccupe ?? '',
                    du: r.du ?? '',
                    au: r.au ?? '',
                    duree: r.duree ?? '',
                  })
                  setNonBankOpen('edit')
                }}
              >
                Edit Non-Banking Exp.
                <DropdownMenuShortcut>
                  <IconEdit size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ) : null
          })()}
          {(() => {
            const r = row.original
            const hasDisciplinaryActions = r.disciplinaryActions && r.disciplinaryActions.length > 0
            return hasDisciplinaryActions ? (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    // Store the current employee info for the disciplinary action dialog
                    setInformationSheetCurrentRow(r)
                    openDisciplinaryAction('add')
                  }}
                >
                  Add Disciplinary Action
                  <DropdownMenuShortcut>
                    <IconEdit size={16} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                {r.disciplinaryActions.map((action) => (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={() => {
                      // Store the current employee info and the specific disciplinary action
                      setInformationSheetCurrentRow(r)
                      openDisciplinaryAction('edit', action)
                    }}
                  >
                    Edit: {action.typeSanction} ({action.classification})
                    <DropdownMenuShortcut>
                      <IconEdit size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                {r.disciplinaryActions.map((action) => (
                  <DropdownMenuItem
                    key={`delete-${action.id}`}
                    onClick={() => handleDeleteDisciplinaryAction(action.id)}
                    className='text-red-500'
                  >
                    Delete: {action.typeSanction} ({action.classification})
                    <DropdownMenuShortcut>
                      <IconTrash size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              </>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  // Store the current employee info for the disciplinary action dialog
                  setInformationSheetCurrentRow(r)
                  openDisciplinaryAction('add')
                }}
              >
                Add Disciplinary Action
                <DropdownMenuShortcut>
                  <IconEdit size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )
          })()}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setInformationSheetCurrentRow(row.original)
              openInformationSheet('delete', row.original.id)
            }}
            className='text-red-500!'
          >
            Delete
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}