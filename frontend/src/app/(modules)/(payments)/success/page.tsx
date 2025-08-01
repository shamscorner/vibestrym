import { CheckCircleIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/common/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/common/card';
import { convertPrice } from '@/utils/convert-price';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('payment.success');

  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SuccessPage(props: {
  searchParams: Promise<{
    price: number;
    username: string;
  }>;
}) {
  const t = await getTranslations('payment.success');

  const searchParams = await props.searchParams;

  if (!(searchParams.price && searchParams.username)) {
    redirect('/');
  }

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircleIcon className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className='font-bold text-2xl'>{t('heading')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-semibold">{t('details.heading')}</h3>
            <ul className="flex flex-col gap-y-2">
              <li className="flex items-center">
                <span>
                  {t('details.price')} ${convertPrice(searchParams.price)}
                </span>
              </li>
              <li className="flex items-center">
                <span>{t('details.duration')} 1 month</span>
              </li>
              <li className="flex items-center">
                <span>
                  {t('details.channel')} {searchParams.username}
                </span>
              </li>
            </ul>
          </div>
          <p className="text-center text-muted-foreground">
            {t('congratulations')}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-y-4">
          <div className="flex gap-x-4">
            <Link href="/">
              <Button className="w-full">{t('backToHome')}</Button>
            </Link>
            <Link href={`/${searchParams.username}`}>
              <Button className="w-full" variant="secondary">
                {t('backToChannel')}
              </Button>
            </Link>
          </div>
          <p className='text-center text-muted-foreground text-sm'>
            {t('support')}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
