"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  Truck,
  Settings,
  History,
  Users,
  FileBarChart,
  BookText
} from 'lucide-react';
import { NovaPosIcon } from '@/components/icons/nova-pos-icon';

const menuItems = [
  { href: '/', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/sales', label: 'Penjualan', icon: ShoppingCart },
  { href: '/inventory', label: 'Inventaris', icon: Boxes },
  { href: '/orders', label: 'Pesanan Pembelian', icon: Truck },
  { href: '/history', label: 'Riwayat', icon: History },
  { href: '/reports', label: 'Laporan', icon: FileBarChart },
  { href: '/accounting', label: 'Akuntansi', icon: BookText },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <NovaPosIcon className="size-8 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight font-headline">
            Nova POS
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/users')}
              tooltip="Pengguna"
            >
              <Link href="/users">
                <Users />
                <span>Pengguna</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/settings')}
              tooltip="Pengaturan"
            >
              <Link href="/settings">
                <Settings />
                <span>Pengaturan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
