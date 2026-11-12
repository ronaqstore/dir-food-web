import * as React from 'react';
import { IconBrandWhatsapp } from '@/components/icons';
import { PUBLIC_ADMIN_CONTACTS } from '@/lib/phone';

export function AppFooter() {
  return (
    <footer className='border-t border-border/60 bg-muted/30 py-8 text-xs text-muted-foreground'>
      <div className='mx-auto max-w-5xl px-4 sm:px-6 space-y-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='text-center sm:text-start'>
            <p className='font-bold text-foreground text-sm'>Dir Food</p>
            <p className='text-xs text-muted-foreground mt-0.5'>
              Local Food Discovery & WhatsApp Ordering in Timergara & Lower Dir
            </p>
          </div>

          <div className='flex flex-col items-center sm:items-end gap-1.5'>
            <span className='font-semibold text-foreground text-xs'>
              Support & Inquiries:
            </span>
            <div className='flex flex-wrap items-center justify-center sm:justify-end gap-2.5'>
              {PUBLIC_ADMIN_CONTACTS.map((c) => (
                <a
                  key={c.phone}
                  href={c.whatsappUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors'
                >
                  <IconBrandWhatsapp className='size-3.5 text-emerald-500' />
                  <span>{c.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-border/40 pt-4 text-center text-[11px] text-muted-foreground/80'>
          <p>© 2026 Dir Food. Timergara, Lower Dir, Khyber Pakhtunkhwa.</p>
        </div>
      </div>
    </footer>
  );
}

