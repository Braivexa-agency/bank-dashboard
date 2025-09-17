import { useBankExperience } from '../context/bank-experience-context'
import { BankExperienceDialog } from './bank-experience-dialog'

export function BankExperienceDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useBankExperience()
  
  return (
    <>
      <BankExperienceDialog
        key='bank-experience-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <BankExperienceDialog
            key={`bank-experience-edit-${currentRow.id}`}
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
