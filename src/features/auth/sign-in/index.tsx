import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>{t('auth.loginTitle')}</CardTitle>
          <CardDescription>
            {t('auth.loginDescription')} <br />
            Don&apos;t have an account?{' '}
            <Link
              to='/sign-up'
              className='hover:text-primary underline underline-offset-4'
            >
              Sign Up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        <CardFooter className='flex flex-col gap-4'>
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
