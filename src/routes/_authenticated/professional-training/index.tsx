import { createFileRoute } from '@tanstack/react-router'
// Removed professional training page; reuse information sheet route or leave placeholder
const Removed = () => null

export const Route = createFileRoute('/_authenticated/professional-training/')({
  component: Removed,
})
