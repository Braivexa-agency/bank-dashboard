import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { NonBankExperience } from '../context/non-bank-experience-context'
import { DataTableColumnHeader } from '@/features/bank-experience/components/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<NonBankExperience>[] = [
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
    accessorKey: 'entreprise',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Company' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('entreprise')}</LongText>
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
    accessorKey: 'lieuTravail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Work Location' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('lieuTravail')}</LongText>
    ),
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'posteOccupe',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('posteOccupe')}</div>
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
    accessorKey: 'duree',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Duration' />
    ),
    cell: ({ row }) => <div>{row.getValue('duree')}</div>,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
