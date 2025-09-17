import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { BankExperience } from '../context/bank-experience-context'
import { DataTableColumnHeader } from '@/features/bank-experience/components/data-table-column-header'
import { DataTableRowActions } from '@/features/bank-experience/components/data-table-row-actions'

export const columns: ColumnDef<BankExperience>[] = [
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
    accessorKey: 'affectation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Assignment' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('affectation')}</LongText>
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
    accessorKey: 'poste',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('poste')}</LongText>
    ),
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'activite',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Activity' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('activite')}</div>
    ),
  },
  {
    accessorKey: 'classe',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Class' />
    ),
    cell: ({ row }) => {
      const classe = row.getValue('classe') as string
      const badgeColor = classe === 'Executive' ? 'bg-blue-100 text-blue-800' : 
                        classe === 'Management' ? 'bg-green-100 text-green-800' :
                        classe === 'Execution' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {classe}
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
    accessorKey: 'echelon',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Level' />
    ),
    cell: ({ row }) => <div>{row.getValue('echelon')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'pbi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='PBI' />
    ),
    cell: ({ row }) => {
      const pbi = row.getValue('pbi') as string
      const badgeColor = pbi === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {pbi}
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
    accessorKey: 'natureDecision',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Decision Type' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('natureDecision')}</div>
    ),
  },
  {
    accessorKey: 'refDecision',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Decision Ref' />
    ),
    cell: ({ row }) => <div>{row.getValue('refDecision')}</div>,
    enableSorting: false,
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
    accessorKey: 'chargeInterim',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Interim Charge' />
    ),
    cell: ({ row }) => {
      const charge = row.getValue('chargeInterim') as string
      const badgeColor = charge === 'Yes' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {charge}
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
