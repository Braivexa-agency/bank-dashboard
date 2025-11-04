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
import { BankExperience } from '../context/bank-experience-context'

const employeeFormSchema = z.object({
  employeeId: z.string().min(1, { message: 'Employee ID is required.' }),
  lastName: z.string().min(1, { message: 'Last Name is required.' }),
  firstName: z.string().min(1, { message: 'First Name is required.' }),
  fatherName: z.string().min(1, { message: 'Father Name is required.' }),
  motherName: z.string().min(1, { message: 'Mother Name is required.' }),
  dateOfBirth: z.string().min(1, { message: 'Date of Birth is required.' }),
  maritalStatus: z.string().min(1, { message: 'Marital Status is required.' }),
  gender: z.string().min(1, { message: 'Gender is required.' }),
  spouseName: z.string().optional(),
  currentPosition: z.string().min(1, { message: 'Current Position is required.' }),
  group: z.string().min(1, { message: 'Group is required.' }),
  hireDate: z.string().min(1, { message: 'Hire Date is required.' }),
  contractType: z.string().min(1, { message: 'Contract Type is required.' }),
  assignment: z.string().min(1, { message: 'Assignment is required.' }),
  structure: z.string().min(1, { message: 'Structure is required.' }),
  reporting: z.string().min(1, { message: 'Reporting is required.' }),
  code: z.string().min(1, { message: 'Code is required.' }),
  structureType: z.string().min(1, { message: 'Structure Type is required.' }),
  activity: z.string().min(1, { message: 'Activity is required.' }),
  bankingExperience: z.string().min(1, { message: 'Banking Experience is required.' }),
  positioning: z.string().min(1, { message: 'Positioning is required.' }),
})

const experienceFormSchema = z.object({
  affectation: z.string().min(1, { message: 'Assignment is required.' }),
  poste: z.string().min(1, { message: 'Position is required.' }),
  activite: z.string().min(1, { message: 'Activity is required.' }),
  classe: z.string().min(1, { message: 'Class is required.' }),
  echelon: z.string().min(1, { message: 'Level is required.' }),
  pbi: z.number().min(0, { message: 'PBI must be a non-negative number.' }),
  natureDecision: z.string().min(1, { message: 'Decision Type is required.' }),
  refDecision: z.string().min(1, { message: 'Decision Reference is required.' }),
  dateDecision: z.string().min(1, { message: 'Decision Date is required.' }),
  dateEffet: z.string().min(1, { message: 'Effective Date is required.' }),
  chargeInterim: z.string().min(1, { message: 'Interim Charge is required.' }),
})

type EmployeeForm = z.infer<typeof employeeFormSchema>
type ExperienceForm = z.infer<typeof experienceFormSchema>

interface Props {
  currentRow?: BankExperience
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BankExperienceDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow

  const employeeForm = useForm<EmployeeForm>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      employeeId: 'EMP-0001',
      lastName: 'Doe',
      firstName: 'John',
      fatherName: 'Richard',
      motherName: 'Jane',
      dateOfBirth: '1990-01-15',
      maritalStatus: 'single',
      gender: 'male',
      spouseName: '',
      currentPosition: 'Agent de caisse',
      group: 'cadre',
      hireDate: '2015-06-01',
      contractType: 'permanent',
      assignment: 'Agence Alger Centre',
      structure: 'Agence 001',
      reporting: 'Chef d’agence',
      code: 'AG001',
      structureType: 'Agence',
      activity: 'Retail Banking',
      bankingExperience: '10 ans',
      positioning: 'Titulaire',
    },
  })

  const experienceForm = useForm<ExperienceForm>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          affectation: '',
          poste: '',
          activite: '',
          classe: '',
          echelon: '',
          pbi: 0,
          natureDecision: '',
          refDecision: '',
          dateDecision: '',
          dateEffet: '',
          chargeInterim: '',
        },
  })

  const onSubmitEmployee = (values: EmployeeForm) => {
    showSubmittedData(values)
    // Here you would typically save the employee info to context or state
  }

  const onSubmitExperience = (values: ExperienceForm) => {
    showSubmittedData(values)
    employeeForm.reset()
    experienceForm.reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        employeeForm.reset()
        experienceForm.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Banking Experience' : 'Add New Banking Experience'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the banking experience here. ' : 'Create new banking experience here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        <div className='space-y-6'>
          {/* Employee Information Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-primary'>Employee Information</h3>
            <Form {...employeeForm}>
              <form
                id='employee-form'
                onSubmit={employeeForm.handleSubmit(onSubmitEmployee)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <FormField
                    control={employeeForm.control}
                    name='employeeId'
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
                    name='lastName'
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
                    name='firstName'
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
                    control={employeeForm.control}
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
                    control={employeeForm.control}
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
                    control={employeeForm.control}
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
                    control={employeeForm.control}
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
                    control={employeeForm.control}
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
                    control={employeeForm.control}
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
                    control={employeeForm.control}
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
                    name='assignment'
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
                  <FormField
                    control={employeeForm.control}
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
                  <FormField
                    control={employeeForm.control}
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
                    control={employeeForm.control}
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
              </form>
            </Form>
          </div>

          {/* Banking Experience Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-primary'>Banking Experience Details</h3>
            <Form {...experienceForm}>
              <form
                id='experience-form'
                onSubmit={experienceForm.handleSubmit(onSubmitExperience)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <FormField
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
                  <FormField
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
                    control={experienceForm.control}
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
              </form>
            </Form>
          </div>
        </div>

        <DialogFooter className='flex gap-2'>
          {/* <Button variant='outline' className='space-x-1'>
            <span>Download</span> <IconDownload size={18} />
          </Button> */}
          <Button type='submit' form='experience-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
