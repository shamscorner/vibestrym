'use client';

import { type PropsWithChildren, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/media-query';
import { cn } from '@/utils/tw-merge';
import { useSidebar } from '../hooks/sidebar';

export function LayoutWrapper({ children }: PropsWithChildren<unknown>) {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const { isCollapsed, open, close } = useSidebar();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <it only depends on the isMobile state during the initial render>
  useEffect(() => {
    if (isMobile !== isCollapsed) {
      isMobile ? close() : open();
    }
  }, [isMobile]);

  return (
    <main
      className={cn(
        'mt-[75px] flex-1 p-8',
        isCollapsed ? 'ml-16' : 'ml-16 lg:ml-64'
      )}
    >
      {children}
    </main>
  );
}
