import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/common/button';

export default async function NotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
        <h1 className="block font-bold text-7xl text-foreground sm:text-9xl">
          404
        </h1>
        <p className="mt-3 text-muted-foreground">{t('description')}</p>
        <Link
          className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3"
          href="/"
        >
          <Button variant="secondary">{t('backToHome')}</Button>
        </Link>
      </div>
    </div>
  );
}
