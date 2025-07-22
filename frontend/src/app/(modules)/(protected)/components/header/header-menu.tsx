'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/common/button';
import { useAuth } from '../../../(auth)/hooks';
import { ProfileMenu } from '../profile-menu';

export function HeaderMenu() {
  const t = useTranslations('protected.header.menu');
  const { isAuthenticated } = useAuth();

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {isAuthenticated ? (
        <ProfileMenu />
      ) : (
        <>
          <Button asChild variant="secondary">
            <Link href="/account/login">{t('login')}</Link>
          </Button>
          <Button asChild>
            <Link href="/account/create">{t('register')}</Link>
          </Button>
        </>
      )}
    </div>
  );
}
