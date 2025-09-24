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
import { InformationSheet } from '../context/information-sheet-context'

const informationSheetSchema = z.object({
  matricule: z.string().min(1, { message: 'Employee ID is required.' }),
  nom: z.string().min(1, { message: 'Last Name is required.' }),
  prenom: z.string().min(1, { message: 'First Name is required.' }),
  nationalId: z.string().min(1, { message: 'National ID is required.' }),
  fatherName: z.string().min(1, { message: 'Father Name is required.' }),
  motherName: z.string().min(1, { message: 'Mother Name is required.' }),
  spouseName: z.string().optional(),
  dateOfBirth: z.string().min(1, { message: 'Date of Birth is required.' }),
  address: z.string().optional(),
  gender: z.string().min(1, { message: 'Gender is required.' }),
  maritalStatus: z.string().min(1, { message: 'Marital Status is required.' }),
  numberOfChildren: z.number().min(0, { message: 'Number of children must be 0 or more.' }),
  hireDate: z.string().min(1, { message: 'Hire Date is required.' }),
  bankingExperience: z.string().optional(),
  contractType: z.string().min(1, { message: 'Contract Type is required.' }),
  socialSecurityNumber: z.string().min(1, { message: 'Social Security Number is required.' }),
  educationLevel: z.string().min(1, { message: 'Education Level is required.' }),
  diplomaType: z.string().optional(),
  academicDiploma: z.string().optional(),
  otherDiplomas: z.string().optional(),
  currentPosition: z.string().optional(),
  positionCode: z.string().optional(),
  group: z.string().min(1, { message: 'Group is required.' }),
  activity: z.string().optional(),
  classe: z.string().optional(),
  echelon: z.string().optional(),
  indice: z.string().optional(),
  pbi: z.string().optional(),
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
  // Banking Experience fields
  affectation: z.string().optional(),
  poste: z.string().optional(),
  activite: z.string().optional(),
  natureDecision: z.string().optional(),
  refDecision: z.string().optional(),
  dateDecision: z.string().optional(),
  dateEffet: z.string().optional(),
  chargeInterim: z.string().optional(),
  // Non-Banking Experience fields
  entreprise: z.string().optional(),
  lieuTravail: z.string().optional(),
  posteOccupe: z.string().optional(),
  du: z.string().optional(),
  au: z.string().optional(),
  duree: z.string().optional(),
})

type InformationSheetForm = z.infer<typeof informationSheetSchema>

interface Props {
  currentRow?: InformationSheet
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InformationSheetDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow

  const form = useForm<InformationSheetForm>({
    resolver: zodResolver(informationSheetSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          matricule: '',
          nom: '',
          prenom: '',
          nationalId: '',
          fatherName: '',
          motherName: '',
          spouseName: '',
          dateOfBirth: '',
          address: '',
          gender: '',
          maritalStatus: '',
          numberOfChildren: 0,
          hireDate: '',
          bankingExperience: '',
          contractType: '',
          socialSecurityNumber: '',
          educationLevel: '',
          diplomaType: '',
          academicDiploma: '',
          otherDiplomas: '',
          currentPosition: '',
          positionCode: '',
          group: '',
          activity: '',
          classe: '',
          echelon: '',
          indice: '',
          pbi: '',
          structure: '',
          reporting: '',
          code: '',
          structureType: '',
          decisionType: '',
          decisionNumber: '',
          decisionDate: '',
          effectiveDate: '',
          positioning: '',
          suspensionFrom: '',
          suspensionTo: '',
          lastDecision: '',
          // Banking Experience fields
          affectation: '',
          poste: '',
          activite: '',
          natureDecision: '',
          refDecision: '',
          dateDecision: '',
          dateEffet: '',
          chargeInterim: '',
          // Non-Banking Experience fields
          entreprise: '',
          lieuTravail: '',
          posteOccupe: '',
          du: '',
          au: '',
          duree: '',
        },
  })

  const onSubmit = (values: InformationSheetForm) => {
    showSubmittedData(values)
    form.reset()
    onOpenChange(false)
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
          <DialogTitle>{isEdit ? 'Edit Employee Information' : 'Add New Employee Information'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the employee information here. ' : 'Create new employee information here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Identification Section */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Identification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
                    name='nationalId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>National ID</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter national ID' {...field} />
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
                            <SelectItem value='Executive'>Executive</SelectItem>
                            <SelectItem value='Management'>Management</SelectItem>
                            <SelectItem value='Execution'>Execution</SelectItem>
                            <SelectItem value='Senior Executive'>Senior Executive</SelectItem>
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
            <Card>
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
            <Card>
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
