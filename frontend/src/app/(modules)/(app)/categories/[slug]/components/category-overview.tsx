'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/custom/heading';
import type { FindCategoryBySlugQuery } from '@/graphql/_generated/output';
import { getMediaSource } from '@/utils/get-media-source';
import { StreamsList } from '../../../(home)/components/stream-list';

interface CategoryOverviewProps {
  category: FindCategoryBySlugQuery['findCategoryBySlug'];
}

export function CategoryOverview({ category }: CategoryOverviewProps) {
  const t = useTranslations('categories.overview');

  return (
    <div className="flex flex-col gap-y-10">
      <div className='flex flex-col gap-x-6 lg:flex-row lg:items-center lg:gap-y-6'>
        <Image
          alt={category.title}
          className="rounded-xl object-cover"
          height={256}
          src={getMediaSource(category.thumbnailUrl)}
          width={192}
        />
        <Heading
          description={category.description ?? ''}
          size="xl"
          title={category.title}
        />
      </div>
      <StreamsList heading={t('heading')} streams={category.streams} />
    </div>
  );
}
