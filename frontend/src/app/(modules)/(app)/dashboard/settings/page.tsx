import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { UserSettings } from './components/user-settings';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dashboard.settings');
  return {
    title: t('title'),
    description: t('description'),
    ...NO_INDEX_PAGE,
  };
}

export default function SettingsPage() {
  return <UserSettings />;
}
