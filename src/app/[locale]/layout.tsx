import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { isLocale, isRtlLocale, locales, type AppLocale } from '@/i18n/request';
import { Providers } from '@/components/providers';
import { AppHeader } from '@/components/layout/app-header';
import { MobileNav } from '@/components/layout/mobile-nav';
import { AreaModal } from '@/features/directory/components/area-modal';
import { RestaurantConflictModal } from '@/features/cart/components/restaurant-conflict-modal';
import { StickyCartBar } from '@/features/cart/components/sticky-cart-bar';
import '@/styles/globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Dir Food — Local Food Discovery & WhatsApp Ordering in Timergara & Lower Dir',
  description:
    'Find local restaurants, read menus, build your cart, and order directly on WhatsApp in Timergara, Balambat, and Lower Dir, KPK.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = isRtlLocale(locale as AppLocale);

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className='min-h-screen bg-background font-sans antialiased text-foreground flex flex-col justify-between'
        suppressHydrationWarning
      >
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AppHeader />
            <main className='flex-1 pb-36 sm:pb-24'>{children}</main>
            <MobileNav />
            <AreaModal />
            <RestaurantConflictModal />
            <StickyCartBar />
            <footer className='border-t border-border/60 py-6 text-center text-xs text-muted-foreground hidden sm:block'>
              <div className='mx-auto max-w-5xl px-4'>
                <p>© 2026 Dir Food. Timergara, Lower Dir, Khyber Pakhtunkhwa.</p>
              </div>
            </footer>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
