'use client';

import { CircleCheckIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/common/alert';
import { Button } from '@/components/ui/common/button';
import { useClearSessionCookieMutation, useLogoutUserMutation } from '@/graphql/_generated/output';
import { useAuth } from '../../hooks';

export function LogoutForm() {
  const t = useTranslations('auth.logout');

  const { exit } = useAuth();
  const [clear] = useClearSessionCookieMutation();

  const [isFinished, setIsFinished] = useState(false);

  const [logoutUser, { loading: isLoggingOut }] = useLogoutUserMutation({
    async onCompleted() {
      await clear();
      exit();
      toast.success(t('successMessage'));
      setIsFinished(true);
    },
    onError(error) {
      clear();
      const errMessage = error.message || t('errorMessage');
      toast.error(errMessage);
      setIsFinished(true);
    },
  });

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return isLoggingOut || !isFinished ? (
    <div className="flex items-center justify-center">
      <Loader2Icon className="size-8 animate-spin" />
    </div>
  ) : (
    <Alert>
      <CircleCheckIcon className="size-4" />
      <AlertTitle>{t('successAlert.title')}</AlertTitle>
      <AlertDescription>
        <p>{t('successAlert.description')}</p>
        <Button asChild className="mt-5 mb-2 w-full">
          <Link href="/account/login">{t('loginAgain')}</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
