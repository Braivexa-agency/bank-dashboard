import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Badge } from '@/components/ui/badge'
import { InformationSheet, DisciplinaryAction } from '@/stores/dataStore'
import { DataTableColumnHeader } from '@/features/bank-experience/components/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export function useInformationSheetColumns() {
  const { t } = useTranslation()

  const columns: ColumnDef<InformationSheet>[] = useMemo(
    () => [
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
          <DataTableColumnHeader column={column} title={t('tableColumns.employeeId')} />
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
          <DataTableColumnHeader column={column} title={t('tableColumns.lastName')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-32'>{row.getValue('nom')}</LongText>
        ),
        meta: { className: 'w-32' },
      },
      {
        accessorKey: 'prenom',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.firstName')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-32'>{row.getValue('prenom')}</LongText>
        ),
        meta: { className: 'w-32' },
      },
      {
        accessorKey: 'currentPosition',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.position')} />
        ),
        cell: ({ row }) => (
          <div className='w-fit text-nowrap'>{row.getValue('currentPosition')}</div>
        ),
      },
      {
        accessorKey: 'group',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.group')} />
        ),
        cell: ({ row }) => {
          const { group } = row.original

          const mapGroupToFr = (g: string) => {
            switch (g) {
              case 'Executive':
                return t('tableColumns.groups.cadre')
              case 'Senior Executive':
                return t('tableColumns.groups.cadreSuperior')
              case 'Execution':
                return t('tableColumns.groups.execution')
              case 'Management':
                return t('tableColumns.groups.maitrise')
              default:
                return g
            }
          }

          const groupFr = mapGroupToFr(group)

          let badgeColor = ''
          switch (groupFr) {
            case t('tableColumns.groups.cadre'):
              badgeColor = 'bg-blue-500 text-white'
              break
            case t('tableColumns.groups.cadreSuperior'):
              badgeColor = 'bg-purple-500 text-white'
              break
            case t('tableColumns.groups.execution'):
              badgeColor = 'bg-green-500 text-white'
              break
            case t('tableColumns.groups.maitrise'):
              badgeColor = 'bg-orange-500 text-white'
              break
            default:
              badgeColor = 'bg-gray-500 text-white'
          }
          return (
            <div className='flex space-x-2'>
              <Badge variant='outline' className={cn('capitalize', badgeColor)}>
                {groupFr}
              </Badge>
            </div>
          )
        },
        filterFn: (row, id, value) => {
          const raw = row.getValue(id) as string
          const map = (g: string) => {
            switch (g) {
              case 'Executive':
                return t('tableColumns.groups.cadre')
              case 'Senior Executive':
                return t('tableColumns.groups.cadreSuperior')
              case 'Execution':
                return t('tableColumns.groups.execution')
              case 'Management':
                return t('tableColumns.groups.maitrise')
              default:
                return g
            }
          }
          const mapped = map(raw)
          return value.includes(mapped)
        },
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: 'classe',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.class')} />
        ),
        cell: ({ row }) => <div>{row.getValue('classe')}</div>,
      },
      {
        accessorKey: 'echelon',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.level')} />
        ),
        cell: ({ row }) => {
          const raw = row.getValue('echelon') as string
          const num = Number.parseInt(raw || '0', 10)
          const clamped = Math.max(1, Math.min(11, Number.isFinite(num) ? num : 0))
          return <div>{clamped}</div>
        },
      },
      {
        accessorKey: 'pbi',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.pbi')} />
        ),
        cell: ({ row }) => {
          const { pbi } = row.original
          const badgeColor = Number(pbi) > 0 ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          return (
            <div className='flex space-x-2'>
              <Badge variant='outline' className={cn('capitalize', badgeColor)}>
                {row.getValue('pbi')}
              </Badge>
            </div>
          )
        },
        enableColumnFilter: false,
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: 'hireDate',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.hireDate')} />
        ),
        cell: ({ row }) => {
          const date = row.getValue('hireDate') as string
          return <div>{new Date(date).toLocaleDateString('en-US')}</div>
        },
      },
      {
        accessorKey: 'bankingExperience',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.experience')} />
        ),
        cell: ({ row }) => <div>{row.getValue('bankingExperience')}</div>,
        enableSorting: false,
      },
      {
        accessorKey: 'structure',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.structure')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-36'>{row.getValue('structure')}</LongText>
        ),
      },
      {
        accessorKey: 'affectation',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.assignment')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-36'>{row.getValue('affectation')}</LongText>
        ),
      },
      {
        accessorKey: 'poste',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.bankingPosition')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-32'>{row.getValue('poste')}</LongText>
        ),
      },
      {
        accessorKey: 'natureDecision',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.decisionType')} />
        ),
        cell: ({ row }) => {
          const { natureDecision } = row.original
          let badgeColor = ''
          switch (natureDecision) {
            case 'Promotion':
              badgeColor = 'bg-green-500 text-white'
              break
            case 'Appointment':
              badgeColor = 'bg-blue-500 text-white'
              break
            case 'Recruitment':
              badgeColor = 'bg-purple-500 text-white'
              break
            default:
              badgeColor = 'bg-gray-500 text-white'
          }
          return (
            <div className='flex space-x-2'>
              <Badge variant='outline' className={cn('capitalize', badgeColor)}>
                {row.getValue('natureDecision')}
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
        accessorKey: 'maritalStatus',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.status')} />
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
        accessorKey: 'entreprise',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.company')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-36'>{row.getValue('entreprise')}</LongText>
        ),
      },
      {
        accessorKey: 'specialite',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.specialty')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-36'>{row.getValue('specialite')}</LongText>
        ),
      },
      {
        accessorKey: 'autreSpecialite',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.otherSpecialty')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-36'>{row.getValue('autreSpecialite')}</LongText>
        ),
      },
      {
        accessorKey: 'etablissement',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.institution')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-36'>{row.getValue('etablissement')}</LongText>
        ),
      },
      {
        accessorKey: 'diplome',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.diploma')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-36'>{row.getValue('diplome')}</LongText>
        ),
      },
      {
        accessorKey: 'autreDiplome',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.otherDiploma')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-36'>{row.getValue('autreDiplome')}</LongText>
        ),
      },
      {
        accessorKey: 'du',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.trainingFrom')} />
        ),
        cell: ({ row }) => {
          const date = row.getValue('du') as string
          return <div>{date ? new Date(date).toLocaleDateString('en-US') : ''}</div>
        },
      },
      {
        accessorKey: 'au',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.trainingTo')} />
        ),
        cell: ({ row }) => {
          const date = row.getValue('au') as string
          return <div>{date ? new Date(date).toLocaleDateString('en-US') : ''}</div>
        },
      },
      {
        accessorKey: 'observations',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.observations')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-48'>{row.getValue('observations')}</LongText>
        ),
      },
      {
        accessorKey: 'lieuTravail',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.workLocation')} />
        ),
        cell: ({ row }) => (
          <LongText className='max-w-28'>{row.getValue('lieuTravail')}</LongText>
        ),
      },
      {
        accessorKey: 'disciplinaryActions',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.disciplinaryActions')} />
        ),
        cell: ({ row }) => {
          const actions = row.getValue('disciplinaryActions') as DisciplinaryAction[]
          if (!actions || actions.length === 0) {
            return <div className='text-muted-foreground'>{t('common.none')}</div>
          }
          return (
            <div className='flex flex-wrap gap-1'>
              {actions.slice(0, 2).map((action, index) => (
                <Badge 
                  key={index} 
                  variant='outline' 
                  className={cn(
                    'text-xs',
                    action.classification === 'Minor' ? 'bg-yellow-100 text-yellow-800' :
                    action.classification === 'Major' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  )}
                >
                  {action.typeSanction}
                </Badge>
              ))}
              {actions.length > 2 && (
                <Badge variant='outline' className='text-xs bg-gray-100 text-gray-600'>
                  +{actions.length - 2} {t('common.more')}
                </Badge>
              )}
            </div>
          )
        },
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'lastDisciplinaryAction',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tableColumns.lastDisciplinaryAction')} />
        ),
        cell: ({ row }) => {
          const actions = row.getValue('disciplinaryActions') as DisciplinaryAction[]
          if (!actions || actions.length === 0) {
            return <div className='text-muted-foreground'>{t('common.none')}</div>
          }
          const lastAction = actions[actions.length - 1]
          return (
            <div className='space-y-1'>
              <div className='text-sm font-medium'>{lastAction.typeSanction}</div>
              <div className='text-xs text-muted-foreground'>
                {new Date(lastAction.dateDecision).toLocaleDateString('en-US')}
              </div>
            </div>
          )
        },
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: 'actions',
        cell: DataTableRowActions,
      },
    ],
    [t]
  )

  return columns
}
