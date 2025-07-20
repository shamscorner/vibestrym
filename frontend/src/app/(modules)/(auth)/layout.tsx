import { ArrowLeftIcon, VideotapeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/common/button';
import AuthBackground from './assets/images/auth-background.webp';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const t = await getTranslations('auth.common');

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a className="flex items-center gap-2 font-medium" href="/">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <VideotapeIcon className="size-6" />
            </div>
            BDLive
          </a>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <div className="w-full max-w-sm">{children}</div>
          <div className="w-full max-w-sm">
            <Button asChild className="w-full" variant="ghost">
              <Link className="text-muted-foreground" href="/">
                <ArrowLeftIcon className="size-4" />
                <span>{t('goBack')}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
          height={1080}
          priority
          src={AuthBackground}
          width={1920}
        />
      </div>
    </div>
  );
}
