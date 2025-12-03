import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((state) => state.auth.setAccessToken)
  const { t } = useTranslation()

  const handleSkipLogin = () => {
    // Set a temporary token to bypass authentication
    setAccessToken('temporary-skip-token')
    navigate({ to: '/' })
  }

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>{t('auth.loginTitle')}</CardTitle>
          <CardDescription>
            {t('auth.loginDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        <CardFooter className='flex flex-col gap-4'>
          <Button 
            variant='destructive' 
            className='w-full'
            onClick={handleSkipLogin}
          >
            <AlertTriangle className='mr-2 h-4 w-4' />
            {t('auth.skipLoginTemporary')}
          </Button>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            {t('auth.termsAgreement')}{' '}
            <a
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              {t('auth.termsOfService')}
            </a>{' '}
            {t('auth.and')}{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              {t('auth.privacyPolicy')}
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
