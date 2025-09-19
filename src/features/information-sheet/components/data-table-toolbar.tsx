import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/features/bank-experience/components/data-table-faceted-filter'
import { DataTableViewOptions } from '@/features/bank-experience/components/data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter employees...'
          value={
            (table.getColumn('nom')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('nom')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('group') && (
            <DataTableFacetedFilter
              column={table.getColumn('group')}
              title='Group'
              options={[
                { label: 'Executive', value: 'Executive' },
                { label: 'Senior Executive', value: 'Senior Executive' },
                { label: 'Execution', value: 'Execution' },
                { label: 'Management', value: 'Management' },
              ]}
            />
          )}
          {table.getColumn('pbi') && (
            <DataTableFacetedFilter
              column={table.getColumn('pbi')}
              title='PBI'
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
            />
          )}
          {table.getColumn('maritalStatus') && (
            <DataTableFacetedFilter
              column={table.getColumn('maritalStatus')}
              title='Marital Status'
              options={[
                { label: 'Single', value: 'Single' },
                { label: 'Married', value: 'Married' },
                { label: 'Divorced', value: 'Divorced' },
                { label: 'Widowed', value: 'Widowed' },
              ]}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
