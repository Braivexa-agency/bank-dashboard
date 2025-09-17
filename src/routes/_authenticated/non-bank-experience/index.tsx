import { createFileRoute } from '@tanstack/react-router'
import NonBankExperience from '@/features/non-bank-experience'

export const Route = createFileRoute('/_authenticated/non-bank-experience/')({
  component: NonBankExperience,
})
