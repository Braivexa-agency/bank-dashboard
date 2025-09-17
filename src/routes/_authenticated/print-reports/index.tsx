import { createFileRoute } from '@tanstack/react-router'
import PrintReports from '@/features/print-reports'

export const Route = createFileRoute('/_authenticated/print-reports/')({
  component: PrintReports,
})
