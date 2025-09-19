import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { ProfessionalTraining } from '../context/professional-training-context'
import { DataTableColumnHeader } from '@/features/bank-experience/components/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<ProfessionalTraining>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'specialite',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Specialty' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('specialite')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'autreSpecialite',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Other Specialty' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('autreSpecialite')}</LongText>
    ),
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'etablissement',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Institution' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('etablissement')}</div>
    ),
  },
  {
    accessorKey: 'du',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='From' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('du') as string
      return <div>{new Date(date).toLocaleDateString('en-US')}</div>
    },
  },
  {
    accessorKey: 'au',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='To' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('au') as string
      return <div>{new Date(date).toLocaleDateString('en-US')}</div>
    },
  },
  {
    accessorKey: 'diplome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Diploma' />
    ),
    cell: ({ row }) => <div>{row.getValue('diplome')}</div>,
  },
  {
    accessorKey: 'autreDiplome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Other Diploma' />
    ),
    cell: ({ row }) => <div>{row.getValue('autreDiplome')}</div>,
  },
  {
    accessorKey: 'observations',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Observations' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>{row.getValue('observations')}</LongText>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
