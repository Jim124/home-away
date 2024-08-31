import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Providers from './providers';

import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home Away',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning={true} lang='en'>
        <body className={inter.className} suppressHydrationWarning>
          <Providers>
            <Navbar />
            <main className='container py-10'>{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
