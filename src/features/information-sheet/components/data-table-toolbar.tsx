import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/features/bank-experience/components/data-table-faceted-filter'
import { DataTableViewOptions } from '@/features/bank-experience/components/data-table-view-options'
import { useTranslation } from 'react-i18next'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const { t } = useTranslation()

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={t('tableToolbar.filterEmployees')}
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
              title={t('tableColumns.group')}
              options={[
                { label: t('tableColumns.groups.cadre'), value: 'cadre' },
                { label: t('tableColumns.groups.maitrise'), value: 'maitrise' },
                { label: t('tableColumns.groups.execution'), value: 'execution' },
                { label: t('tableColumns.groups.cadreSuperior'), value: 'cadre superieur' },
              ]}
            />
          )}
          {table.getColumn('pbi') && (
            <DataTableFacetedFilter
              column={table.getColumn('pbi')}
              title={t('tableColumns.pbi')}
              options={[
                { label: t('common.yes'), value: 'Yes' },
                { label: t('common.no'), value: 'No' },
              ]}
            />
          )}
          {table.getColumn('maritalStatus') && (
            <DataTableFacetedFilter
              column={table.getColumn('maritalStatus')}
              title={t('employeeForm.fields.maritalStatus')}
              options={[
                { label: t('tableColumns.maritalStatus.single'), value: 'Single' },
                { label: t('tableColumns.maritalStatus.married'), value: 'Married' },
                { label: t('tableColumns.maritalStatus.divorced'), value: 'Divorced' },
                { label: t('tableColumns.maritalStatus.widowed'), value: 'Widowed' },
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
            {t('common.reset')}
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
