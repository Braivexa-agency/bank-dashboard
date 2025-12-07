'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InformationSheet } from '@/stores/dataStore'
import { dataActions, dataStore } from '@/stores/dataStore'

const baseSchema = z.object({
  matricule: z.string().min(1),
  nom: z.string().min(1),
  prenom: z.string().min(1),
  nationalId: z.string().min(1),
  fatherName: z.string().min(1),
  motherName: z.string().min(1),
  spouseName: z.string().optional(),
  dateOfBirth: z.string().min(1),
  address: z.string().optional(),
  gender: z.string().min(1),
  maritalStatus: z.string().min(1),
  numberOfChildren: z.number().min(0),
  hireDate: z.string().min(1),
  bankingExperience: z.string().optional(),
  contractType: z.string().min(1),
  socialSecurityNumber: z.string().min(1),
  educationLevel: z.string().min(1),
  diplomaType: z.string().optional(),
  academicDiploma: z.string().optional(),
  otherDiplomas: z.string().optional(),
  currentPosition: z.string().optional(),
  positionCode: z.string().optional(),
  group: z.string().min(1),
  activity: z.string().optional(),
  classe: z.string().optional(),
  echelon: z.string().optional(),
  indice: z.string().optional(),
  pbi: z.number().min(0).optional(),
  structure: z.string().optional(),
  reporting: z.string().optional(),
  code: z.string().optional(),
  structureType: z.string().optional(),
  decisionType: z.string().optional(),
  decisionNumber: z.string().optional(),
  decisionDate: z.string().optional(),
  effectiveDate: z.string().optional(),
  positioning: z.string().optional(),
  suspensionFrom: z.string().optional(),
  suspensionTo: z.string().optional(),
  lastDecision: z.string().optional(),
  prenomAr: z.string().optional(),
  nomAr: z.string().optional(),
  fatherNameAr: z.string().optional(),
  motherNameAr: z.string().optional(),
  motherLastNameAr: z.string().optional(),
  wilayaNaissance: z.string().optional(),
  dairaResidence: z.string().optional(),
  adresseAr: z.string().optional(),
  experienceType: z.enum(['bank', 'non-bank']).optional(),
  affectation: z.string().optional(),
  poste: z.string().optional(),
  activite: z.string().optional(),
  natureDecision: z.string().optional(),
  refDecision: z.string().optional(),
  dateDecision: z.string().optional(),
  dateEffet: z.string().optional(),
  chargeInterim: z.string().optional(),
  entreprise: z.string().optional(),
  lieuTravail: z.string().optional(),
  posteOccupe: z.string().optional(),
  du: z.string().optional(),
  au: z.string().optional(),
  duree: z.string().optional(),
  specialite: z.string().optional(),
  autreSpecialite: z.string().optional(),
  etablissement: z.string().optional(),
  diplome: z.string().optional(),
  autreDiplome: z.string().optional(),
  observations: z.string().optional(),
})

type InformationSheetForm = z.infer<typeof baseSchema>

interface Props {
  currentRow?: InformationSheet
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InformationSheetDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const { t } = useTranslation()

