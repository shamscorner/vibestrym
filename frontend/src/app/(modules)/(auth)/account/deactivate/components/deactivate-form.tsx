'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { captureException } from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ComponentProps, useState } from 'react';
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
} from '@/components/ui/common/form';
import { Input } from '@/components/ui/common/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/input-otp';
import { useDeactivateAccountMutation } from '@/graphql/_generated/output';
import { useAuth } from '../../../hooks';
import {
  type DeactivateSchema,
  deactivateSchema,
} from '../deactivate-account.schema';

export function DeactivateForm({
  className,
  ...props
}: ComponentProps<'form'>) {
  const t = useTranslations('auth.deactivate');

  const { exit } = useAuth();
  const router = useRouter();

  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const form = useForm<DeactivateSchema>({
    resolver: zodResolver(deactivateSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [deactivate, { loading: isLoadingDeactivate }] =
    useDeactivateAccountMutation({
      onCompleted(data) {
        if (data.deactivateAccount.message) {
          setIsShowConfirm(true);
        } else {
          exit();
          toast.success(t('successMessage'));
          router.push('/');
        }
      },
      onError(error) {
        captureException(error, {
          extra: {
            action: 'deactivateAccount',
            data: form.getValues(),
          },
        });
        toast.error(error.message || t('errorMessage'));
      },
    });

  const { isValid } = form.formState;

  function onSubmit(data: DeactivateSchema) {
    deactivate({ variables: { data } });
  }

  return (
    <Form {...form}>
      <form
        {...props}
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <h1 className="font-bold text-2xl">{t('heading')}</h1>
          <p className="text-balance text-muted-foreground text-sm">
            {t('description')}
          </p>
        </div>
        {isShowConfirm ? (
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pin.label')}</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email.label')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingDeactivate}
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('email.description')}</FormDescription>
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
                      disabled={isLoadingDeactivate}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('password.description')}</FormDescription>
                </FormItem>
              )}
            />
          </>
        )}
        <Button
          className="mt-2 w-full"
          disabled={!isValid || isLoadingDeactivate}
        >
          {t('submitButton')}
        </Button>
      </form>
    </Form>
  );
}
