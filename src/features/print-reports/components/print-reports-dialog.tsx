'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/utils/show-submitted-data'
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
import { usePrintReports } from '../context/print-reports-context'

const employeeFormSchema = z.object({
  matricule: z.string().min(1, { message: 'Employee ID is required.' }),
  nom: z.string().min(1, { message: 'Last Name is required.' }),
  prenom: z.string().min(1, { message: 'First Name is required.' }),
  filsDe: z.string().min(1, { message: 'Father Name is required.' }),
  etDe: z.string().min(1, { message: 'Mother Name is required.' }),
  dateNaissance: z.string().min(1, { message: 'Date of Birth is required.' }),
  situationFamiliale: z.string().min(1, { message: 'Marital Status is required.' }),
  sexe: z.string().min(1, { message: 'Gender is required.' }),
  nomConjoint: z.string().optional(),
  dateRecrutement: z.string().min(1, { message: 'Hire Date is required.' }),
  natureContrat: z.string().min(1, { message: 'Contract Type is required.' }),
  posteOccupe: z.string().min(1, { message: 'Position is required.' }),
  groupe: z.string().min(1, { message: 'Group is required.' }),
  chargeInterim: z.string().optional(),
  structure: z.string().min(1, { message: 'Structure is required.' }),
  rattachement: z.string().min(1, { message: 'Reporting is required.' }),
  code: z.string().min(1, { message: 'Code is required.' }),
  typeStructure: z.string().min(1, { message: 'Structure Type is required.' }),
  activite: z.string().min(1, { message: 'Activity is required.' }),
  experienceBanque: z.string().min(1, { message: 'Banking Experience is required.' }),
  positionnement: z.string().min(1, { message: 'Positioning is required.' }),
  affectation: z.string().min(1, { message: 'Assignment is required.' }),
})

const cnasFormSchema = z.object({
  numeroAdherent: z.string().min(1, { message: 'Member Number is required.' }),
  adresseAdherent: z.string().min(1, { message: 'Member Address is required.' }),
})

const enqueteFormSchema = z.object({
  wilayaNaissance: z.string().min(1, { message: 'Birth Wilaya is required.' }),
  wilayaResidence: z.string().min(1, { message: 'Residence Wilaya is required.' }),
  numeroTelephone: z.string().min(1, { message: 'Phone Number is required.' }),
})

