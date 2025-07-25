import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/tw-merge';

export interface AppLogoProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> {
  width?: number;
  height?: number;
  href?: string;
}

export function Logo({
  width = 140,
  height = 68,
  href = '/',
  className,
}: AppLogoProps) {
  const t = useTranslations('app.header.logo');

  return (
    <Link
      className={cn('flex flex-col items-start', className)}
      href={href}
      rel="home"
    >
      <Image
        alt={t('alt')}
        className="-ml-5"
        height={height}
        priority
        src="/logo.png"
        style={{ width, height }}
        title={t('title')}
        width={width}
      />
      <span className="-mt-3 text-muted-foreground text-xs">{t('slogan')}</span>
    </Link>
  );
}
