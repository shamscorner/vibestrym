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
import { Button, type ButtonVariants } from '../common/button';

interface ConfirmDialogProps {
  heading: string;
  message: string;
  confirmButton?: string;
  actionType?: ButtonVariants['variant'];
  onConfirm: () => void;
}

export function ConfirmDialog({
  children,
  heading,
  message,
  confirmButton = '',
  actionType = 'default',
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
          <AlertDialogAction asChild>
            <Button onClick={onConfirm} variant={actionType}>
              {confirmButton}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