  const informationSheetSchema = z.object({
    matricule: z.string().min(1, { message: t('employeeForm.validation.employeeIdRequired') }),
    nom: z.string().min(1, { message: t('employeeForm.validation.lastNameRequired') }),
    prenom: z.string().min(1, { message: t('employeeForm.validation.firstNameRequired') }),
    nationalId: z.string().min(1, { message: t('employeeForm.validation.nationalIdRequired') }),
    fatherName: z.string().min(1, { message: t('employeeForm.validation.fatherNameRequired') }),
    motherName: z.string().min(1, { message: t('employeeForm.validation.motherNameRequired') }),
    spouseName: z.string().optional(),
    dateOfBirth: z.string().min(1, { message: t('employeeForm.validation.dateOfBirthRequired') }),
    address: z.string().optional(),
    gender: z.string().min(1, { message: t('employeeForm.validation.genderRequired') }),
    maritalStatus: z.string().min(1, { message: t('employeeForm.validation.maritalStatusRequired') }),
    numberOfChildren: z.number().min(0, { message: t('employeeForm.validation.numberOfChildrenMin') }),
    hireDate: z.string().min(1, { message: t('employeeForm.validation.hireDateRequired') }),
    bankingExperience: z.string().optional(),
    contractType: z.string().min(1, { message: t('employeeForm.validation.contractTypeRequired') }),
    socialSecurityNumber: z.string().min(1, { message: t('employeeForm.validation.socialSecurityNumberRequired') }),
    educationLevel: z.string().min(1, { message: t('employeeForm.validation.educationLevelRequired') }),
    diplomaType: z.string().optional(),
    academicDiploma: z.string().optional(),
    otherDiplomas: z.string().optional(),
    currentPosition: z.string().optional(),
    positionCode: z.string().optional(),
    group: z.string().min(1, { message: t('employeeForm.validation.groupRequired') }),
    activity: z.string().optional(),
    classe: z.string().optional(),
    echelon: z.string().optional(),
    indice: z.string().optional(),
    pbi: z.number().min(0, { message: t('employeeForm.validation.pbiMin') }).optional(),
    structure: z.string().optional(),
    reporting: z.string().optional(),
    code: z.string().optional(),
    structureType: z.string().optional(),
    decisionType: z.string().optional(),
    decisionNumber: z.string().optional(),
    decisionDate: z.string().optional(),
    effectiveDate: z.string().optional(),
    positioning: z.string().optional(),
    suspensionFrom: z.string().optional(),
    suspensionTo: z.string().optional(),
    lastDecision: z.string().optional(),
    prenomAr: z.string().optional(),
    nomAr: z.string().optional(),
    fatherNameAr: z.string().optional(),
    motherNameAr: z.string().optional(),
    motherLastNameAr: z.string().optional(),
    wilayaNaissance: z.string().optional(),
    dairaResidence: z.string().optional(),
    adresseAr: z.string().optional(),
    experienceType: z.enum(['bank', 'non-bank']).optional(),
    affectation: z.string().optional(),
    poste: z.string().optional(),
    activite: z.string().optional(),
    natureDecision: z.string().optional(),
    refDecision: z.string().optional(),
    dateDecision: z.string().optional(),
    dateEffet: z.string().optional(),
    chargeInterim: z.string().optional(),
    entreprise: z.string().optional(),
    lieuTravail: z.string().optional(),
    posteOccupe: z.string().optional(),
    du: z.string().optional(),
    au: z.string().optional(),
    duree: z.string().optional(),
    specialite: z.string().optional(),
    autreSpecialite: z.string().optional(),
    etablissement: z.string().optional(),
    diplome: z.string().optional(),
    autreDiplome: z.string().optional(),
    observations: z.string().optional(),
  })

  const defaultNewInformationSheet: InformationSheetForm = {
    matricule: 'EMP-1201',
    nom: 'Benali',
    prenom: 'Ahmed',
    nationalId: '1234567890123',
    fatherName: 'Mohamed Benali',
    motherName: 'Aicha Benali',
    spouseName: 'Fatima Benali',
    dateOfBirth: '1985-03-15',
    address: '123 Rue de la République, Algiers',
    gender: 'M',
    maritalStatus: 'Married',
    numberOfChildren: 2,
    hireDate: '2010-06-01',
    bankingExperience: '14 years',
    contractType: 'CDI',
    socialSecurityNumber: 'SS123456789',
    educationLevel: 'University',
    diplomaType: 'Bachelor',
    academicDiploma: 'Computer Science',
    otherDiplomas: 'Project Management',
    currentPosition: 'Senior Manager',
    positionCode: 'SM001',
    group: 'cadre',
    activity: 'Operations',
    classe: 'Executive',
    echelon: '12',
    indice: '850',
    pbi: 1,
    structure: 'Head Office',
    reporting: 'CEO',
    code: 'HO001',
    structureType: 'Administrative',
    decisionType: 'Promotion',
    decisionNumber: 'DEC-2023-001',
    decisionDate: '2023-01-15',
    effectiveDate: '2023-02-01',
    positioning: 'Strategic',
    suspensionFrom: '',
    suspensionTo: '',
    lastDecision: 'Promotion to Senior Manager',
    experienceType: 'bank',
    affectation: 'Regional Directorate Algiers',
    poste: 'Customer Advisor',
    activite: 'Customer portfolio management',
    natureDecision: 'Appointment',
    refDecision: 'DR-2023-001',
    dateDecision: '2023-01-15',
    dateEffet: '2023-02-01',
    chargeInterim: 'No',
    entreprise: 'Tech Solutions Inc.',
    lieuTravail: 'Algiers, Algeria',
    posteOccupe: 'Software Developer',
    du: '2008-06-01',
    au: '2010-05-31',
    duree: '2 years',
    specialite: 'Gestion des risques',
    autreSpecialite: 'Conformité bancaire',
    etablissement: 'Institut National de Finance',
    diplome: 'Certificat en Gestion des Risques',
    autreDiplome: 'Atelier conformité',
    observations: 'Cycle certifiant 40h',
    prenomAr: 'أحمد',
    nomAr: 'بن علي',
    fatherNameAr: 'محمد',
    motherNameAr: 'عائشة',
    motherLastNameAr: 'بن سعيد',
    wilayaNaissance: 'الجزائر',
    dairaResidence: 'سيدي امحمد',
    adresseAr: '123 شارع الجمهورية، الجزائر',
  }

