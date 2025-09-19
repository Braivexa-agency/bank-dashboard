import { useInformationSheet } from '../context/information-sheet-context'
import { InformationSheetDialog } from './information-sheet-dialog'

export function InformationSheetDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useInformationSheet()
  
  return (
    <>
      <InformationSheetDialog
        key='information-sheet-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <InformationSheetDialog
            key={`information-sheet-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
