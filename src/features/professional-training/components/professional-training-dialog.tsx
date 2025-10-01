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
import { ProfessionalTraining } from '../context/professional-training-context'

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

const trainingFormSchema = z.object({
  specialite: z.string().min(1, { message: 'Specialty is required.' }),
  autreSpecialite: z.string().optional(),
  etablissement: z.string().min(1, { message: 'Institution is required.' }),
  du: z.string().min(1, { message: 'Start Date is required.' }),
  au: z.string().min(1, { message: 'End Date is required.' }),
  diplome: z.string().min(1, { message: 'Diploma is required.' }),
  autreDiplome: z.string().optional(),
  observations: z.string().optional(),
})

type EmployeeForm = z.infer<typeof employeeFormSchema>
type TrainingForm = z.infer<typeof trainingFormSchema>

interface Props {
  currentRow?: ProfessionalTraining
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfessionalTrainingDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow

  const employeeForm = useForm<EmployeeForm>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      employeeId: '',
      lastName: '',
      firstName: '',
      fatherName: '',
      motherName: '',
      dateOfBirth: '',
      maritalStatus: '',
      gender: '',
      spouseName: '',
      currentPosition: '',
      group: '',
      hireDate: '',
      contractType: '',
      assignment: '',
      structure: '',
      reporting: '',
      code: '',
      structureType: '',
      activity: '',
      bankingExperience: '',
      positioning: '',
    },
  })

  const trainingForm = useForm<TrainingForm>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          specialite: '',
          autreSpecialite: '',
          etablissement: '',
          du: '',
          au: '',
          diplome: '',
          autreDiplome: '',
          observations: '',
        },
  })

  const onSubmitEmployee = (values: EmployeeForm) => {
    showSubmittedData(values)
    // Here you would typically save the employee info to context or state
  }

  const onSubmitTraining = (values: TrainingForm) => {
    showSubmittedData(values)
    employeeForm.reset()
    trainingForm.reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        employeeForm.reset()
        trainingForm.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Professional Training' : 'Add New Professional Training'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the professional training here. ' : 'Create new professional training here. '}
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

          {/* Professional Training Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-primary'>Professional Training Details</h3>
            <Form {...trainingForm}>
              <form
                id='training-form'
                onSubmit={trainingForm.handleSubmit(onSubmitTraining)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <FormField
                    control={trainingForm.control}
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
                    control={trainingForm.control}
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
                    control={trainingForm.control}
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
                    control={trainingForm.control}
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
                    control={trainingForm.control}
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
                    control={trainingForm.control}
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
                    control={trainingForm.control}
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
                    control={trainingForm.control}
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
              </form>
            </Form>
          </div>
        </div>

        <DialogFooter className='flex gap-2'>
          <Button type='submit' form='training-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
