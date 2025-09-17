import { createFileRoute } from '@tanstack/react-router'
import ProfessionalTraining from '@/features/professional-training'

export const Route = createFileRoute('/_authenticated/professional-training/')({
  component: ProfessionalTraining,
})
