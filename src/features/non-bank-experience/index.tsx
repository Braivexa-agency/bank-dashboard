import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconPlus, IconEdit, IconTrash, IconEye } from '@tabler/icons-react'

export default function NonBankExperience() {
  const nonBankExperiences = [
    {
      id: 1,
      companyName: 'Sonatrach',
      position: 'Analyste Financier',
      startDate: '2014-07-01',
      endDate: '2016-08-31',
      department: 'Direction Financière',
      status: 'Terminé',
      description: 'Analyse des investissements et suivi des performances financières',
      sector: 'Énergie'
    },
    {
      id: 2,
      companyName: 'Algérie Télécom',
      position: 'Contrôleur de Gestion',
      startDate: '2012-01-15',
      endDate: '2014-06-30',
      department: 'Contrôle de Gestion',
      status: 'Terminé',
      description: 'Élaboration des budgets et suivi des coûts opérationnels',
      sector: 'Télécommunications'
    },
    {
      id: 3,
      companyName: 'Cevital',
      position: 'Assistant Comptable',
      startDate: '2010-09-01',
      endDate: '2011-12-31',
      department: 'Comptabilité',
      status: 'Terminé',
      description: 'Tenue de la comptabilité générale et établissement des états financiers',
      sector: 'Agroalimentaire'
    }
  ]

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Expérience Hors Banque</h2>
            <p className='text-muted-foreground'>
              Gestion de l'expérience professionnelle en dehors du secteur bancaire
            </p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Ajouter une expérience
          </Button>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <div className="space-y-6">
            <div className="grid gap-6">
        {nonBankExperiences.map((experience) => (
          <Card key={experience.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{experience.companyName}</CardTitle>
                  <CardDescription className="text-lg font-medium">
                    {experience.position}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={experience.status === 'Terminé' ? 'secondary' : 'default'}>
                    {experience.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <IconEye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <IconEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Secteur</p>
                  <p className="text-sm">{experience.sector}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Département</p>
                  <p className="text-sm">{experience.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Période</p>
                  <p className="text-sm">
                    {new Date(experience.startDate).toLocaleDateString('fr-FR')} - {' '}
                    {new Date(experience.endDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Durée</p>
                  <p className="text-sm">
                    {Math.ceil(
                      (new Date(experience.endDate).getTime() - new Date(experience.startDate).getTime()) 
                      / (1000 * 60 * 60 * 24 * 30)
                    )} mois
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm">{experience.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
