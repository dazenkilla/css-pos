import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Nav } from '@/components/layout/nav';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { LoadingProvider } from '@/components/ui/loading-provider';
import { BottomNav } from '@/components/layout/bottom-nav';

export const metadata: Metadata = {
  title: 'CSS POS',
  description: 'Sistem Point of Sales (POS) berbasis PWA yang komprehensif untuk usaha kecil.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <LoadingProvider>
          <SidebarProvider>
            <div className="relative flex min-h-screen w-full">
              <Sidebar>
                <Nav />
              </Sidebar>
              <SidebarInset>
                <Header />
                <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
              </SidebarInset>
            </div>
            <BottomNav />
          </SidebarProvider>
        </LoadingProvider>
        <Toaster />
      </body>
    </html>
  );
}
