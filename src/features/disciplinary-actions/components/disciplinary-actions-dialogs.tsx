import { useDisciplinaryAction } from '../context/disciplinary-actions-context'
import { DisciplinaryActionsDialog } from './disciplinary-actions-dialog'

export function DisciplinaryActionsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useDisciplinaryAction()
  
  return (
    <>
      <DisciplinaryActionsDialog
        key='disciplinary-action-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <DisciplinaryActionsDialog
            key={`disciplinary-action-edit-${currentRow.id}`}
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
