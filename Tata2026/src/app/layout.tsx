import type { Metadata } from 'next';
import './globals.css';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import NavLinks from '@/components/layout/nav-links';
import { Toaster } from '@/components/ui/toaster';
import { Logo } from '@/components/icons/logo';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'AutoWise',
  description: 'Intelligent Vehicle Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <SidebarProvider>
            <Sidebar>
                <SidebarHeader className="border-b py-4 px-4">
                    <Logo />
                </SidebarHeader>
                <SidebarContent>
                  <NavLinks />
                </SidebarContent>
              </Sidebar>
            <SidebarInset>
              <main>
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
