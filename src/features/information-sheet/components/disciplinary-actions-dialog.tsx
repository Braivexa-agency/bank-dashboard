'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { DisciplinaryAction } from '@/stores/dataStore'
import { toast } from 'sonner'

const disciplinaryActionFormSchema = z.object({
  typeSanction: z.string().min(1, { message: 'Sanction Type is required.' }),
  classification: z.string().min(1, { message: 'Classification is required.' }),
  numeroDecision: z.string().min(1, { message: 'Decision Number is required.' }),
  dateDecision: z.string().min(1, { message: 'Decision Date is required.' }),
  dateEffet: z.string().min(1, { message: 'Effective Date is required.' }),
  motifSanction: z.string().min(1, { message: 'Reason is required.' }),
})

type DisciplinaryActionForm = z.infer<typeof disciplinaryActionFormSchema>

interface Props {
  currentRow?: DisciplinaryAction
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: DisciplinaryActionForm) => void
}

export function DisciplinaryActionsDialog({ currentRow, open, onOpenChange, onSave }: Props) {
  const isEdit = !!currentRow

  const form = useForm<DisciplinaryActionForm>({
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

  const onSubmit = (values: DisciplinaryActionForm) => {
    onSave(values)
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
      <DialogContent className='sm:max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Disciplinary Action' : 'Add New Disciplinary Action'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the disciplinary action here. ' : 'Create new disciplinary action here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              Disciplinary Action Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id='disciplinary-action-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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

        <DialogFooter className='flex gap-2'>
          <Button type='submit' form='disciplinary-action-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
