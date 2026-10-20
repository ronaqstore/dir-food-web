import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { DirectoryView } from '@/features/directory/components/directory-view';
import {
  IconBuildingStore,
  IconMapPin,
  IconBrandWhatsapp,
  IconChevronRight
} from '@/components/icons';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className='mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 space-y-10'>
      {/* Hero Banner */}
      <section className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/20 border border-primary/20 p-6 sm:p-10 text-center sm:text-start'>
        <div className='max-w-2xl'>
          <div className='inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-3'>
            <IconMapPin className='h-3.5 w-3.5' />
            <span>Timergara & Lower Dir</span>
          </div>
          <h1 className='text-3xl sm:text-4xl font-black tracking-tight text-foreground'>
            {t('brand.name')}
          </h1>
          <p className='mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed'>
            {t('brand.tagline')}
          </p>

          <div className='mt-5 flex flex-wrap items-center gap-3 justify-center sm:justify-start'>
            <Link
              href='/restaurants'
              className='inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs hover:opacity-95 transition-opacity'
            >
              <IconBuildingStore className='h-4 w-4' />
              <span>{t('directory.viewAll')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Directory Section: Restaurants Grid */}
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-bold tracking-tight text-foreground'>
              {t('directory.featuredTitle')}
            </h2>
            <p className='text-xs text-muted-foreground'>{t('brand.tagline')}</p>
          </div>

          <Link
            href='/restaurants'
            className='inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline'
          >
            <span>{t('directory.viewAll')}</span>
            <IconChevronRight className='h-3.5 w-3.5' />
          </Link>
        </div>

        <DirectoryView limit={6} />
      </section>

      {/* Value props banner */}
      <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/60'>
        <div className='rounded-2xl border border-border/80 bg-card p-5 text-card-foreground'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3'>
            <IconBuildingStore className='h-5 w-5' />
          </div>
          <h3 className='font-semibold text-sm'>Local Hotels & Restaurants</h3>
          <p className='text-xs text-muted-foreground mt-1'>
            Browse verified food spots in Timergara and surrounding areas.
          </p>
        </div>

        <div className='rounded-2xl border border-border/80 bg-card p-5 text-card-foreground'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3'>
            <IconBrandWhatsapp className='h-5 w-5' />
          </div>
          <h3 className='font-semibold text-sm'>Direct WhatsApp Ordering</h3>
          <p className='text-xs text-muted-foreground mt-1'>
            No login, no complex checkout. Build your cart and send it straight to the restaurant.
          </p>
        </div>

        <div className='rounded-2xl border border-border/80 bg-card p-5 text-card-foreground'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3'>
            <IconMapPin className='h-5 w-5' />
          </div>
          <h3 className='font-semibold text-sm'>Timergara Delivery Areas</h3>
          <p className='text-xs text-muted-foreground mt-1'>
            Coverage across Timergara Bazar, Balambat, Gorgorai, and nearby localities.
          </p>
        </div>
      </section>
    </div>
  );
}
