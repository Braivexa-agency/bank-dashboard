import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconPlus, IconDownload, IconPrinter, IconEye, IconFileText } from '@tabler/icons-react'

export default function PrintReports() {
  const reports = [
    {
      id: 1,
      title: 'Rapport de Carrière Complet',
      description: 'Rapport détaillé de l\'évolution de carrière de l\'employé',
      type: 'Rapport Personnel',
      lastGenerated: '2024-01-15',
      status: 'Disponible',
      format: 'PDF',
      size: '2.3 MB',
      pages: 15
    },
    {
      id: 2,
      title: 'Fiche de Renseignements',
      description: 'Fiche complète des renseignements personnels et professionnels',
      type: 'Document Administratif',
      lastGenerated: '2024-01-10',
      status: 'Disponible',
      format: 'PDF',
      size: '1.8 MB',
      pages: 8
    },
    {
      id: 3,
      title: 'Historique des Formations',
      description: 'Liste complète des formations suivies et certifications obtenues',
      type: 'Rapport Formation',
      lastGenerated: '2023-12-20',
      status: 'Disponible',
      format: 'PDF',
      size: '1.2 MB',
      pages: 6
    },
    {
      id: 4,
      title: 'Certificat de Travail',
      description: 'Certificat officiel de travail et d\'ancienneté',
      type: 'Certificat',
      lastGenerated: '2024-01-05',
      status: 'Disponible',
      format: 'PDF',
      size: '0.8 MB',
      pages: 2
    },
    {
      id: 5,
      title: 'Attestation de Travail',
      description: 'Attestation de travail pour démarches administratives',
      type: 'Attestation',
      lastGenerated: '2023-11-30',
      status: 'Expiré',
      format: 'PDF',
      size: '0.5 MB',
      pages: 1
    },
    {
      id: 6,
      title: 'Rapport d\'Enquête Wilaya',
      description: 'Rapport d\'enquête administrative au niveau de la wilaya',
      type: 'Rapport Administratif',
      lastGenerated: '2023-10-15',
      status: 'En cours de génération',
      format: 'PDF',
      size: 'N/A',
      pages: 12
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-800'
      case 'En cours de génération':
        return 'bg-blue-100 text-blue-800'
      case 'Expiré':
        return 'bg-red-100 text-red-800'
      case 'Erreur':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Rapport Personnel':
        return 'bg-blue-100 text-blue-800'
      case 'Document Administratif':
        return 'bg-purple-100 text-purple-800'
      case 'Rapport Formation':
        return 'bg-green-100 text-green-800'
      case 'Certificat':
        return 'bg-yellow-100 text-yellow-800'
      case 'Attestation':
        return 'bg-orange-100 text-orange-800'
      case 'Rapport Administratif':
        return 'bg-indigo-100 text-indigo-800'
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
            <h2 className='text-2xl font-bold tracking-tight'>Impression d'États</h2>
            <p className='text-muted-foreground'>
              Génération et impression des rapports et documents administratifs
            </p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Nouveau rapport
          </Button>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <div className="space-y-6">

      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{report.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {report.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dernière génération</p>
                  <p className="text-sm">
                    {new Date(report.lastGenerated).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Format</p>
                  <p className="text-sm">{report.format}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taille</p>
                  <p className="text-sm">{report.size}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pages</p>
                  <p className="text-sm">{report.pages}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <IconEye className="mr-2 h-4 w-4" />
                  Prévisualiser
                </Button>
                <Button variant="outline" size="sm" disabled={report.status !== 'Disponible'}>
                  <IconDownload className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
                <Button variant="outline" size="sm" disabled={report.status !== 'Disponible'}>
                  <IconPrinter className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
                <Button variant="outline" size="sm">
                  <IconFileText className="mr-2 h-4 w-4" />
                  Régénérer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rapports Rapides</CardTitle>
            <CardDescription>
              Génération rapide des documents les plus demandés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <IconFileText className="mr-2 h-4 w-4" />
              Certificat de Travail
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <IconFileText className="mr-2 h-4 w-4" />
              Attestation de Travail
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <IconFileText className="mr-2 h-4 w-4" />
              Fiche de Renseignements
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rapports Personnalisés</CardTitle>
            <CardDescription>
              Création de rapports sur mesure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <IconPlus className="mr-2 h-4 w-4" />
              Nouveau rapport
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <IconFileText className="mr-2 h-4 w-4" />
              Modèles prédéfinis
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <IconFileText className="mr-2 h-4 w-4" />
              Historique des rapports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistiques</CardTitle>
            <CardDescription>
              Aperçu des rapports générés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total rapports</span>
              <span className="text-sm font-medium">{reports.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Disponibles</span>
              <span className="text-sm font-medium">
                {reports.filter(r => r.status === 'Disponible').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ce mois</span>
              <span className="text-sm font-medium">
                {reports.filter(r => 
                  new Date(r.lastGenerated).getMonth() === new Date().getMonth() && 
                  new Date(r.lastGenerated).getFullYear() === new Date().getFullYear()
                ).length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
          </div>
        </div>
      </Main>
    </>
  )
}
