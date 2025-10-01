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
import { DisciplinaryAction } from '../context/disciplinary-actions-context'

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

const disciplinaryActionFormSchema = z.object({
  typeSanction: z.string().min(1, { message: 'Sanction Type is required.' }),
  classification: z.string().min(1, { message: 'Classification is required.' }),
  numeroDecision: z.string().min(1, { message: 'Decision Number is required.' }),
  dateDecision: z.string().min(1, { message: 'Decision Date is required.' }),
  dateEffet: z.string().min(1, { message: 'Effective Date is required.' }),
  motifSanction: z.string().min(1, { message: 'Reason is required.' }),
})

type EmployeeForm = z.infer<typeof employeeFormSchema>
type DisciplinaryActionForm = z.infer<typeof disciplinaryActionFormSchema>

interface Props {
  currentRow?: DisciplinaryAction
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DisciplinaryActionsDialog({ currentRow, open, onOpenChange }: Props) {
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

  const disciplinaryActionForm = useForm<DisciplinaryActionForm>({
    resolver: zodResolver(disciplinaryActionFormSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          typeSanction: '',
          classification: '',
          numeroDecision: '',
          dateDecision: '',
          dateEffet: '',
          motifSanction: '',
        },
  })

  const onSubmitEmployee = (values: EmployeeForm) => {
    showSubmittedData(values)
    // Here you would typically save the employee info to context or state
  }

  const onSubmitDisciplinaryAction = (values: DisciplinaryActionForm) => {
    showSubmittedData(values)
    employeeForm.reset()
    disciplinaryActionForm.reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        employeeForm.reset()
        disciplinaryActionForm.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Disciplinary Action' : 'Add New Disciplinary Action'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the disciplinary action here. ' : 'Create new disciplinary action here. '}
            Click save when you&apos;re done.
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
            </CardContent>
          </Card>

          {/* Disciplinary Action Section */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Disciplinary Action Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...disciplinaryActionForm}>
                <form
                  id='disciplinary-action-form'
                  onSubmit={disciplinaryActionForm.handleSubmit(onSubmitDisciplinaryAction)}
                  className='space-y-4'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
                    <FormField
                      control={disciplinaryActionForm.control}
                      name='typeSanction'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sanction Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select sanction type' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='Warning'>Warning</SelectItem>
                              <SelectItem value='Reprimand'>Reprimand</SelectItem>
                              <SelectItem value='Suspension'>Suspension</SelectItem>
                              <SelectItem value='Dismissal'>Dismissal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={disciplinaryActionForm.control}
                      name='classification'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Classification</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select classification' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='Minor'>Minor</SelectItem>
                              <SelectItem value='Major'>Major</SelectItem>
                              <SelectItem value='Severe'>Severe</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={disciplinaryActionForm.control}
                      name='numeroDecision'
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
                      control={disciplinaryActionForm.control}
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
                      control={disciplinaryActionForm.control}
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
                      control={disciplinaryActionForm.control}
                      name='motifSanction'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Sanction</FormLabel>
                          <FormControl>
                            <Input placeholder='Reason for disciplinary action' {...field} />
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
          <Button type='submit' form='disciplinary-action-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
