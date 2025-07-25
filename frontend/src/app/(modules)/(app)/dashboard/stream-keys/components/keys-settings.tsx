'use client';

import { useTranslations } from 'next-intl';
import { useCurrentAccount } from '@/app/(modules)/(auth)/hooks/current-account';
import { Heading } from '@/components/ui/custom/heading';
import { ToggleCardSkeleton } from '@/components/ui/custom/toggle-card';
import { CreateIngressForm } from './create-ingress-form';
import { InstructionModal } from './instruction-dialog';
import { StreamKey } from './stream-key';
import { StreamURL } from './stream-url';

export function KeysSettings() {
  const t = useTranslations('dashboard.streamKeys.header');

  const { user, isLoadingProfile } = useCurrentAccount();

  return (
    <div className='max-w-4xl lg:px-10'>
      <div className="block items-center justify-between space-y-3 lg:flex lg:space-y-0">
        <Heading
          description={t('description')}
          size="lg"
          title={t('heading')}
        />
        <div className="flex items-center gap-x-4">
          <InstructionModal />
          <CreateIngressForm />
        </div>
      </div>
      <div className="mt-5 space-y-6">
        {isLoadingProfile ? (
          Array.from({ length: 2 }).map((_, index) => (
            <ToggleCardSkeleton key={index} />
          ))
        ) : (
          <>
            <StreamURL value={user?.stream.serverUrl} />
            <StreamKey value={user?.stream.streamKey} />
          </>
        )}
      </div>
    </div>
  );
}
