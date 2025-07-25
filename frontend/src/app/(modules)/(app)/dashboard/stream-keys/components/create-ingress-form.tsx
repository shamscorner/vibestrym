'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCurrentAccount } from '@/app/(modules)/(auth)/hooks/current-account';
import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/common/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/common/select';
import { useCreateIngressMutation } from '@/graphql/_generated/output';
import {
  type CreateIngressSchema,
  createIngressSchema,
  IngressType,
} from './create-ingress.schema';

export function CreateIngressForm() {
  const t = useTranslations('dashboard.streamKeys.createDialog');

  const [isOpen, setIsOpen] = useState(false);
  const { refetch } = useCurrentAccount();

  const form = useForm<CreateIngressSchema>({
    resolver: zodResolver(createIngressSchema),
    defaultValues: {
      ingressType: IngressType.RTMP,
    },
  });

  const [create, { loading: isLoadingCreate }] = useCreateIngressMutation({
    onCompleted() {
      setIsOpen(false);
      refetch();
      toast.success(t('successMessage'));
    },
    onError() {
      toast.error(t('errorMessage'));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: CreateIngressSchema) {
    create({ variables: { ingressType: data.ingressType } });
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>{t('trigger')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('heading')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="mt-3 flex flex-col gap-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="ingressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('ingressTypeLabel')}</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value.toString()}
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('ingressTypePlaceholder')}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          disabled={isLoadingCreate}
                          value={IngressType.RTMP.toString()}
                        >
                          RTMP
                        </SelectItem>
                        <SelectItem
                          disabled={isLoadingCreate}
                          value={IngressType.WHIP.toString()}
                        >
                          WHIP
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    {t('ingressTypeDescription')}
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="mt-4 flex justify-end">
              <Button disabled={!isValid || isLoadingCreate}>
                {t('submitButton')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
