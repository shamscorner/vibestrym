'use client';

import { useTranslations } from 'next-intl';
import type { PropsWithChildren } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../common/alert-dialog';

interface ConfirmDialogProps {
  heading: string;
  message: string;
  confirmButton?: string;
  onConfirm: () => void;
}

export function ConfirmDialog({
  children,
  heading,
  message,
  confirmButton = '',
  onConfirm,
}: PropsWithChildren<ConfirmDialogProps>) {
  const t = useTranslations('common.confirmDialog');

  if (!confirmButton) {
    confirmButton = t('continueButton');
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{heading}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancelButton')}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
