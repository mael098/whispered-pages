import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/Theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { LibraryProvider } from "@/contexts/LibraryContext"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Whispered Pages',
  description: 'Tu biblioteca personal de libros',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <LibraryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <SonnerToaster />
          </ThemeProvider>
        </LibraryProvider>
      </body>
    </html>
  );
}
