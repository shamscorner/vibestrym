import { AppLogo } from '@/components/AppLogo';
import { AppHeaderMenu } from './AppHeaderMenu';
import { AppSearch } from './AppSearch';

export function AppHeader() {
  return (
    <header className="flex h-full items-center gap-x-4 border-border border-b bg-card p-4">
      <AppLogo height={58} width={120} />
      <AppSearch />
      <AppHeaderMenu />
    </header>
  );
}
