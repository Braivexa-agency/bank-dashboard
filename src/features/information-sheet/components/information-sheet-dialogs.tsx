import { useInformationSheet } from '../context/information-sheet-context'
import { InformationSheetDialog } from './information-sheet-dialog'

export function InformationSheetDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useInformationSheet()
  
  return (
    <>
      <InformationSheetDialog
        key='information-sheet-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'add' : null)}
      />

      {currentRow && (
        <>
          <InformationSheetDialog
            key={`information-sheet-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'edit' : null)
              if (!isOpen) {
                setCurrentRow(null)
              }
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
