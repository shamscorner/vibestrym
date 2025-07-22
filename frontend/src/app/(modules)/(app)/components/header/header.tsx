import { Logo } from '@/components/logo';
import { Search } from '../search';
import { HeaderMenu } from './header-menu';

export function Header() {
  return (
    <header className="flex h-full items-center gap-x-4 border-border border-b bg-card p-4">
      <Logo height={58} width={120} />
      <Search />
      <HeaderMenu />
    </header>
  );
}
