'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { captureException } from '@sentry/nextjs';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { useNewPasswordMutation } from '@/graphql/_generated/output';
import { cn } from '@/utils/tw-merge';
import {
  type UpdatePasswordSchema,
  updatePasswordSchema,
} from '../update-password.schema';

export function UpdatePasswordForm({
  className,
  ...props
}: ComponentProps<'form'>) {
  const t = useTranslations('auth.updatePassword');

  const router = useRouter();
  const params = useParams<{ token: string }>();

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
  });

  const { isSubmitting } = form.formState;

  const [updatePassword, { loading: isLoadingUpdatePassword }] =
    useNewPasswordMutation({
      onCompleted: () => {
        toast.success(t('successMessage'));
        router.push('/account/login');
      },
      onError: (error) => {
        toast.error(error.message || t('errorMessage'));
        captureException(error, {
          extra: {
            action: 'updatePassword',
            variables: form.getValues(),
          },
        });
      },
    });

  function onSubmit(values: UpdatePasswordSchema) {
    updatePassword({
      variables: { data: { ...values, token: params.token } },
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password.label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoadingUpdatePassword}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('password.description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('passwordRepeat.label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoadingUpdatePassword}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('passwordRepeat.description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            disabled={isSubmitting || isLoadingUpdatePassword}
            type="submit"
          >
            {t('submitButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
