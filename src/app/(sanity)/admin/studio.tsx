'use client';

import dynamic from 'next/dynamic';

import config from '@/sanity.config';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif',
          color: '#888',
        }}
      >
        Loading Sanity Studio…
      </div>
    ),
  },
);

export default function Studio() {
  return <NextStudio config={config} />;
}
