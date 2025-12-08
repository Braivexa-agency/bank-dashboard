import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash, IconFileCertificate, IconFileSpreadsheet, IconFileText } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { InformationSheet } from '@/stores/dataStore'
import { useBankExperience } from '@/features/bank-experience/context/bank-experience-context'
import { useNonBankExperience } from '@/features/non-bank-experience/context/non-bank-experience-context'
import { useUiActions } from '@/stores/useUiStore'
import { dataActions } from '@/stores/dataStore'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ScrollArea } from '@/components/ui/scroll-area'

interface EmployeeActionsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  row: Row<InformationSheet> | null
}

export function EmployeeActionsSheet({
  open,
  onOpenChange,
  row,
}: EmployeeActionsSheetProps) {
  const { openInformationSheet, setInformationSheetCurrentRow, openDisciplinaryAction } = useUiActions()
  const { setOpen: setBankOpen, setCurrentRow: setBankCurrentRow } = useBankExperience()
  const { setOpen: setNonBankOpen, setCurrentRow: setNonBankCurrentRow } = useNonBankExperience()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (!row) return null

  const handleDeleteDisciplinaryAction = (actionId: number) => {
    const actionToDelete = row.original.disciplinaryActions.find(action => action.id === actionId)
    
    if (window.confirm(t('rowActions.confirmDeleteAction', { action: actionToDelete?.typeSanction }))) {
      dataActions.deleteDisciplinaryAction(actionId)
      
      const updatedEmployee = {
        ...row.original,
        disciplinaryActions: row.original.disciplinaryActions.filter(action => action.id !== actionId)
      }
      
      dataActions.updateInformationSheet(row.original.id, {
        disciplinaryActions: updatedEmployee.disciplinaryActions
      })
      
      toast.success(
        t('rowActions.deleteActionSuccess', { action: actionToDelete?.typeSanction })
      )
    }
  }

  const r = row.original
  const hasBank = !!(
    r.affectation || r.poste || r.activite || r.natureDecision || r.refDecision || r.dateDecision || r.dateEffet
  )
  const hasNonBank = !!(
    r.entreprise || r.lieuTravail || r.posteOccupe || r.du || r.au || r.duree
  )
  const hasDisciplinaryActions = r.disciplinaryActions && r.disciplinaryActions.length > 0

  const closeSheet = () => onOpenChange(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-lg">{t('rowActions.employeeActions')}</SheetTitle>
          <SheetDescription className="text-sm">
            {r.nom} {r.prenom} • {r.matricule}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="flex flex-col gap-6 py-6">
            {/* Main Actions */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t('rowActions.mainActions')}
              </h3>
              <Button
                variant="outline"
                className="w-full justify-start h-10 text-sm"
                onClick={() => {
                  setInformationSheetCurrentRow(row.original)
                  openInformationSheet('edit', row.original.id)
                  closeSheet()
                }}
              >
                <IconEdit className="mr-3 h-4 w-4" />
                {t('common.edit')}
              </Button>
            </div>

            {/* Work Certificates */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t('rowActions.certificates')}
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start h-10 text-sm"
                  onClick={() => {
                    setInformationSheetCurrentRow(row.original)
                    navigate({ to: '/print-reports', search: { view: 'certificate' } })
                    closeSheet()
                  }}
                >
                  <IconFileCertificate className="mr-3 h-4 w-4" />
                  {t('rowActions.viewWorkCertificate')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-10 text-sm"
                  onClick={() => {
                    setInformationSheetCurrentRow(row.original)
                    navigate({ to: '/print-reports', search: { view: 'detailed' } })
                    closeSheet()
                  }}
                >
                  <IconFileSpreadsheet className="mr-3 h-4 w-4" />
                  {t('rowActions.viewDetailedCertificate')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-10 text-sm"
                  onClick={() => {
                    setInformationSheetCurrentRow(row.original)
                    navigate({ to: '/print-reports', search: { view: 'enquete-wilaya' } })
                    closeSheet()
                  }}
                >
                  <IconFileText className="mr-3 h-4 w-4" />
                  {t('rowActions.viewEnqueteWilaya')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-10 text-sm"
                  onClick={() => {
                    setInformationSheetCurrentRow(row.original)
                    navigate({ to: '/print-reports', search: { view: 'enquete-daira' } })
                    closeSheet()
                  }}
                >
                  <IconFileText className="mr-3 h-4 w-4" />
                  {t('rowActions.viewEnqueteDaira')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-10 text-sm"
                  onClick={() => {
                    setInformationSheetCurrentRow(row.original)
                    navigate({ to: '/print-reports', search: { view: 'career' } })
                    closeSheet()
                  }}
                >
                  <IconFileText className="mr-3 h-4 w-4" />
                  {t('rowActions.viewCareerSheet')}
                </Button>
              </div>
            </div>

            {/* Experience Sections */}
            {(hasBank || hasNonBank) && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t('rowActions.experience')}
                </h3>
                <div className="space-y-2">
                  {hasBank && (
                    <Button
                      variant="outline"
                      className="w-full justify-start h-10 text-sm"
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
                        closeSheet()
                      }}
                    >
                      <IconEdit className="mr-3 h-4 w-4" />
                      {t('rowActions.editBankingExperience')}
                    </Button>
                  )}
                  {hasNonBank && (
                    <Button
                      variant="outline"
                      className="w-full justify-start h-10 text-sm"
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
                        closeSheet()
                      }}
                    >
                      <IconEdit className="mr-3 h-4 w-4" />
                      {t('rowActions.editNonBankingExperience')}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Disciplinary Actions */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t('rowActions.disciplinaryActions')}
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start h-10 text-sm"
                  onClick={() => {
                    setInformationSheetCurrentRow(r)
                    openDisciplinaryAction('add')
                    closeSheet()
                  }}
                >
                  <IconEdit className="mr-3 h-4 w-4" />
                  {t('rowActions.addDisciplinaryAction')}
                </Button>
                {hasDisciplinaryActions && (
                  <>
                    {r.disciplinaryActions.map((action) => (
                      <div key={action.id} className="space-y-2 p-3 border rounded-md bg-muted/30">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-9 text-sm font-normal"
                          onClick={() => {
                            setInformationSheetCurrentRow(r)
                            openDisciplinaryAction('edit', action)
                            closeSheet()
                          }}
                        >
                          <IconEdit className="mr-2 h-3.5 w-3.5" />
                          {t('rowActions.editDisciplinaryAction', { action: action.typeSanction, classification: action.classification })}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-9 text-sm font-normal text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                          onClick={() => {
                            handleDeleteDisciplinaryAction(action.id)
                            closeSheet()
                          }}
                        >
                          <IconTrash className="mr-2 h-3.5 w-3.5" />
                          {t('rowActions.deleteDisciplinaryAction', { action: action.typeSanction, classification: action.classification })}
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Delete Employee */}
            <div className="space-y-3 pt-3 border-t">
              <h3 className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                {t('rowActions.dangerZone')}
              </h3>
              <Button
                variant="destructive"
                className="w-full justify-start h-10 text-sm"
                onClick={() => {
                  setInformationSheetCurrentRow(row.original)
                  openInformationSheet('delete', row.original.id)
                  closeSheet()
                }}
              >
                <IconTrash className="mr-3 h-4 w-4" />
                {t('common.delete')}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
