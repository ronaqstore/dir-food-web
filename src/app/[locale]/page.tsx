import type { Metadata } from 'next';
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
import type { HomePageProps } from '@/types/pages';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('brand');
  return {
    title: t('name'),
    description: t('tagline')
  };
}

export default async function HomePage({ params, searchParams }: HomePageProps) {
  const { locale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  void resolvedSearchParams;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className='mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10'>
      <section className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/20 border border-primary/20 p-6 sm:p-10 text-center sm:text-start'>
        <div className='max-w-2xl'>
          <div className='inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-3'>
            <IconMapPin className='h-3.5 w-3.5' />
            <span>{t('brand.regionBadge')}</span>
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

      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-bold tracking-tight text-foreground'>
              {t('directory.featuredTitle')}
            </h2>
            <p className='text-xs text-muted-foreground'>{t('directory.featuredSubtitle')}</p>
          </div>
          <Link
            href='/restaurants'
            className='inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline'
          >
            <span>{t('directory.viewAll')}</span>
            <IconChevronRight className='h-3.5 w-3.5 rtl:rotate-180' />
          </Link>
        </div>

        <DirectoryView />
      </section>

      <section className='rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex items-center gap-4 text-center sm:text-start flex-col sm:flex-row'>
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600'>
            <IconBrandWhatsapp className='h-6 w-6' />
          </div>
          <div>
            <h3 className='font-bold text-foreground'>{t('brand.orderDirect')}</h3>
            <p className='text-xs text-muted-foreground'>{t('brand.orderDirectSubtitle')}</p>
          </div>
        </div>
        <Link
          href='/restaurants'
          className='inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors'
        >
          {t('directory.browseMenu')}
        </Link>
      </section>
    </div>
  );
}
