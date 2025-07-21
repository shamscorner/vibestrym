import type { PropsWithChildren } from 'react';
import { AppHeader } from './components/AppHeader';
// import { LayoutContainer } from '@/components/layout/LayoutContainer';
// import { Sidebar } from '@/components/layout/sidebar/Sidebar';

export default function ProtectedLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <div className="fixed inset-y-0 z-50 h-[75px] w-full">
          <AppHeader />
        </div>
        {children}
        {/* <Sidebar /> */}
        {/* <LayoutContainer>{children}</LayoutContainer> */}
      </div>
    </div>
  );
}
