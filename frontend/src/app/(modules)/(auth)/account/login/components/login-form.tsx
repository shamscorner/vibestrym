'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { captureException } from '@sentry/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { GoogleIcon } from '@/components/icons/google-icon';
import { Button } from '@/components/ui/common/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/common/form';
import { Input } from '@/components/ui/common/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/input-otp';
import { useLoginUserMutation } from '@/graphql/_generated/output';
import { cn } from '@/utils/tw-merge';
import { useAuth } from '../../../hooks';
import { type LoginSchema, loginSchema } from '../login.schema';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const t = useTranslations('auth.login');

  const router = useRouter();
  const { auth } = useAuth();

  const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const [loginUser, { loading: isLoadingLogin }] = useLoginUserMutation({
    onCompleted: (data) => {
      if (data.loginUser.message) {
        setIsShowTwoFactor(true);
        return;
      }
      auth();
      router.push('/dashboard/settings');
    },
    onError: (error) => {
      toast.error(error.message || t('errorMessage'));
      captureException(error, {
        extra: {
          action: 'login',
          variables: form.getValues(),
        },
      });
    },
  });

  function onSubmit(values: LoginSchema) {
    loginUser({
      variables: { data: values },
    });
  }

  return (
    <Form {...form}>
      <form
        {...props}
        className={cn('flex flex-col gap-6', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <h1 className="font-bold text-2xl">{t('heading')}</h1>
          <p className="text-balance text-muted-foreground text-sm">
            {t('description')}
          </p>
        </div>
        <div className="grid gap-6">
          {isShowTwoFactor ? (
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pin.label')}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className='w-full'>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>{t('pin.description')}</FormDescription>
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login.label')}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting || isLoadingLogin}
                        placeholder="bdlive"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{t('login.description')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>{t('password.label')}</FormLabel>
                      <Link
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                        href="/account/recovery/reset-password"
                      >
                        {t('forgotPassword')}
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        disabled={isSubmitting || isLoadingLogin}
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t('password.description')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button
            className="w-full"
            disabled={isSubmitting || !isValid || isLoadingLogin}
            type="submit"
          >
            {t('submitButton')}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              {t('socialDivider')}
            </span>
          </div>
          <Button
            className="w-full"
            disabled={isSubmitting || isLoadingLogin}
            type="button"
            variant="outline"
          >
            <GoogleIcon />
            {t('googleButton')}
          </Button>
        </div>
        <div className="text-center text-sm">
          {t('registerText')}{' '}
          <Link className="underline underline-offset-4" href="/account/create">
            {t('registerLink')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
