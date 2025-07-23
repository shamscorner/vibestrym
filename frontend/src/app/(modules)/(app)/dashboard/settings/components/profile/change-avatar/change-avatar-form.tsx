'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { captureException } from '@sentry/nextjs';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCurrentAccount } from '@/app/(modules)/(auth)/hooks/current-account';
import { Button } from '@/components/ui/common/button';
import { Form, FormField } from '@/components/ui/common/form';
import { Skeleton } from '@/components/ui/common/skeleton';
import { ChannelAvatar } from '@/components/ui/custom/channel-avatar';
import { ConfirmModal } from '@/components/ui/custom/confirm-modal';
import { FormWrapper } from '@/components/ui/custom/form-wrapper';
import {
  useChangeProfileAvatarMutation,
  useRemoveProfileAvatarMutation,
} from '@/graphql/_generated/output';
import {
  type UploadFileSchema,
  uploadFileSchema,
} from '@/schemas/upload-file.schema';

export function ChangeAvatarForm() {
  const t = useTranslations('dashboard.settings.profile.avatar');

  const { user, isLoadingProfile, refetch } = useCurrentAccount();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      file: user?.avatar || undefined,
    },
  });

  const [update, { loading: isLoadingUpdate }] = useChangeProfileAvatarMutation(
    {
      onCompleted() {
        refetch();
        toast.success(t('updateMessage.success'));
      },
      onError(error) {
        captureException(error, {
          extra: {
            userId: user?.id,
            action: 'ChangeAvatarForm.update',
          },
        });
        toast.error(t('updateMessage.error'));
      },
    }
  );

  const [remove, { loading: isLoadingRemove }] = useRemoveProfileAvatarMutation(
    {
      onCompleted() {
        refetch();
        toast.success(t('removeMessage.success'));
      },
      onError(error) {
        captureException(error, {
          extra: {
            userId: user?.id,
            action: 'ChangeAvatarForm.remove',
          },
        });
        toast.error(t('removeMessage.error'));
      },
    }
  );

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    form.setValue('file', file);
    update({ variables: { avatar: file } });
  }

  return isLoadingProfile ? (
    <ChangeAvatarFormSkeleton />
  ) : (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <div className="px-5 pb-5">
              <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-center">
                <ChannelAvatar
                  channel={{
                    username: user?.username || '',
                    avatar:
                      field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : field.value,
                  }}
                  size="xl"
                />
                <div className="flex flex-col gap-y-3">
                  <div className="flex items-center gap-x-3">
                    <input
                      className="hidden"
                      onChange={handleImageChange}
                      ref={inputRef}
                      type="file"
                    />
                    <Button
                      disabled={isLoadingUpdate || isLoadingRemove}
                      onClick={() => inputRef.current?.click()}
                      variant="secondary"
                    >
                      {t('updateButton')}
                    </Button>
                    {user?.avatar && (
                      <ConfirmModal
                        confirmButton={t('confirmModal.confirmButton')}
                        heading={t('confirmModal.heading')}
                        message={t('confirmModal.message')}
                        onConfirm={() => remove()}
                      >
                        <Button
                          disabled={isLoadingUpdate || isLoadingRemove}
                          size="icon"
                          variant="ghost"
                        >
                          <Trash className="size-4" />
                        </Button>
                      </ConfirmModal>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{t('info')}</p>
                </div>
              </div>
            </div>
          )}
        />
      </Form>
    </FormWrapper>
  );
}

export function ChangeAvatarFormSkeleton() {
  return <Skeleton className="h-52 w-full" />;
}
