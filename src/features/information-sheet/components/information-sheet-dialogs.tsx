import { useUiStore, useUiActions } from '@/stores/useUiStore'
import { InformationSheetDialog } from './information-sheet-dialog'
import { DisciplinaryActionsDialog } from './disciplinary-actions-dialog'
import { InformationSheetDeleteDialog } from './information-sheet-delete-dialog'
import { DisciplinaryAction } from '@/stores/dataStore'
import { useCreateDisciplinaryAction, useUpdateDisciplinaryAction } from '@/hooks/use-disciplinary-actions'

export function InformationSheetDialogs() {
  const open = useUiStore((state) => state.informationSheetDialog)
  const currentRow = useUiStore((state) => state.informationSheetCurrentRow)
  const disciplinaryActionOpen = useUiStore((state) => state.disciplinaryActionDialog)
  const disciplinaryActionCurrentRow = useUiStore((state) => state.disciplinaryActionCurrentRow)
  const { openInformationSheet, closeInformationSheet, setInformationSheetCurrentRow, openDisciplinaryAction, closeDisciplinaryAction, setDisciplinaryActionCurrentRow } = useUiActions()
  
  const createDisciplinaryAction = useCreateDisciplinaryAction()
  const updateDisciplinaryAction = useUpdateDisciplinaryAction()

  const handleDisciplinaryActionSave = (data: Partial<DisciplinaryAction>) => {
    if (disciplinaryActionCurrentRow) {
      // Edit existing disciplinary action
      updateDisciplinaryAction.mutate({ 
        id: disciplinaryActionCurrentRow.id, 
        data 
      }, {
        onSuccess: () => {
           closeDisciplinaryAction()
           setDisciplinaryActionCurrentRow(null)
        }
      })
    } else {
      // Add new disciplinary action
      if (!currentRow) return

      createDisciplinaryAction.mutate({
        ...data,
        informationSheetId: currentRow.id
      }, {
        onSuccess: () => {
           closeDisciplinaryAction()
        }
      })
    }
  }
  
  return (
    <>
      <InformationSheetDialog
        key='information-sheet-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => isOpen ? openInformationSheet('add') : closeInformationSheet()}
      />

      {currentRow && (
        <>
          <InformationSheetDialog
            key={`information-sheet-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              if (isOpen) {
                openInformationSheet('edit', currentRow.id)
              } else {
                closeInformationSheet()
                setInformationSheetCurrentRow(null)
              }
            }}
            currentRow={currentRow}
          />

          <InformationSheetDeleteDialog
            key={`information-sheet-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              if (isOpen) {
                openInformationSheet('delete', currentRow.id)
              } else {
                closeInformationSheet()
                setInformationSheetCurrentRow(null)
              }
            }}
            currentRow={currentRow}
          />
        </>
      )}

      {/* Disciplinary Actions Dialog */}
      <DisciplinaryActionsDialog
        key='disciplinary-action-add'
        open={disciplinaryActionOpen === 'add'}
        onOpenChange={(isOpen) => isOpen ? openDisciplinaryAction('add') : closeDisciplinaryAction()}
        onSave={handleDisciplinaryActionSave}
      />

      {disciplinaryActionCurrentRow && (
        <>
          <DisciplinaryActionsDialog
            key={`disciplinary-action-edit-${disciplinaryActionCurrentRow.id}`}
            open={disciplinaryActionOpen === 'edit'}
            onOpenChange={(isOpen) => {
              if (isOpen) {
                openDisciplinaryAction('edit', disciplinaryActionCurrentRow)
              } else {
                closeDisciplinaryAction()
                setDisciplinaryActionCurrentRow(null)
              }
            }}
            currentRow={disciplinaryActionCurrentRow}
            onSave={handleDisciplinaryActionSave}
          />
        </>
      )}
    </>
  )
}