type EmployeeForm = z.infer<typeof employeeFormSchema>
type CNASForm = z.infer<typeof cnasFormSchema>
type EnqueteForm = z.infer<typeof enqueteFormSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrintReportsDialog({ open, onOpenChange }: Props) {
  const { setEmployeeInfo, setCnasInfo, setEnqueteInfo } = usePrintReports()

  const employeeForm = useForm<EmployeeForm>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      matricule: '',
      nom: '',
      prenom: '',
      filsDe: '',
      etDe: '',
      dateNaissance: '',
      situationFamiliale: '',
      sexe: '',
      nomConjoint: '',
      dateRecrutement: '',
      natureContrat: '',
      posteOccupe: '',
      groupe: '',
      chargeInterim: '',
      structure: '',
      rattachement: '',
      code: '',
      typeStructure: '',
      activite: '',
      experienceBanque: '',
      positionnement: '',
      affectation: '',
    },
  })

  const cnasForm = useForm<CNASForm>({
    resolver: zodResolver(cnasFormSchema),
    defaultValues: {
      numeroAdherent: '',
      adresseAdherent: '',
    },
  })

  const enqueteForm = useForm<EnqueteForm>({
    resolver: zodResolver(enqueteFormSchema),
    defaultValues: {
      wilayaNaissance: '',
      wilayaResidence: '',
      numeroTelephone: '',
    },
  })

  const onSubmitEmployee = (values: EmployeeForm) => {
    showSubmittedData(values)
    setEmployeeInfo(values)
  }

  const onSubmitCNAS = (values: CNASForm) => {
    showSubmittedData(values)
    setCnasInfo(values)
  }

  const onSubmitEnquete = (values: EnqueteForm) => {
    showSubmittedData(values)
    setEnqueteInfo(values)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        employeeForm.reset()
        cnasForm.reset()
        enqueteForm.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='text-left'>
          <DialogTitle>Generate Employee Report</DialogTitle>
          <DialogDescription>
            Fill in the employee information to generate reports and certificates.
          </DialogDescription>
        </DialogHeader>
        
        <div className='space-y-6'>
          {/* Employee Information Section */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...employeeForm}>
                <form
                  id='employee-form'
                  onSubmit={employeeForm.handleSubmit(onSubmitEmployee)}
                  className='space-y-4'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                    <FormField
                      control={employeeForm.control}
                      name='matricule'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee ID</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter employee ID' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={employeeForm.control}
                      name='nom'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter last name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={employeeForm.control}
                      name='prenom'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter first name' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={employeeForm.control}
                      name='filsDe'
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
                      control={employeeForm.control}
                      name='etDe'
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
                      control={employeeForm.control}
                      name='dateNaissance'
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
                      control={employeeForm.control}
                      name='situationFamiliale'
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
                              <SelectItem value='single'>Single</SelectItem>
                              <SelectItem value='married'>Married</SelectItem>
                              <SelectItem value='divorced'>Divorced</SelectItem>
                              <SelectItem value='widowed'>Widowed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={employeeForm.control}
                      name='sexe'
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
                              <SelectItem value='male'>Male</SelectItem>
                              <SelectItem value='female'>Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={employeeForm.control}
                      name='nomConjoint'
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
                      control={employeeForm.control}
                      name='dateRecrutement'
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
                      control={employeeForm.control}
                      name='natureContrat'
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
                              <SelectItem value='permanent'>Permanent</SelectItem>
                              <SelectItem value='temporary'>Temporary</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={employeeForm.control}
                      name='posteOccupe'
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
                      control={employeeForm.control}
                      name='groupe'
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
                      control={employeeForm.control}
                      name='chargeInterim'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interim Charge</FormLabel>
                          <FormControl>
                            <Input placeholder='Interim charge details' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={employeeForm.control}
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
                      control={employeeForm.control}
                      name='rattachement'
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
                      control={employeeForm.control}
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
                      control={employeeForm.control}
                      name='typeStructure'
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
                    <FormField
                      control={employeeForm.control}
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
                      control={employeeForm.control}
                      name='experienceBanque'
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
                      control={employeeForm.control}
                      name='positionnement'
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
                    <FormField
                      control={employeeForm.control}
                      name='affectation'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assignment</FormLabel>
                          <FormControl>
                            <Input placeholder='Current assignment' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* CNAS Information Section */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                CNAS Declaration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...cnasForm}>
                <form
                  id='cnas-form'
                  onSubmit={cnasForm.handleSubmit(onSubmitCNAS)}
                  className='space-y-4'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
                    <FormField
                      control={cnasForm.control}
                      name='numeroAdherent'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Member Number</FormLabel>
                          <FormControl>
                            <Input placeholder='CNAS member number' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={cnasForm.control}
                      name='adresseAdherent'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Member Address</FormLabel>
                          <FormControl>
                            <Input placeholder='Full address' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Administrative Survey Section */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Administrative Survey & Bulletin #02
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...enqueteForm}>
                <form
                  id='enquete-form'
                  onSubmit={enqueteForm.handleSubmit(onSubmitEnquete)}
                  className='space-y-4'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                    <FormField
                      control={enqueteForm.control}
                      name='wilayaNaissance'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birth Wilaya</FormLabel>
                          <FormControl>
                            <Input placeholder='Birth wilaya' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={enqueteForm.control}
                      name='wilayaResidence'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Residence Wilaya</FormLabel>
                          <FormControl>
                            <Input placeholder='Residence wilaya' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={enqueteForm.control}
                      name='numeroTelephone'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type='tel' placeholder='Phone number' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className='flex gap-2'>
          <Button type='submit' form='employee-form'>
            Save Employee Info
          </Button>
          <Button type='submit' form='cnas-form'>
            Save CNAS Info
          </Button>
          <Button type='submit' form='enquete-form'>
            Save Survey Info
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => {
              window.location.assign('/_authenticated/print-reports/?view=enquete-wilaya')
              onOpenChange(false)
            }}
          >
            Open Enquête Wilaya
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => {
              window.location.assign('/_authenticated/print-reports/?view=enquete-daira')
              onOpenChange(false)
            }}
          >
            Open Enquête Daira
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
