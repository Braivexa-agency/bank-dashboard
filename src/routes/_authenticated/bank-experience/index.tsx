import { createFileRoute } from '@tanstack/react-router'
import BankExperience from '@/features/bank-experience'

export const Route = createFileRoute('/_authenticated/bank-experience/')({
  component: BankExperience,
})
