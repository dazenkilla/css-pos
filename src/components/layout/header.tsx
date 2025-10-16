import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Armchair, ShoppingBag } from 'lucide-react';
import { CustomLink } from '@/components/ui/custom-link';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      
      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm" className="gap-1">
          <CustomLink href="/sales/direct">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Penjualan Langsung</span>
          </CustomLink>
        </Button>
        <Button asChild variant="outline" size="sm" className="gap-1">
          <CustomLink href="/sales/tables">
            <Armchair className="h-4 w-4" />
            <span className="hidden sm:inline">Denah Meja</span>
          </CustomLink>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="Avatar Pengguna" />
                <AvatarFallback>SB</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <CustomLink href="/users">Pengguna</CustomLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <CustomLink href="/settings">Pengaturan</CustomLink>
          </DropdownMenuItem>
          <DropdownMenuItem>Dukungan</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <CustomLink href="/login">Keluar</CustomLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
