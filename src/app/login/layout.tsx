import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Nova POS',
  description: 'Masuk ke akun Nova POS Anda.',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
          {children}
      </body>
    </html>
  );
}
