'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { captureException } from '@sentry/nextjs';
import { CircleCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { type ComponentProps, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { GoogleIcon } from '@/components/icons/google-icon';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/common/alert';
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
import { useCreateUserMutation } from '@/graphql/_generated/output';
import { cn } from '@/utils/tw-merge';
import {
  type CreateAccountFormSchema,
  createAccountFormSchema,
} from '../create-account.schemas';

export function CreateAccountForm({
  className,
  ...props
}: ComponentProps<'form'>) {
  const t = useTranslations('auth.register');

  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CreateAccountFormSchema>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const [createUser, { loading: isLoadingCreate }] = useCreateUserMutation({
    onCompleted: () => {
      setIsSuccess(true);
    },
    onError: (error) => {
      setIsSuccess(false);
      toast.error(error.message || t('errorMessage'));
      captureException(error, {
        extra: {
          action: 'create-account',
          variables: form.getValues(),
        },
      });
    },
  });

  function onSubmit(values: CreateAccountFormSchema) {
    createUser({
      variables: { data: values },
    });
  }

  return isSuccess ? (
    <Alert>
      <CircleCheckIcon className="size-4" />
      <AlertTitle>{t('successAlert.title')}</AlertTitle>
      <AlertDescription>{t('successAlert.description')}</AlertDescription>
    </Alert>
  ) : (
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('username.label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoadingCreate}
                    placeholder="vibestrym"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('username.description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email.label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoadingCreate}
                    placeholder="mail@vibestrym.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('email.description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password.label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoadingCreate}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('password.description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            disabled={isSubmitting || !isValid || isLoadingCreate}
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
            disabled={isSubmitting || isLoadingCreate}
            type="button"
            variant="outline"
          >
            <GoogleIcon />
            {t('googleButton')}
          </Button>
        </div>
        <div className="text-center text-sm">
          {t('loginText')}{' '}
          <Link className="underline underline-offset-4" href="/account/login">
            {t('loginLink')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
