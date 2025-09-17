import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IconPlus, IconEdit, IconTrash, IconEye, IconDeviceFloppy } from '@tabler/icons-react'

export default function InformationSheet() {
  const informationSheets = [
    {
      id: 1,
      title: 'Fiche de Renseignements Personnels',
      lastUpdated: '2024-01-15',
      status: 'À jour',
      description: 'Informations personnelles et contact',
      fields: ['Nom', 'Prénom', 'Date de naissance', 'Adresse', 'Téléphone', 'Email']
    },
    {
      id: 2,
      title: 'Fiche de Carrière',
      lastUpdated: '2024-01-10',
      status: 'À jour',
      description: 'Historique professionnel et évolution de carrière',
      fields: ['Postes occupés', 'Promotions', 'Évaluations', 'Objectifs']
    },
    {
      id: 3,
      title: 'Fiche de Formation',
      lastUpdated: '2023-12-20',
      status: 'À mettre à jour',
      description: 'Formations suivies et certifications obtenues',
      fields: ['Formations', 'Certifications', 'Séminaires', 'Compétences']
    },
    {
      id: 4,
      title: 'Fiche d\'Enquête Wilaya',
      lastUpdated: '2023-11-30',
      status: 'En attente validation',
      description: 'Enquête administrative au niveau de la wilaya',
      fields: ['Enquête de moralité', 'Vérifications administratives', 'Références']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'À jour':
        return 'bg-green-100 text-green-800'
      case 'À mettre à jour':
        return 'bg-yellow-100 text-yellow-800'
      case 'En attente validation':
        return 'bg-blue-100 text-blue-800'
      case 'Expiré':
        return 'bg-red-100 text-red-800'
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
            <h2 className='text-2xl font-bold tracking-tight'>Fiches de Renseignements</h2>
            <p className='text-muted-foreground'>
              Gestion des fiches de renseignements et documents administratifs
            </p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Créer une fiche
          </Button>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <div className="space-y-6">

      <div className="grid gap-6">
        {informationSheets.map((sheet) => (
          <Card key={sheet.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{sheet.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {sheet.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(sheet.status)}>
                    {sheet.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <IconEye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <IconEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <IconDeviceFloppy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dernière mise à jour</p>
                  <p className="text-sm">
                    {new Date(sheet.lastUpdated).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Champs inclus</p>
                  <p className="text-sm">{sheet.fields.length} champs</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Champs de la fiche</p>
                <div className="flex flex-wrap gap-1">
                  {sheet.fields.map((field, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Example form for creating/editing a sheet */}
      <Card>
        <CardHeader>
          <CardTitle>Exemple de Fiche de Renseignements</CardTitle>
          <CardDescription>
            Formulaire type pour la création d'une fiche de renseignements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input id="nom" placeholder="Entrez le nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input id="prenom" placeholder="Entrez le prénom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateNaissance">Date de naissance</Label>
              <Input id="dateNaissance" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input id="telephone" placeholder="Entrez le numéro de téléphone" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="adresse">Adresse</Label>
              <Textarea id="adresse" placeholder="Entrez l'adresse complète" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Entrez l'adresse email" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">Annuler</Button>
            <Button>
              <IconDeviceFloppy className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </CardContent>
      </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
