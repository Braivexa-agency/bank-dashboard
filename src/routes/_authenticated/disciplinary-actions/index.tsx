import { createFileRoute } from '@tanstack/react-router'
import DisciplinaryActions from '@/features/disciplinary-actions'

export const Route = createFileRoute('/_authenticated/disciplinary-actions/')({
  component: DisciplinaryActions,
})