  const form = useForm<InformationSheetForm>({
    resolver: zodResolver(informationSheetSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          ...defaultNewInformationSheet,
        },
  })

  const onSubmit = (values: InformationSheetForm) => {
    // Get the current max ID from the store to generate a new ID
    const currentSheets = dataStore.state.informationSheets
    const newId = currentSheets.length > 0 
      ? Math.max(...currentSheets.map(sheet => sheet.id)) + 1 
      : 1

    // Create a new information sheet object with all the form values
    const newSheet: InformationSheet = {
      id: newId,
      // Required fields
      matricule: values.matricule,
      nom: values.nom,
      prenom: values.prenom,
      nationalId: values.nationalId,
      fatherName: values.fatherName,
      motherName: values.motherName,
      spouseName: values.spouseName || '',
      dateOfBirth: values.dateOfBirth,
      address: values.address || '',
      gender: values.gender,
      maritalStatus: values.maritalStatus,
      numberOfChildren: Number(values.numberOfChildren) || 0,
      hireDate: values.hireDate,
      bankingExperience: values.bankingExperience || '',
      contractType: values.contractType,
      socialSecurityNumber: values.socialSecurityNumber,
      educationLevel: values.educationLevel,
      diplomaType: values.diplomaType || '',
      academicDiploma: values.academicDiploma || '',
      otherDiplomas: values.otherDiplomas || '',
      currentPosition: values.currentPosition || '',
      positionCode: values.positionCode || '',
      group: values.group,
      activity: values.activity || '',
      classe: values.classe || '',
      echelon: values.echelon || '',
      indice: values.indice || '',
      pbi: Number(values.pbi) || 0,
      structure: values.structure || '',
      reporting: values.reporting || '',
      code: values.code || '',
      structureType: values.structureType || '',
      decisionType: values.decisionType || '',
      decisionNumber: values.decisionNumber || '',
      decisionDate: values.decisionDate || '',
      effectiveDate: values.effectiveDate || '',
      positioning: values.positioning || '',
      suspensionFrom: values.suspensionFrom || '',
      suspensionTo: values.suspensionTo || '',
      lastDecision: values.lastDecision || '',
      // Banking Experience specific fields
      affectation: values.affectation || '',
      poste: values.poste || '',
      activite: values.activite || '',
      natureDecision: values.natureDecision || '',
      refDecision: values.refDecision || '',
      dateDecision: values.dateDecision || '',
      dateEffet: values.dateEffet || '',
      chargeInterim: values.chargeInterim || '',
      // Non-Banking Experience specific fields
      entreprise: values.entreprise || '',
      lieuTravail: values.lieuTravail || '',
      posteOccupe: values.posteOccupe || '',
      du: values.du || '',
      au: values.au || '',
      duree: values.duree || '',
      // Professional Training fields
      specialite: values.specialite || '',
      autreSpecialite: values.autreSpecialite || '',
      etablissement: values.etablissement || '',
      diplome: values.diplome || '',
      autreDiplome: values.autreDiplome || '',
      observations: values.observations || '',
      // Arabic and location fields
      prenomAr: values.prenomAr || '',
      nomAr: values.nomAr || '',
      fatherNameAr: values.fatherNameAr || '',
      motherNameAr: values.motherNameAr || '',
      motherLastNameAr: values.motherLastNameAr || '',
      wilayaNaissance: values.wilayaNaissance || '',
      dairaResidence: values.dairaResidence || '',
      adresseAr: values.adresseAr || '',
      // Initialize with empty disciplinary actions array
      disciplinaryActions: []
    }

    if (isEdit && currentRow) {
      // Update existing sheet
      dataActions.updateInformationSheet(currentRow.id, newSheet)
      toast.success('Employee information updated successfully')
    } else {
      // Add new sheet
      dataActions.addInformationSheet(newSheet)
      toast.success('New employee added successfully')
    }
    
    form.reset()
    onOpenChange(false)
  }

