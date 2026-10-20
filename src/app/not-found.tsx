'use client';

import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center font-sans'>
        <h1 className='text-3xl font-bold text-gray-900'>404 - Page Not Found</h1>
        <p className='mt-2 text-sm text-gray-600'>The requested page could not be found.</p>
        <Link
          href='/en'
          className='mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-green-700'
        >
          Go to Home
        </Link>
      </body>
    </html>
  );
}
