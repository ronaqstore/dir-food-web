import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { DirectoryView } from '@/features/directory/components/directory-view';
import { IconBuildingStore } from '@/components/icons';

export default async function RestaurantsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className='mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8'>
      {/* Title */}
      <div className='mb-6 flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
          <IconBuildingStore className='h-5 w-5' />
        </div>
        <div>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight text-foreground'>
            {t('nav.restaurants')}
          </h1>
          <p className='text-xs sm:text-sm text-muted-foreground'>{t('brand.tagline')}</p>
        </div>
      </div>

      {/* Directory with live filters and grid */}
      <DirectoryView />
    </div>
  );
}
