import { useNonBankExperience } from '../context/non-bank-experience-context'
import { NonBankExperienceDialog } from './non-bank-experience-dialog'

export function NonBankExperienceDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useNonBankExperience()
  
  return (
    <>
      <NonBankExperienceDialog
        key='non-bank-experience-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <NonBankExperienceDialog
            key={`non-bank-experience-edit-${currentRow.id}`}
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
