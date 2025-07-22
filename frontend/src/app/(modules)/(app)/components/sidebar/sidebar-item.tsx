'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/common/button';
import { Hint } from '@/components/ui/custom/hint';
import { cn } from '@/utils/tw-merge';
import { useSidebar } from '../../hooks/sidebar';
import type { Route } from './route.interface';

interface SidebarItemProps {
  route: Route;
}

export function SidebarItem({ route }: SidebarItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isActive = pathname === route.href;

  return isCollapsed ? (
    <Hint asChild label={route.label} side="right">
      <Button
        asChild
        className={cn('h-11 w-full justify-center', isActive && 'bg-accent')}
        variant="ghost"
      >
        <Link href={route.href}>
          <route.icon className="mr-0 size-5" />
        </Link>
      </Button>
    </Hint>
  ) : (
    <Button
      asChild
      className={cn('w-full justify-start', isActive && 'bg-accent')}
      variant="ghost"
    >
      <Link className="flex items-start gap-x-4" href={route.href}>
        <route.icon className="mr-0 size-5" />
        {route.label}
      </Link>
    </Button>
  );
}
