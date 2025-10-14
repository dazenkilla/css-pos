"use client";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
import { CustomLink } from '@/components/ui/custom-link';

const menuItems = [
  { href: '/', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/sales', label: 'Penjualan', icon: ShoppingCart },
  { href: '/inventory', label: 'Inventaris', icon: Boxes },
  { href: '/orders', label: 'Pesanan Pembelian', icon: Truck },
  { href: '/suppliers', label: 'Supplier', icon: Users },
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
          <Image src="/logo.png" alt="App Logo" width={32} height={32} className="size-8" />
          <h2 className="text-sm font-semibold tracking-tight font-headline">
            Creative Software Solution | POS
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
                <CustomLink href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </CustomLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
