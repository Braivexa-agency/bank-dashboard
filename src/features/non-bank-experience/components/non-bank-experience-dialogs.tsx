import { useNonBankExperience } from '../context/non-bank-experience-context'
import { NonBankExperienceDialog } from './non-bank-experience-dialog'

export function NonBankExperienceDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useNonBankExperience()
  
  return (
    <>
      <NonBankExperienceDialog
        key='non-bank-experience-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'add' : null)}
      />

      {currentRow && (
        <>
          <NonBankExperienceDialog
            key={`non-bank-experience-edit-${currentRow.id}`}
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
