import { useUiStore, useUiActions } from '@/stores/useUiStore'
import { InformationSheetDialog } from './information-sheet-dialog'

export function InformationSheetDialogs() {
  const open = useUiStore((state) => state.informationSheetDialog)
  const currentRow = useUiStore((state) => state.informationSheetCurrentRow)
  const { openInformationSheet, closeInformationSheet, setInformationSheetCurrentRow } = useUiActions()
  
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
    </>
  )
}
