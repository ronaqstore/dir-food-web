import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { DirectoryView } from '@/features/directory/components/directory-view';
import { IconBuildingStore } from '@/components/icons';
import type { LocalePageProps } from '@/types/pages';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('nav.restaurants'),
    description: t('brand.tagline')
  };
}

export default async function RestaurantsPage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className='mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
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

      <DirectoryView />
    </div>
  );
}
