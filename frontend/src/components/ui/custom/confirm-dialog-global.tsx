'use client';

import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/common/alert-dialog';
import { useConfirmStore } from '@/store/confirm-dialog/confirm-dialog.store';

export function ConfirmDialogGlobal() {
  const t = useTranslations('common.confirmDialog');
  const { isOpen, item, closeConfirm, executeAction } = useConfirmStore();

  const handleConfirm = () => {
    executeAction();
  };

  const handleCancel = () => {
    closeConfirm();
  };

  return (
    <AlertDialog onOpenChange={(open) => !open && closeConfirm()} open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{item?.title}</AlertDialogTitle>
          <AlertDialogDescription>{item?.description}</AlertDialogDescription>
          {item?.htmlContent && (
            <div className="text-muted-foreground text-sm">
              {item.htmlContent}
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {item?.cancelText || t('cancelButton')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {item?.confirmText || t('continueButton')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
