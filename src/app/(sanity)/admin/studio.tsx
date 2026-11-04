'use client';

import { Component, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import type { StudioThemeColorSchemeKey } from 'sanity';

import '@/sanity/components/slateGuard';
import config from '@/sanity.config';
import { ArianAMU, Inter } from '@/src/constants/font';

import './studio.css';

const SCHEME_KEY = 'sanityStudio:ui:colorScheme';
const DEFAULT_SCHEME: StudioThemeColorSchemeKey = 'dark';

const LoadingScreen = () => (
  <div
    style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      color: '#9ca3af',
      background: '#101112',
    }}
  >
    Loading Sanity Studio…
  </div>
);

const Studio = dynamic(
  async () => {
    await import('@/sanity/components/slateGuard');
    if (!window.localStorage.getItem(SCHEME_KEY)) {
      window.localStorage.setItem(SCHEME_KEY, DEFAULT_SCHEME);
    }
    const { Studio } = await import('sanity');
    return Studio;
  },
  {
    ssr: false,
    loading: LoadingScreen,
  },
);

class SlateErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: false };
  }

  componentDidCatch(error: Error) {
    const message = error?.message || '';
    if (!(message.includes('Slate') && message.includes('DOM'))) {
      throw error;
    }
  }

  render() {
    return this.props.children;
  }
}

export default function StudioPage() {
  return (
    <div
      className={`${Inter.variable} ${ArianAMU.variable}`}
      style={{
        height: '100vh',
        maxHeight: '100dvh',
        width: '100%',
        overflow: 'auto',
        fontFamily: 'var(--font-inter), var(--font-arian-amu), system-ui, sans-serif',
      }}
    >
      <SlateErrorBoundary>
        <Studio config={config} unstable_globalStyles />
      </SlateErrorBoundary>
    </div>
  );
}
