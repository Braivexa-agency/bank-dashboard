import InformationSheet from '@/features/information-sheet'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/information-sheet/')({
  component: InformationSheet,
})
