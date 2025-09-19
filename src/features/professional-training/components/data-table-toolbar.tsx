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
          placeholder='Filter training records...'
          value={
            (table.getColumn('specialite')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('specialite')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('diplome') && (
            <DataTableFacetedFilter
              column={table.getColumn('diplome')}
              title='Diploma'
              options={[
                { label: 'Master\'s Degree', value: 'Master\'s Degree' },
                { label: 'Bachelor\'s Degree', value: 'Bachelor\'s Degree' },
                { label: 'Certificate', value: 'Certificate' },
                { label: 'Executive Program', value: 'Executive Program' },
                { label: 'Diploma', value: 'Diploma' },
              ]}
            />
          )}
          {table.getColumn('etablissement') && (
            <DataTableFacetedFilter
              column={table.getColumn('etablissement')}
              title='Institution'
              options={[
                { label: 'Algiers Business School', value: 'Algiers Business School' },
                { label: 'National Institute of Computer Science', value: 'National Institute of Computer Science' },
                { label: 'International Management Institute', value: 'International Management Institute' },
                { label: 'University of Algiers', value: 'University of Algiers' },
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
