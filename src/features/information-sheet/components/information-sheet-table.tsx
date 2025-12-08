import { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { InformationSheet } from '@/stores/dataStore'
import { DataTablePagination } from '@/features/bank-experience/components/data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import { EmployeeActionsSheet } from './employee-actions-sheet'
import { useTranslation } from 'react-i18next'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

interface DataTableProps {
  columns: ColumnDef<InformationSheet>[]
  data: InformationSheet[]
}

export function InformationSheetTable({ columns, data }: DataTableProps) {
  const { t } = useTranslation()
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [selectedRow, setSelectedRow] = useState<Row<InformationSheet> | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  
  // Check if the original data is empty (not just filtered)
  const isEmpty = data.length === 0

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ''}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='group/row cursor-pointer'
                  onClick={() => {
                    setSelectedRow(row)
                    setSheetOpen(true)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className ?? ''}
                      onClick={(e) => {
                        // Prevent row click for checkbox and actions column
                        if (cell.column.id === 'select' || cell.column.id === 'actions') {
                          e.stopPropagation()
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {isEmpty 
                    ? (t('informationSheet.noEmployees') || 'No employees found')
                    : (t('informationSheet.noResults') || 'No results found')
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <EmployeeActionsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        row={selectedRow}
      />
    </div>
  )
}
