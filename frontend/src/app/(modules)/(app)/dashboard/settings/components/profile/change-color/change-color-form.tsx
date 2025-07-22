'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';

import { CardContainer } from '@/components/ui/custom/card-container';
import { BASE_COLORS } from '@/constants/colors.constants';
import { useConfig } from '@/hooks/config';

export function ChangeColorForm() {
  const t = useTranslations('dashboard.settings.appearance.color');

  const config = useConfig();

  return (
    <CardContainer
      description={t('description')}
      heading={t('heading')}
      rightContent={
        <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
          {BASE_COLORS.map((theme, index) => {
            const isActive = config.theme === theme.name;

            return (
              <button
                key={index}
                onClick={() => config.setTheme(theme.name)}
                style={
                  {
                    '--theme-primary': `hsl(${theme.color})`,
                  } as CSSProperties
                }
                type="button"
              >
                <span className="-translate-x-1 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[--theme-primary] hover:border-2 hover:border-foreground">
                  {isActive && <Check className="size-5 text-foreground" />}
                </span>
              </button>
            );
          })}
        </div>
      }
    />
  );
}
