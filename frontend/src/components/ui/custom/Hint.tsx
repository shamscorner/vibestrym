import type { PropsWithChildren } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../common/tooltip';

interface HintProps {
  label: string;
  asChild?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  aling?: 'start' | 'center' | 'end';
}

export function Hint({
  children,
  label,
  asChild,
  aling,
  side,
}: PropsWithChildren<HintProps>) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          align={aling}
          side={side}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
