import type { ReactNode } from 'react';

export type ConfirmItem = {
  title: string;
  key: string;
  description: string;
  htmlContent?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  action: () => Promise<boolean>;
  onSuccess?: () => void;
};
