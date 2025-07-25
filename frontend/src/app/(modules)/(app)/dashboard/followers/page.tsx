import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { FollowersTable } from './components/followers-table';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dashboard.followers');
  return {
    title: t('title'),
    description: t('description'),
    ...NO_INDEX_PAGE,
  };
}

export default function FollowersPage() {
  return <FollowersTable />;
}
