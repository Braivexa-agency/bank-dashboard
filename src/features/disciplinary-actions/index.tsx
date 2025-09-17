import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconPlus, IconEdit, IconTrash, IconEye, IconAlertTriangle } from '@tabler/icons-react'

export default function DisciplinaryActions() {
  const disciplinaryActions = [
    {
      id: 1,
      employeeName: 'Ahmed Benali',
      employeeId: 'EMP001',
      actionType: 'Avertissement',
      date: '2024-01-10',
      reason: 'Retard répété aux réunions d\'équipe',
      status: 'Actif',
      severity: 'Mineur',
      description: 'L\'employé a été averti pour des retards répétés aux réunions d\'équipe du matin',
      issuedBy: 'Directeur des Ressources Humaines',
      department: 'Réseau Commercial'
    },
    {
      id: 2,
      employeeName: 'Fatima Khelil',
      employeeId: 'EMP002',
      actionType: 'Blâme',
      date: '2023-12-15',
      reason: 'Non-respect des procédures de sécurité',
      status: 'Actif',
      severity: 'Moyen',
      description: 'Blâme pour non-respect des procédures de sécurité lors de la manipulation des documents confidentiels',
      issuedBy: 'Responsable Sécurité',
      department: 'Opérations'
    },
    {
      id: 3,
      employeeName: 'Mohamed Cherif',
      employeeId: 'EMP003',
      actionType: 'Mise à pied',
      date: '2023-11-20',
      reason: 'Absence non justifiée',
      status: 'Expiré',
      severity: 'Majeur',
      description: 'Mise à pied de 3 jours pour absence non justifiée de 2 jours consécutifs',
      issuedBy: 'Directeur Général',
      department: 'Crédit'
    },
    {
      id: 4,
      employeeName: 'Aicha Boudjedra',
      employeeId: 'EMP004',
      actionType: 'Avertissement',
      date: '2024-01-05',
      reason: 'Comportement inapproprié avec un client',
      status: 'En cours d\'examen',
      severity: 'Moyen',
      description: 'Avertissement pour comportement inapproprié lors d\'une interaction avec un client',
      issuedBy: 'Responsable Clientèle',
      department: 'Accueil'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mineur':
        return 'bg-yellow-100 text-yellow-800'
      case 'Moyen':
        return 'bg-orange-100 text-orange-800'
      case 'Majeur':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif':
        return 'bg-red-100 text-red-800'
      case 'Expiré':
        return 'bg-gray-100 text-gray-800'
      case 'En cours d\'examen':
        return 'bg-blue-100 text-blue-800'
      case 'Annulé':
        return 'bg-green-100 text-green-800'
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
            <h2 className='text-2xl font-bold tracking-tight'>Sanctions Disciplinaires</h2>
            <p className='text-muted-foreground'>
              Gestion des sanctions disciplinaires et mesures correctives
            </p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Nouvelle sanction
          </Button>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <div className="space-y-6">

      <div className="grid gap-6">
        {disciplinaryActions.map((action) => (
          <Card key={action.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{action.employeeName}</CardTitle>
                  <CardDescription className="text-lg font-medium">
                    {action.actionType} - {action.employeeId}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(action.severity)}>
                    {action.severity}
                  </Badge>
                  <Badge className={getStatusColor(action.status)}>
                    {action.status}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="text-sm">
                    {new Date(action.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Département</p>
                  <p className="text-sm">{action.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Émis par</p>
                  <p className="text-sm">{action.issuedBy}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">Motif</p>
                <p className="text-sm font-medium">{action.reason}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sanctions</CardTitle>
            <IconAlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disciplinaryActions.length}</div>
            <p className="text-xs text-muted-foreground">
              Toutes sanctions confondues
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sanctions Actives</CardTitle>
            <Badge className="bg-red-100 text-red-800">Actif</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {disciplinaryActions.filter(a => a.status === 'Actif').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Sanctions en cours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sanctions Majeures</CardTitle>
            <Badge className="bg-red-100 text-red-800">Majeur</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {disciplinaryActions.filter(a => a.severity === 'Majeur').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Sanctions graves
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ce Mois</CardTitle>
            <Badge className="bg-blue-100 text-blue-800">Jan 2024</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {disciplinaryActions.filter(a => 
                new Date(a.date).getMonth() === new Date().getMonth() && 
                new Date(a.date).getFullYear() === new Date().getFullYear()
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Nouvelles sanctions
            </p>
          </CardContent>
        </Card>
      </div>
          </div>
        </div>
      </Main>
    </>
  )
}
