
"use client";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
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
  BookText,
  ChevronDown,
  Tags,
  ClipboardList,
  Armchair,
  ShoppingBag
} from 'lucide-react';
import { CustomLink } from '@/components/ui/custom-link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import React from 'react';


const mainMenuItems = [
  { href: '/', label: 'Dasbor', icon: LayoutDashboard },
];

const salesSubItems = [
    { href: '/sales/direct', label: 'Penjualan Langsung', icon: ShoppingBag },
    { href: '/sales/tables', label: 'Denah Meja', icon: Armchair },
    { href: '/history', label: 'Riwayat Penjualan', icon: History },
];

const inventorySubItems = [
    { href: '/inventory', label: 'Daftar Produk', icon: Boxes },
    { href: '/inventory/stock-opname', label: 'Stok Opname', icon: ClipboardList },
    { href: '/inventory/categories', label: 'Kategori', icon: Tags },
];

const purchasingSubItems = [
    { href: '/orders', label: 'Pesanan Pembelian', icon: Truck },
    { href: '/suppliers', label: 'Supplier', icon: Users },
];

const accountingSubItems = [
    { href: '/accounting', label: 'Dasbor Akuntansi', icon: BookText },
    { href: '/accounting/chart-of-accounts', label: 'Bagan Akun', icon: BookText },
    { href: '/accounting/journal-entries', label: 'Entri Jurnal', icon: BookText },
    { href: '/accounting/general-ledger', label: 'Buku Besar', icon: BookText },
];

const reportsAndSettingsSubItems = [
    { href: '/reports', label: 'Laporan', icon: FileBarChart },
    { href: '/users', label: 'Pengguna', icon: Users },
    { href: '/settings', label: 'Pengaturan', icon: Settings },
];

const SubMenu = ({ title, icon: Icon, items }: { title: string; icon: React.ElementType; items: {href: string, label: string, icon: React.ElementType}[] }) => {
    const pathname = usePathname();
    const { state } = useSidebar();
    
    // Check if any child item's href is a prefix of the current pathname
    const isAnyChildActive = items.some(item => pathname.startsWith(item.href) && (pathname === item.href || pathname[item.href.length] === '/'));

    const [isOpen, setIsOpen] = React.useState(isAnyChildActive);
    
    // Update open state when path changes
    React.useEffect(() => {
        setIsOpen(isAnyChildActive);
    }, [pathname, isAnyChildActive]);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2 h-8 text-sm group/menu-item relative peer/menu-button">
                     <Icon />
                     <span className={cn(state === 'collapsed' && 'hidden')}>{title}</span>
                     <ChevronDown className={cn("ml-auto h-4 w-4 shrink-0 transition-transform duration-200", state === 'collapsed' && 'hidden', isOpen && "rotate-180")} />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 ml-2 border-l border-muted-foreground/30 data-[state=closed]:hidden data-[state=open]:animate-accordion-down">
                <div className="flex flex-col gap-1 py-1">
                {items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href) && (pathname === item.href || pathname[item.href.length] === '/')}
                        tooltip={item.label}
                        size="sm"
                        className="w-full justify-start h-8"
                    >
                        <CustomLink href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        </CustomLink>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

export function Nav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="App Logo" width={32} height={32} className="size-8" />
           {state === 'expanded' && (
              <h2 className="text-sm font-semibold tracking-tight font-headline">
                Creative Software Solution
              </h2>
           )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainMenuItems.map((item) => (
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
          <SidebarSeparator className="my-1" />
           <SubMenu title="Penjualan" icon={ShoppingCart} items={salesSubItems} />
           <SubMenu title="Inventaris" icon={Boxes} items={inventorySubItems} />
           <SubMenu title="Pembelian" icon={Truck} items={purchasingSubItems} />
           <SubMenu title="Akuntansi" icon={BookText} items={accountingSubItems} />
           <SubMenu title="Laporan & Pengaturan" icon={FileBarChart} items={reportsAndSettingsSubItems} />
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
