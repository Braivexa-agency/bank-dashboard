import { useUiStore, useUiActions } from '@/stores/useUiStore'
import { InformationSheetDialog } from './information-sheet-dialog'
import { DisciplinaryActionsDialog } from './disciplinary-actions-dialog'
import { InformationSheetDeleteDialog } from './information-sheet-delete-dialog'
import { DisciplinaryAction, dataActions, dataStore, InformationSheet } from '@/stores/dataStore'
import { toast } from 'sonner'
import { disciplinaryActionsApi } from '@/lib/api/disciplinary-actions'

export function InformationSheetDialogs() {
  const open = useUiStore((state) => state.informationSheetDialog)
  const currentRow = useUiStore((state) => state.informationSheetCurrentRow)
  const disciplinaryActionOpen = useUiStore((state) => state.disciplinaryActionDialog)
  const disciplinaryActionCurrentRow = useUiStore((state) => state.disciplinaryActionCurrentRow)
  const { openInformationSheet, closeInformationSheet, setInformationSheetCurrentRow, openDisciplinaryAction, closeDisciplinaryAction, setDisciplinaryActionCurrentRow } = useUiActions()
  
  const handleDisciplinaryActionSave = async (data: Partial<DisciplinaryAction>) => {
    try {
      if (disciplinaryActionCurrentRow) {
        // Edit existing disciplinary action
        const updatedAction = await disciplinaryActionsApi.update(disciplinaryActionCurrentRow.id, data)
        
        // Update local store with the response from server
        dataActions.updateDisciplinaryAction(disciplinaryActionCurrentRow.id, updatedAction)
        
        // Update the disciplinary action in all information sheets that have it
        const informationSheets = dataStore.state.informationSheets
        const updatedSheets = informationSheets.map((sheet: InformationSheet) => ({
          ...sheet,
          disciplinaryActions: sheet.disciplinaryActions.map((action: DisciplinaryAction) => 
            action.id === disciplinaryActionCurrentRow.id 
              ? updatedAction
              : action
          )
        }))
        dataActions.setInformationSheets(updatedSheets)
        toast.success('Disciplinary action updated successfully')
      } else {
        // Add new disciplinary action
        if (!currentRow) {
          toast.error('No employee selected')
          return
        }

        const newAction = await disciplinaryActionsApi.create({
          ...data,
          informationSheetId: currentRow.id
        })
        
        // Add to global disciplinary actions store
        dataActions.addDisciplinaryAction(newAction)
        
        // Add to the current employee
        const informationSheets = dataStore.state.informationSheets
        const updatedSheets = informationSheets.map((sheet: InformationSheet) => {
          if (sheet.id === currentRow.id) {
            return {
              ...sheet,
              disciplinaryActions: [...sheet.disciplinaryActions, newAction]
            }
          }
          return sheet
        })
        dataActions.setInformationSheets(updatedSheets)
        toast.success('Disciplinary action added successfully')
      }
    } catch (error) {
      console.error('Failed to save disciplinary action:', error)
      toast.error('Failed to save disciplinary action')
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
