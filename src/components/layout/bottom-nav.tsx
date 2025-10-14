"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, Boxes, FileBarChart, History } from 'lucide-react';
import { CustomLink } from '@/components/ui/custom-link';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

const mainRoutes = [
  { href: '/', label: 'Dasbor', icon: Home },
  { href: '/sales', label: 'Penjualan', icon: ShoppingCart },
  { href: '/inventory', label: 'Inventaris', icon: Boxes },
  { href: '/history', label: 'Riwayat', icon: History },
  { href: '/reports', label: 'Laporan', icon: FileBarChart },
];

export function BottomNav() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!isMobile) return;

    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 50) { // if scroll down hide the navbar
          setIsVisible(false);
        } else { // if scroll up show the navbar
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [isMobile, lastScrollY]);

  if (!isMobile) {
    return null;
  }
  
  const isLoginPage = pathname === '/login';
  if (isLoginPage) {
      return null;
  }

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 h-16 border-t bg-background/95 backdrop-blur-sm md:hidden transition-transform duration-300",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="grid h-full grid-cols-5 mx-auto">
        {mainRoutes.map(({ href, label, icon: Icon }) => {
          const isActive = (href === '/' && pathname === href) || (href !== '/' && pathname.startsWith(href));
          return (
            <CustomLink
              key={label}
              href={href}
              className={cn(
                "group inline-flex flex-col items-center justify-center px-2 text-center",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{label}</span>
            </CustomLink>
          );
        })}
      </div>
    </div>
  );
}
