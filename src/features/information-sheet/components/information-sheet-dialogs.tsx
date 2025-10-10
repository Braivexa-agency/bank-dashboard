import { useUiStore, useUiActions } from '@/stores/useUiStore'
import { InformationSheetDialog } from './information-sheet-dialog'
import { DisciplinaryActionsDialog } from './disciplinary-actions-dialog'
import { dataActions, dataStore, DisciplinaryAction, InformationSheet } from '@/stores/dataStore'

export function InformationSheetDialogs() {
  const open = useUiStore((state) => state.informationSheetDialog)
  const currentRow = useUiStore((state) => state.informationSheetCurrentRow)
  const disciplinaryActionOpen = useUiStore((state) => state.disciplinaryActionDialog)
  const disciplinaryActionCurrentRow = useUiStore((state) => state.disciplinaryActionCurrentRow)
  const { openInformationSheet, closeInformationSheet, setInformationSheetCurrentRow, openDisciplinaryAction, closeDisciplinaryAction, setDisciplinaryActionCurrentRow } = useUiActions()
  
  const handleDisciplinaryActionSave = (data: Partial<DisciplinaryAction>) => {
    if (disciplinaryActionCurrentRow) {
      // Edit existing disciplinary action
      dataActions.updateDisciplinaryAction(disciplinaryActionCurrentRow.id, data)
      
      // Update the disciplinary action in all information sheets that have it
      const informationSheets = dataStore.state.informationSheets
      const updatedSheets = informationSheets.map((sheet: InformationSheet) => ({
        ...sheet,
        disciplinaryActions: sheet.disciplinaryActions.map((action: DisciplinaryAction) => 
          action.id === disciplinaryActionCurrentRow.id 
            ? { ...action, ...data }
            : action
        )
      }))
      dataActions.setInformationSheets(updatedSheets)
    } else {
      // Add new disciplinary action
      const newId = Math.max(...dataStore.state.disciplinaryActions.map((a: DisciplinaryAction) => a.id)) + 1
      const newDisciplinaryAction = { ...data, id: newId } as DisciplinaryAction
      
      // Add to global disciplinary actions store
      dataActions.addDisciplinaryAction(newDisciplinaryAction)
      
      // Add to the current employee (if one is selected)
      if (currentRow) {
        const informationSheets = dataStore.state.informationSheets
        const updatedSheets = informationSheets.map((sheet: InformationSheet) => {
          if (sheet.id === currentRow.id) {
            return {
              ...sheet,
              disciplinaryActions: [...sheet.disciplinaryActions, newDisciplinaryAction]
            }
          }
          return sheet
        })
        dataActions.setInformationSheets(updatedSheets)
      } else {
        // If no specific employee is selected, add to the first employee as fallback
        const informationSheets = dataStore.state.informationSheets
        if (informationSheets.length > 0) {
          const updatedSheets = informationSheets.map((sheet: InformationSheet, index: number) => {
            if (index === 0) {
              return {
                ...sheet,
                disciplinaryActions: [...sheet.disciplinaryActions, newDisciplinaryAction]
              }
            }
            return sheet
          })
          dataActions.setInformationSheets(updatedSheets)
        }
      }
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
