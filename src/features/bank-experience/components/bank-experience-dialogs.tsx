import { useBankExperience } from '../context/bank-experience-context'
import { BankExperienceDialog } from './bank-experience-dialog'

export function BankExperienceDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useBankExperience()
  
  return (
    <>
      <BankExperienceDialog
        key='bank-experience-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'add' : null)}
      />

      {currentRow && (
        <>
          <BankExperienceDialog
            key={`bank-experience-edit-${currentRow.id}`}
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
