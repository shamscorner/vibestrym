import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dashboard');
  return {
    title: t('title'),
    description: t('description'),
    ...NO_INDEX_PAGE,
  };
}

export default function DashboardPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='font-bold text-2xl'>Welcome to the Dashboard</h1>
      <p className='mt-4 text-gray-600'>This is your dashboard page.</p>
    </div>
  );
}