  // Function to populate form with predefined data
  const fillWithSampleData = () => {
    form.reset({
      matricule: 'EMP' + Math.floor(1000 + Math.random() * 9000),
      nom: 'Benali',
      prenom: 'Ahmed',
      nationalId: '1234567890123',
      fatherName: 'Mohamed Benali',
      motherName: 'Aicha Benali',
      spouseName: 'Fatima Benali',
      dateOfBirth: '1985-03-15',
      address: '123 Rue de la République, Algiers',
      gender: 'M',
      maritalStatus: 'Married',
      numberOfChildren: 2,
      hireDate: '2010-06-01',
      bankingExperience: '14 years',
      contractType: 'CDI',
      socialSecurityNumber: 'SS123456789',
      educationLevel: 'University',
      diplomaType: 'Bachelor',
      academicDiploma: 'Computer Science',
      otherDiplomas: 'Project Management',
      currentPosition: 'Senior Manager',
      positionCode: 'SM001',
      group: 'cadre',
      activity: 'Operations',
      classe: 'Executive',
      echelon: '12',
      indice: '850',
      pbi: 1,
      structure: 'Head Office',
      reporting: 'CEO',
      code: 'HO001',
      structureType: 'Administrative',
      decisionType: 'Promotion',
      decisionNumber: 'DEC-2023-001',
      decisionDate: '2023-01-15',
      effectiveDate: '2023-02-01',
      positioning: 'Strategic',
      suspensionFrom: '',
      suspensionTo: '',
      lastDecision: 'Promotion to Senior Manager',
      experienceType: 'bank',
      // Banking Experience fields
      affectation: 'Regional Directorate Algiers',
      poste: 'Customer Advisor',
      activite: 'Customer portfolio management',
      natureDecision: 'Appointment',
      refDecision: 'DR-2023-001',
      dateDecision: '2023-01-15',
      dateEffet: '2023-02-01',
      chargeInterim: 'No',
      // Non-Banking Experience fields
      entreprise: 'Tech Solutions Inc.',
      lieuTravail: 'Algiers, Algeria',
      posteOccupe: 'Software Developer',
      du: '2008-06-01',
      au: '2010-05-31',
      duree: '2 years',
      // Professional Training fields
      specialite: 'Gestion des risques',
      autreSpecialite: 'Conformité bancaire',
      etablissement: 'Institut National de Finance',
      diplome: 'Certificat en Gestion des Risques',
      autreDiplome: 'Atelier conformité',
      observations: 'Cycle certifiant 40h',
      // Arabic fields
      prenomAr: 'أحمد',
      nomAr: 'بن علي',
      fatherNameAr: 'محمد',
      motherNameAr: 'عائشة',
      motherLastNameAr: 'بن سعيد',
      wilayaNaissance: 'الجزائر',
      dairaResidence: 'سيدي امحمد',
      adresseAr: '123 شارع الجمهورية، الجزائر',
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-6xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? t('employeeForm.dialog.editTitle') : t('employeeForm.dialog.addTitle')}</DialogTitle>
          <DialogDescription>
            {isEdit ? t('employeeForm.dialog.editDescription') : t('employeeForm.dialog.addDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-2">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={fillWithSampleData}
            className="text-sm"
          >
            {t('employeeForm.buttons.fillSampleData')}
          </Button>
        </div>

        <Form {...form}>
          <form id='information-sheet-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Identification Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  {t('employeeForm.sections.identification')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='matricule'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('employeeForm.fields.employeeId')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('employeeForm.placeholders.enterEmployeeId')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='nom'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('employeeForm.fields.lastName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('employeeForm.placeholders.enterLastName')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='prenom'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('employeeForm.fields.firstName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('employeeForm.placeholders.enterFirstName')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='nationalId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('employeeForm.fields.nationalId')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('employeeForm.placeholders.enterNationalId')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='fatherName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Father name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='motherName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Mother name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='spouseName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spouse Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Spouse name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='dateOfBirth'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder='Address' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='gender'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='M'>Male</SelectItem>
                            <SelectItem value='F'>Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='maritalStatus'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Single'>Single</SelectItem>
                            <SelectItem value='Married'>Married</SelectItem>
                            <SelectItem value='Divorced'>Divorced</SelectItem>
                            <SelectItem value='Widowed'>Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='numberOfChildren'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Children</FormLabel>
                        <FormControl>
                          <Input 
                            type='number' 
                            min='0'
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='prenomAr'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name (Arabic) - الاسم</FormLabel>
                        <FormControl>
                          <Input placeholder='الاسم' {...field} dir='rtl' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='nomAr'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name (Arabic) - اللقب</FormLabel>
                        <FormControl>
                          <Input placeholder='اللقب' {...field} dir='rtl' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='fatherNameAr'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father Name (Arabic) - اسم الأب</FormLabel>
                        <FormControl>
                          <Input placeholder='اسم الأب' {...field} dir='rtl' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='motherNameAr'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother Name (Arabic) - اسم الأم</FormLabel>
                        <FormControl>
                          <Input placeholder='اسم الأم' {...field} dir='rtl' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='motherLastNameAr'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother Last Name (Arabic) - لقب الأم</FormLabel>
                        <FormControl>
                          <Input placeholder='لقب الأم' {...field} dir='rtl' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='wilayaNaissance'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wilaya of Birth - ولاية الميلاد</FormLabel>
                        <FormControl>
                          <Input placeholder='ولاية الميلاد' {...field} dir='rtl' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='dairaResidence'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daira of Residence - دائرة الإقامة</FormLabel>
                        <FormControl>
                          <Input placeholder='دائرة الإقامة' {...field} dir='rtl' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='adresseAr'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address (Arabic) - العنوان</FormLabel>
                        <FormControl>
                          <Input placeholder='العنوان' {...field} dir='rtl' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experience Type Selector */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Experience Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='experienceType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Choose type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='bank'>Banking Experience</SelectItem>
                            <SelectItem value='non-bank'>Non-Banking Experience</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Experience Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='hireDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hire Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='bankingExperience'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banking Experience</FormLabel>
                        <FormControl>
                          <Input placeholder='Years of experience' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contractType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='CDI'>Permanent</SelectItem>
                            <SelectItem value='CDD'>Temporary</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='socialSecurityNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Security Number</FormLabel>
                        <FormControl>
                          <Input placeholder='Social security number' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='educationLevel'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='None'>None</SelectItem>
                            <SelectItem value='Primary'>Primary</SelectItem>
                            <SelectItem value='Middle'>Middle</SelectItem>
                            <SelectItem value='Secondary'>Secondary</SelectItem>
                            <SelectItem value='University'>University</SelectItem>
                            <SelectItem value='Post Graduate'>Post Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='diplomaType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diploma Type</FormLabel>
                        <FormControl>
                          <Input placeholder='Type of diploma' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='academicDiploma'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Diploma</FormLabel>
                        <FormControl>
                          <Input placeholder='Academic diploma' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='otherDiplomas'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Diplomas</FormLabel>
                        <FormControl>
                          <Input placeholder='Other diplomas' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Position Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='currentPosition'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Position</FormLabel>
                        <FormControl>
                          <Input placeholder='Current position' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='positionCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position Code</FormLabel>
                        <FormControl>
                          <Input placeholder='Position code' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Socio-Professional Category Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Socio-Professional Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='group'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='cadre'>cadre</SelectItem>
                            <SelectItem value='maitrise'>maitrise</SelectItem>
                            <SelectItem value='execution'>execution</SelectItem>
                            <SelectItem value='cadre superieur'>cadre superieur</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='activity'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activity</FormLabel>
                        <FormControl>
                          <Input placeholder='Activity' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Classification Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Classification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='classe'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <FormControl>
                          <Input placeholder='Class' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='echelon'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <FormControl>
                          <Input placeholder='Level' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='indice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Index</FormLabel>
                        <FormControl>
                          <Input placeholder='Index' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='pbi'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PBI</FormLabel>
                        <FormControl>
                          <Input 
                            type='number' 
                            min='0'
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            placeholder='Enter PBI (number)'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Assignment Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='structure'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Structure</FormLabel>
                        <FormControl>
                          <Input placeholder='Structure' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='reporting'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reporting</FormLabel>
                        <FormControl>
                          <Input placeholder='Reporting line' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='code'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input placeholder='Code' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='structureType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Structure Type</FormLabel>
                        <FormControl>
                          <Input placeholder='Structure type' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Decision Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Decision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='decisionType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decision Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Dismissal'>Dismissal</SelectItem>
                            <SelectItem value='Positioning'>Positioning</SelectItem>
                            <SelectItem value='Suspension'>Suspension</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='decisionNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decision Number</FormLabel>
                        <FormControl>
                          <Input placeholder='Decision number' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='decisionDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decision Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='effectiveDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effective Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='positioning'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Positioning</FormLabel>
                        <FormControl>
                          <Input placeholder='Positioning' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Work Relationship Suspension Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Work Relationship Suspension
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='suspensionFrom'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='suspensionTo'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lastDecision'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Decision</FormLabel>
                        <FormControl>
                          <Input placeholder='Last decision' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Non-Banking Experience Section */}
            <Card className={form.watch('experienceType') === 'non-bank' ? '' : 'hidden'}>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Non-Banking Experience Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='entreprise'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder='Company name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lieuTravail'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Location</FormLabel>
                        <FormControl>
                          <Input placeholder='City / Location' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='posteOccupe'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder='Position held' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='du'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='au'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='duree'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g., 2 years 3 months' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Banking Experience Section */}
            <Card className={form.watch('experienceType') === 'bank' ? '' : 'hidden'}>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Banking Experience Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='affectation'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assignment</FormLabel>
                        <FormControl>
                          <Input placeholder='Assignment' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='poste'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder='Position' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='activite'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activity</FormLabel>
                        <FormControl>
                          <Input placeholder='Activity' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='natureDecision'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decision Type</FormLabel>
                        <FormControl>
                          <Input placeholder='Decision type' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='refDecision'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decision Reference</FormLabel>
                        <FormControl>
                          <Input placeholder='Decision reference' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='dateDecision'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decision Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='dateEffet'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effective Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='chargeInterim'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interim Charge</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Yes'>Yes</SelectItem>
                            <SelectItem value='No'>No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Training Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Professional Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='specialite'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialty</FormLabel>
                        <FormControl>
                          <Input placeholder='Main specialty' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='autreSpecialite'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Specialty</FormLabel>
                        <FormControl>
                          <Input placeholder='Additional specialty' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='etablissement'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input placeholder='Training institution' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='du'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='au'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='diplome'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diploma</FormLabel>
                        <FormControl>
                          <Input placeholder='Main diploma' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='autreDiplome'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Diploma</FormLabel>
                        <FormControl>
                          <Input placeholder='Additional diploma' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='observations'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observations</FormLabel>
                        <FormControl>
                          <Input placeholder='Additional notes' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>

        <DialogFooter className='flex gap-2'>
          <Button type='submit' form='information-sheet-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
