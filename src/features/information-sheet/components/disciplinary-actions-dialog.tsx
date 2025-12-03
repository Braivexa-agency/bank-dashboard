'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
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
const baseSchema = z.object({
  typeSanction: z.string().min(1),
  classification: z.string().min(1),
  numeroDecision: z.string().min(1),
  dateDecision: z.string().min(1),
  dateEffet: z.string().min(1),
  motifSanction: z.string().min(1),
})

type DisciplinaryActionForm = z.infer<typeof baseSchema>

interface Props {
  currentRow?: DisciplinaryAction
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: DisciplinaryActionForm) => void
}

export function DisciplinaryActionsDialog({ currentRow, open, onOpenChange, onSave }: Props) {
  const isEdit = !!currentRow
  const { t } = useTranslation()

  const disciplinaryActionFormSchema = z.object({
    typeSanction: z.string().min(1, { message: t('disciplinaryForm.validation.sanctionTypeRequired') }),
    classification: z.string().min(1, { message: t('disciplinaryForm.validation.classificationRequired') }),
    numeroDecision: z.string().min(1, { message: t('disciplinaryForm.validation.decisionNumberRequired') }),
    dateDecision: z.string().min(1, { message: t('disciplinaryForm.validation.decisionDateRequired') }),
    dateEffet: z.string().min(1, { message: t('disciplinaryForm.validation.effectiveDateRequired') }),
    motifSanction: z.string().min(1, { message: t('disciplinaryForm.validation.reasonRequired') }),
  })

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
    
    // Show success message
    toast.success(
      isEdit 
        ? 'Disciplinary action updated successfully!' 
        : 'Disciplinary action added successfully!'
    )
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
          <DialogTitle>{isEdit ? t('disciplinaryForm.dialog.editTitle') : t('disciplinaryForm.dialog.addTitle')}</DialogTitle>
          <DialogDescription>
            {isEdit ? t('disciplinaryForm.dialog.editDescription') : t('disciplinaryForm.dialog.addDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              {t('disciplinaryForm.sections.details')}
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
                        <FormLabel>{t('disciplinaryForm.fields.sanctionType')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('disciplinaryForm.placeholders.selectSanctionType')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Warning'>{t('disciplinaryForm.options.warning')}</SelectItem>
                            <SelectItem value='Reprimand'>{t('disciplinaryForm.options.reprimand')}</SelectItem>
                            <SelectItem value='Suspension'>{t('disciplinaryForm.options.suspension')}</SelectItem>
                            <SelectItem value='Dismissal'>{t('disciplinaryForm.options.dismissal')}</SelectItem>
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
                        <FormLabel>{t('disciplinaryForm.fields.classification')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('disciplinaryForm.placeholders.selectClassification')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Minor'>{t('disciplinaryForm.options.minor')}</SelectItem>
                            <SelectItem value='Major'>{t('disciplinaryForm.options.major')}</SelectItem>
                            <SelectItem value='Severe'>{t('disciplinaryForm.options.severe')}</SelectItem>
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
                        <FormLabel>{t('disciplinaryForm.fields.decisionNumber')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('disciplinaryForm.placeholders.decisionNumber')} {...field} />
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
                        <FormLabel>{t('disciplinaryForm.fields.decisionDate')}</FormLabel>
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
                        <FormLabel>{t('disciplinaryForm.fields.effectiveDate')}</FormLabel>
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
                        <FormLabel>{t('disciplinaryForm.fields.reason')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('disciplinaryForm.placeholders.reason')} {...field} />
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
            {t('common.saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
