import { Slash, Star } from 'lucide-react';
import { NavLink } from './nav-link';
import ProfileButton from './profile-button';
import ThemeSwitcher from './theme-switcher';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export default function Header() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Star />
        <Slash className="-rotate-[24deg] size-3 text-border" />
        <Button
          asChild
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          size="sm"
          variant="ghost"
        >
          <NavLink href={'/dashboard/rooms'}>Rooms</NavLink>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" />
        <ProfileButton />
      </div>
    </header>
  );
}
