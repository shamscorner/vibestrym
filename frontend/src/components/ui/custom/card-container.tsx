import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import type { IconType } from 'react-icons'

import { cn } from '@/utils/tw-merge';

import { Card } from '../common/card';

interface CardContainerProps {
  heading: string;
  description?: string;
  Icon?: LucideIcon | IconType;
  isRightContentFull?: boolean;
  rightContent?: ReactNode;
}

export function CardContainer({
  heading,
  description,
  Icon,
  isRightContentFull,
  rightContent,
  children,
}: PropsWithChildren<CardContainerProps>) {
  return (
    <Card className="p-4">
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="flex flex-row items-center gap-x-4">
          {Icon && (
            <div className="rounded-full bg-foreground p-2.5">
              <Icon className="size-7 text-secondary" />
            </div>
          )}
          <div className="flex flex-col gap-y-1">
            <h2 className="font-semibold tracking-wide">{heading}</h2>
            {description && (
              <p className="max-w-4xl text-muted-foreground text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
        {rightContent && (
          <div className={cn(isRightContentFull && 'ml-6 w-full')}>
            {rightContent}
          </div>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </Card>
  );
}
