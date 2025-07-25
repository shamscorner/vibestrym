'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCurrentAccount } from '@/app/(modules)/(auth)/hooks/current-account';
import { Form, FormField } from '@/components/ui/common/form';
import { Heading } from '@/components/ui/custom/heading';
import {
  ToggleCard,
  ToggleCardSkeleton,
} from '@/components/ui/custom/toggle-card';
import { useChangeChatSettingsMutation } from '@/graphql/_generated/output';
import {
  type ChangeChatSettingsSchema,
  changeChatSettingsSchema,
} from './chat-settings.schema';

export function ChatSettingsForm() {
  const t = useTranslations('dashboard.chatSettings');

  const { user, isLoadingProfile } = useCurrentAccount();

  const form = useForm<ChangeChatSettingsSchema>({
    resolver: zodResolver(changeChatSettingsSchema),
    values: {
      isChatEnabled: user?.stream.isChatEnabled ?? false,
      isChatFollowersOnly: user?.stream.isChatFollowersOnly ?? false,
      isChatPremiumFollowersOnly:
        user?.stream.isChatPremiumFollowersOnly ?? false,
    },
  });

  const [update, { loading: isLoadingUpdate }] = useChangeChatSettingsMutation({
    onCompleted() {
      toast.success(t('successMessage'));
    },
    onError() {
      toast.error(t('errorMessage'));
    },
  });

  function onChange(field: keyof ChangeChatSettingsSchema, value: boolean) {
    form.setValue(field, value);

    update({
      variables: {
        data: { ...form.getValues(), [field]: value },
      },
    });
  }

  return (
    <div className='max-w-2xl lg:px-10'>
      <Heading
        description={t('header.description')}
        size="lg"
        title={t('header.heading')}
      />
      <div className="mt-3 flex flex-col gap-y-6">
        {isLoadingProfile ? (
          Array.from({ length: 3 }).map((_, index) => (
            <ToggleCardSkeleton key={index} />
          ))
        ) : (
          <Form {...form}>
            <FormField
              control={form.control}
              name="isChatEnabled"
              render={({ field }) => (
                <ToggleCard
                  description={t('isChatEnabled.description')}
                  heading={t('isChatEnabled.heading')}
                  isDisabled={isLoadingUpdate}
                  onChange={(value) => onChange('isChatEnabled', value)}
                  value={field.value}
                />
              )}
            />
            <FormField
              control={form.control}
              name="isChatFollowersOnly"
              render={({ field }) => (
                <ToggleCard
                  description={t('isChatFollowersOnly.description')}
                  heading={t('isChatFollowersOnly.heading')}
                  isDisabled={isLoadingUpdate}
                  onChange={(value) => onChange('isChatFollowersOnly', value)}
                  value={field.value}
                />
              )}
            />
            <FormField
              control={form.control}
              name="isChatPremiumFollowersOnly"
              render={({ field }) => (
                <ToggleCard
                  description={t('isChatPremiumFollowersOnly.description')}
                  heading={t('isChatPremiumFollowersOnly.heading')}
                  isDisabled={isLoadingUpdate || !user?.isVerified}
                  onChange={(value) =>
                    onChange('isChatPremiumFollowersOnly', value)
                  }
                  value={field.value}
                />
              )}
            />
          </Form>
        )}
      </div>
    </div>
  );
}
