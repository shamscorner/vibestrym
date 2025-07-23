'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { captureException } from '@sentry/nextjs';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCurrentAccount } from '@/app/(modules)/(auth)/hooks/current-account';
import { Button } from '@/components/ui/common/button';
import { Form, FormField } from '@/components/ui/common/form';
import { Skeleton } from '@/components/ui/common/skeleton';
import { ChannelAvatar } from '@/components/ui/custom/channel-avatar';
import { FormWrapper } from '@/components/ui/custom/form-wrapper';
import {
  useChangeProfileAvatarMutation,
  useRemoveProfileAvatarMutation,
} from '@/graphql/_generated/output';
import { useConfirmDialog } from '@/hooks/confirm-dialog';
import {
  type UploadFileSchema,
  uploadFileSchema,
} from '@/schemas/upload-file.schema';

export function ChangeAvatarForm() {
  const t = useTranslations('dashboard.settings.profile.avatar');
  const [avatarKey, setAvatarKey] = useState<number>(Date.now());

  const { user, isLoadingProfile, refetch } = useCurrentAccount();
  const { confirm: confirmRemove } = useConfirmDialog();

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
        // Reset the form value to undefined after successful removal
        form.setValue('file', undefined);
        // Force re-render of the avatar component
        setAvatarKey(Date.now());
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
                  key={avatarKey}
                  size="xl"
                />
                <div className="flex flex-col gap-y-3">
                  <div className="flex items-center gap-x-3">
                    <input
                      accept="image/*"
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
                      <Button
                        disabled={isLoadingUpdate || isLoadingRemove}
                        onClick={async () =>
                          await confirmRemove({
                            title: t('confirmDialog.heading'),
                            description: t('confirmDialog.message'),
                            actionType: 'destructive',
                            action: async () => {
                              await remove();
                              return true;
                            },
                          })
                        }
                        size="icon"
                        variant="ghost"
                      >
                        <Trash className="size-4" />
                      </Button>
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
