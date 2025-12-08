import { IconAlertTriangle } from '@tabler/icons-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { InformationSheet } from '@/stores/dataStore'
import { useDeleteInformationSheet } from '@/hooks/use-information-sheets'
import { useTranslation } from 'react-i18next'

interface InformationSheetDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: InformationSheet | null
}

export function InformationSheetDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: InformationSheetDeleteDialogProps) {
  const { t } = useTranslation()
  const deleteMutation = useDeleteInformationSheet()

  const handleDelete = () => {
    if (!currentRow) return

    deleteMutation.mutate(currentRow.id, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  if (!currentRow) return null

  const employeeName = currentRow.prenom && currentRow.nom
    ? `${currentRow.prenom} ${currentRow.nom}`
    : currentRow.matricule || t('informationSheet.employee')

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={deleteMutation.isPending}
      isLoading={deleteMutation.isPending}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          {t('informationSheet.deleteDialog.title') || 'Delete Employee'}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('informationSheet.deleteDialog.message', { 
              name: employeeName,
              matricule: currentRow.matricule 
            }) || `Are you sure you want to delete ${employeeName} (${currentRow.matricule})?`}
            <br />
            {t('informationSheet.deleteDialog.warning') || 'This action will permanently remove the employee from the system. This cannot be undone.'}
          </p>

          <Alert variant='destructive'>
            <AlertTitle>{t('informationSheet.deleteDialog.alertTitle') || 'Warning!'}</AlertTitle>
            <AlertDescription>
              {t('informationSheet.deleteDialog.alertDescription') || 'Please be careful, this operation cannot be rolled back.'}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('common.delete') || 'Delete'}
      destructive
    />
  )
}

