import type { ReactNode } from 'react';

import type { ButtonVariants } from '@/components/ui/common/button';

export type ConfirmItem = {
  title: string;
  key: string;
  description: string;
  htmlContent?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  actionType?: ButtonVariants['variant'];
  action: () => boolean | Promise<boolean>;
  onSuccess?: () => void;
};
