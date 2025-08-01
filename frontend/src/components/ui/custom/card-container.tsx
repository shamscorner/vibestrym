import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import type { IconType } from 'react-icons';

import { cn } from '@/utils/tw-merge';

import { Card } from '../common/card';

interface CardContainerProps {
  heading: string;
  description?: string;
  Icon?: LucideIcon | IconType;
  isRightContentFull?: boolean;
  rightContent?: ReactNode;
  className?: string;
}

export function CardContainer({
  heading,
  description,
  Icon,
  isRightContentFull,
  rightContent,
  children,
  className,
}: PropsWithChildren<CardContainerProps>) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="flex flex-row items-center gap-x-4">
          {Icon && (
            <div className="rounded-full bg-foreground p-2.5">
              <Icon className="size-7 text-secondary" />
            </div>
          )}
          <div className='flex min-w-[100px] flex-col gap-y-1'>
            <h2 className="font-semibold tracking-wide">{heading}</h2>
            {description && (
              <p className="max-w-4xl text-muted-foreground text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
        {rightContent && (
          <div className={cn(isRightContentFull && 'w-full')}>
            {rightContent}
          </div>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </Card>
  );
}
