import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Badge } from '@/components/ui/badge'
import { DisciplinaryAction } from '@/stores/dataStore'
import { DataTableColumnHeader } from '@/features/bank-experience/components/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<DisciplinaryAction>[] = [
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
    accessorKey: 'typeSanction',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sanction Type' />
    ),
    cell: ({ row }) => {
      const { typeSanction } = row.original
      let badgeColor = ''
      switch (typeSanction) {
        case 'Warning':
          badgeColor = 'bg-yellow-500 text-white'
          break
        case 'Reprimand':
          badgeColor = 'bg-orange-500 text-white'
          break
        case 'Suspension':
          badgeColor = 'bg-red-500 text-white'
          break
        case 'Dismissal':
          badgeColor = 'bg-red-700 text-white'
          break
        default:
          badgeColor = 'bg-gray-500 text-white'
      }
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('typeSanction')}
          </Badge>
        </div>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'classification',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Classification' />
    ),
    cell: ({ row }) => {
      const { classification } = row.original
      let badgeColor = ''
      switch (classification) {
        case 'Minor':
          badgeColor = 'bg-yellow-500 text-white'
          break
        case 'Major':
          badgeColor = 'bg-red-500 text-white'
          break
        case 'Severe':
          badgeColor = 'bg-red-700 text-white'
          break
        default:
          badgeColor = 'bg-gray-500 text-white'
      }
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('classification')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'numeroDecision',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Decision Number' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('numeroDecision')}</div>
    ),
  },
  {
    accessorKey: 'dateDecision',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Decision Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('dateDecision') as string
      return <div>{new Date(date).toLocaleDateString('en-US')}</div>
    },
  },
  {
    accessorKey: 'dateEffet',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Effective Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('dateEffet') as string
      return <div>{new Date(date).toLocaleDateString('en-US')}</div>
    },
  },
  {
    accessorKey: 'motifSanction',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reason' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>{row.getValue('motifSanction')}</LongText>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
