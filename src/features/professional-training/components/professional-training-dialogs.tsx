import { useProfessionalTraining } from '../context/professional-training-context'
import { ProfessionalTrainingDialog } from './professional-training-dialog'

export function ProfessionalTrainingDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProfessionalTraining()
  
  return (
    <>
      <ProfessionalTrainingDialog
        key='professional-training-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ProfessionalTrainingDialog
            key={`professional-training-edit-${currentRow.id}`}
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
