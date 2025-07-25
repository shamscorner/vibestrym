import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';
import { CardContainer } from '@/components/ui/custom/card-container';
import { CopyButton } from '@/components/ui/custom/copy-button';

interface StreamKeyProps {
  value?: string | null;
}

export function StreamKey({ value }: StreamKeyProps) {
  const t = useTranslations('dashboard.streamKeys.key');

  const [isShow, setIsShow] = useState(false);

  const Icon = isShow ? Eye : EyeOff;

  return (
    <CardContainer
      heading={t('heading')}
      isRightContentFull
      rightContent={
        <div className="flex w-full items-center gap-x-4">
          <Input
            disabled
            placeholder={t('heading')}
            type={isShow ? 'text' : 'password'}
            value={value ?? ''}
          />
          {value && <CopyButton value={value} />}
          <Button
            onClick={() => setIsShow(!isShow)}
            size="icon"
            variant="ghost"
          >
            <Icon className="size-5" />
          </Button>
        </div>
      }
    />
  );
}
