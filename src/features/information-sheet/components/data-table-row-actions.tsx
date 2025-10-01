import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash } from '@tabler/icons-react'
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

interface DataTableRowActionsProps {
  row: Row<InformationSheet>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { openInformationSheet, setInformationSheetCurrentRow } = useUiActions()
  const { setOpen: setBankOpen, setCurrentRow: setBankCurrentRow } = useBankExperience()
  const { setOpen: setNonBankOpen, setCurrentRow: setNonBankCurrentRow } = useNonBankExperience()
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
