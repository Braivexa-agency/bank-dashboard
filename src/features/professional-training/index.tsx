import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconPlus, IconEdit, IconTrash, IconEye, IconCertificate } from '@tabler/icons-react'

export default function ProfessionalTraining() {
  const trainings = [
    {
      id: 1,
      title: 'Formation en Gestion des Risques Bancaires',
      provider: 'Institut de Formation Bancaire',
      startDate: '2023-03-15',
      endDate: '2023-03-17',
      duration: '3 jours',
      status: 'Terminé',
      certificate: 'Certificat délivré',
      description: 'Formation approfondie sur l\'identification, l\'évaluation et la gestion des risques bancaires',
      type: 'Formation Interne'
    },
    {
      id: 2,
      title: 'Certification en Analyse Financière',
      provider: 'Association des Analystes Financiers',
      startDate: '2022-09-01',
      endDate: '2022-11-30',
      duration: '3 mois',
      status: 'Terminé',
      certificate: 'Certification CFA Level 1',
      description: 'Préparation et obtention de la certification CFA Level 1',
      type: 'Certification Professionnelle'
    },
    {
      id: 3,
      title: 'Séminaire sur la Digitalisation Bancaire',
      provider: 'Confédération Bancaire Algérienne',
      startDate: '2023-01-20',
      endDate: '2023-01-20',
      duration: '1 jour',
      status: 'Terminé',
      certificate: 'Attestation de participation',
      description: 'Séminaire sur les enjeux et opportunités de la transformation digitale',
      type: 'Séminaire'
    },
    {
      id: 4,
      title: 'Formation en Leadership et Management',
      provider: 'Centre de Formation Management',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      duration: '1 mois',
      status: 'En cours',
      certificate: 'En attente',
      description: 'Développement des compétences en leadership et gestion d\'équipe',
      type: 'Formation Continue'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-800'
      case 'En cours':
        return 'bg-blue-100 text-blue-800'
      case 'Planifié':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
            <h2 className='text-2xl font-bold tracking-tight'>Formation Professionnelle</h2>
            <p className='text-muted-foreground'>
              Gestion des formations, certifications et séminaires professionnels
            </p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Ajouter une formation
          </Button>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <div className="space-y-6">
            <div className="grid gap-6">
        {trainings.map((training) => (
          <Card key={training.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{training.title}</CardTitle>
                  <CardDescription className="text-lg font-medium">
                    {training.provider}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(training.status)}>
                    {training.status}
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
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="text-sm">{training.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Période</p>
                  <p className="text-sm">
                    {new Date(training.startDate).toLocaleDateString('fr-FR')} - {' '}
                    {new Date(training.endDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Durée</p>
                  <p className="text-sm">{training.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Certificat</p>
                  <div className="flex items-center gap-1">
                    <IconCertificate className="h-4 w-4" />
                    <p className="text-sm">{training.certificate}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm">{training.description}</p>
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
