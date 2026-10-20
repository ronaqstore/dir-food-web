'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { IconChevronDown, IconCheck, IconLanguage } from '@/components/icons';

const LOCALES: { code: 'en' | 'ur' | 'ps'; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ur', label: 'Urdu', nativeName: 'اردو' },
  { code: 'ps', label: 'Pashto', nativeName: 'پښتو' }
];

export function LocaleSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleLocaleChange = (locale: 'en' | 'ur' | 'ps') => {
    setIsOpen(false);
    if (locale === currentLocale) return;
    router.replace(pathname, { locale });
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  return (
    <div className='relative inline-block text-start' ref={containerRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-foreground/80 hover:bg-muted transition-colors cursor-pointer'
        aria-label='Switch language'
        aria-expanded={isOpen}
      >
        <IconLanguage className='h-4 w-4 text-muted-foreground' />
        <span className='font-medium'>{current?.nativeName}</span>
        <IconChevronDown className='h-3.5 w-3.5 text-muted-foreground transition-transform' />
      </button>

      {isOpen && (
        <div className='absolute end-0 mt-1.5 w-32 rounded-xl border border-border bg-popover p-1 shadow-lg ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-100'>
          {LOCALES.map((locale) => (
            <button
              key={locale.code}
              type='button'
              onClick={() => handleLocaleChange(locale.code)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors hover:bg-muted ${
                currentLocale === locale.code ? 'font-semibold text-primary' : 'text-foreground/90'
              }`}
            >
              <span>{locale.nativeName}</span>
              {currentLocale === locale.code ? (
                <IconCheck className='h-3.5 w-3.5 text-primary' />
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
