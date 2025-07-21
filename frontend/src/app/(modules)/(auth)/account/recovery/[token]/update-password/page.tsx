import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { UpdatePasswordForm } from './components/update-password-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.updatePassword');
  return {
    title: t('title'),
    description: t('description'),
    ...NO_INDEX_PAGE,
  };
}

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
