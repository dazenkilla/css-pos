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
  Home
} from 'lucide-react';
import { CustomLink } from '@/components/ui/custom-link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import React from 'react';


const menuItems = [
  { href: '/', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/sales', label: 'Penjualan', icon: ShoppingCart },
];

const productManagementSubItems = [
    { href: '/inventory', label: 'Inventaris', icon: Boxes },
    { href: '/inventory/categories', label: 'Kategori Produk', icon: Tags },
    { href: '/orders', label: 'Pesanan Pembelian', icon: Truck },
    { href: '/suppliers', label: 'Supplier', icon: Users },
];

const analyticsSubItems = [
    { href: '/history', label: 'Riwayat Penjualan', icon: History },
    { href: '/reports', label: 'Laporan', icon: FileBarChart },
    { href: '/accounting', label: 'Akuntansi', icon: BookText },
];

const SubMenu = ({ title, icon: Icon, items }: { title: string; icon: React.ElementType; items: typeof productManagementSubItems }) => {
    const pathname = usePathname();
    const { state } = useSidebar();
    const isAnyChildActive = items.some(item => pathname.startsWith(item.href) && item.href !== '/');
    const isRootActive = items.some(item => item.href === pathname);
    
    // For nested routes, we want to keep the collapsible open.
    const [isOpen, setIsOpen] = React.useState(isAnyChildActive || isRootActive);
    
    // Update open state when path changes
    React.useEffect(() => {
        setIsOpen(isAnyChildActive || isRootActive);
    }, [pathname, isAnyChildActive, isRootActive]);

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
                        isActive={pathname.startsWith(item.href)}
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
          <SidebarSeparator className="my-1" />
           <SubMenu title="Manajemen Produk" icon={Boxes} items={productManagementSubItems} />
           <SubMenu title="Laporan" icon={FileBarChart} items={analyticsSubItems} />
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
