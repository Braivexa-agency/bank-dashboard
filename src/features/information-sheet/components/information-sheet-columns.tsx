import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Badge } from '@/components/ui/badge'
import { InformationSheet } from '../context/information-sheet-context'
import { DataTableColumnHeader } from '@/features/bank-experience/components/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
// import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<InformationSheet>[] = [
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
    accessorKey: 'matricule',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Employee ID' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-24'>{row.getValue('matricule')}</LongText>
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
    accessorKey: 'nom',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-32'>{row.getValue('nom')}</LongText>
    ),
    meta: { className: 'w-32' },
  },
  {
    accessorKey: 'prenom',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-32'>{row.getValue('prenom')}</LongText>
    ),
    meta: { className: 'w-32' },
  },
  {
    accessorKey: 'currentPosition',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('currentPosition')}</div>
    ),
  },
  {
    accessorKey: 'group',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Group' />
    ),
    cell: ({ row }) => {
      const { group } = row.original
      let badgeColor = ''
      switch (group) {
        case 'Executive':
          badgeColor = 'bg-blue-500 text-white'
          break
        case 'Senior Executive':
          badgeColor = 'bg-purple-500 text-white'
          break
        case 'Execution':
          badgeColor = 'bg-green-500 text-white'
          break
        default:
          badgeColor = 'bg-gray-500 text-white'
      }
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('group')}
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
    accessorKey: 'classe',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Class' />
    ),
    cell: ({ row }) => <div>{row.getValue('classe')}</div>,
  },
  {
    accessorKey: 'echelon',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Level' />
    ),
    cell: ({ row }) => <div>{row.getValue('echelon')}</div>,
  },
  {
    accessorKey: 'pbi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='PBI' />
    ),
    cell: ({ row }) => {
      const { pbi } = row.original
      const badgeColor = pbi === 'Yes' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('pbi')}
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
    accessorKey: 'hireDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hire Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('hireDate') as string
      return <div>{new Date(date).toLocaleDateString('en-US')}</div>
    },
  },
  {
    accessorKey: 'bankingExperience',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Experience' />
    ),
    cell: ({ row }) => <div>{row.getValue('bankingExperience')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'structure',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Structure' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('structure')}</LongText>
    ),
  },
  {
    accessorKey: 'maritalStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { maritalStatus } = row.original
      let badgeColor = ''
      switch (maritalStatus) {
        case 'Married':
          badgeColor = 'bg-green-500 text-white'
          break
        case 'Single':
          badgeColor = 'bg-blue-500 text-white'
          break
        case 'Divorced':
          badgeColor = 'bg-orange-500 text-white'
          break
        case 'Widowed':
          badgeColor = 'bg-gray-500 text-white'
          break
        default:
          badgeColor = 'bg-gray-500 text-white'
      }
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('maritalStatus')}
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
    id: 'actions',
    cell: DataTableRowActions,
  },
]
