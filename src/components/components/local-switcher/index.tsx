'use client'

import React, { useCallback, useEffect } from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';

import NextImage from '@/src/components/components/image';

import { ImagePaths } from '@/src/constants';
import { ArianAMU } from '@/src/constants/font';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const localeStrings: {
  [key: string]: string;
} = {
  am: 'Հայ',
  ru: 'Рус',
  en: 'Eng',
};

const localeCodes = [
  { key: 'am', label: 'ARM' },
  { key: 'en', label: 'ENG' },
  { key: 'ru', label: 'RUS' },
];

const localeImages: {
  [key: string]: string;
} = {
  am: ImagePaths.DESIGN.amURL,
  ru: ImagePaths.DESIGN.ruURL,
  en: ImagePaths.DESIGN.enURL
};

const keySwithcer = '/design';

type LocalSwitcherProps = {
  activeColor?: string;
  color?: string;
  variant?: 'default' | 'codes';
};

export default function LocalSwitcher({
  activeColor = colors.darkRed,
  color = colors.black,
  variant = 'default',
}: LocalSwitcherProps) {
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();

  const hrefFor = useCallback((locale: string) => {
    const pathParts = pathname.replace(/^\/(am|en|ru)(?=\/|$)/, '') || '';
    const search = typeof window === 'undefined' ? '' : window.location.search;
    return `/${locale}${pathParts}${search}`;
  }, [pathname]);

  const prefetchLocale = useCallback((locale: string) => {
    if (locale === localActive) return;
    router.prefetch(hrefFor(locale), { kind: PrefetchKind.FULL });
  }, [hrefFor, localActive, router]);

  useEffect(() => {
    const run = () => localeCodes.forEach(({ key }) => prefetchLocale(key));
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(run, 600);
    return () => window.clearTimeout(id);
  }, [prefetchLocale]);

  const hiddenPrefetch = (
    <span className={styles.prefetch} aria-hidden>
      {localeCodes.map(({ key }) => (
        key === localActive ? null : (
          <Link key={key} href={hrefFor(key)} prefetch scroll={false} tabIndex={-1} />
        )
      ))}
    </span>
  );

  if (variant === 'codes') {
    return (
      <div className={styles.codes} role="group" aria-label="Language">
        {hiddenPrefetch}
        {localeCodes.map((locale, index) => (
          <React.Fragment key={locale.key}>
            {index > 0 && <span className={styles.codeSep} aria-hidden>/</span>}
            {localActive === locale.key ? (
              <span
                className={cn(styles.code, styles.codeActive)}
                style={{ color: activeColor }}
                aria-current="true"
              >
                {locale.label}
              </span>
            ) : (
              <Link
                href={hrefFor(locale.key)}
                prefetch
                scroll={false}
                className={styles.code}
                style={{ color }}
                onPointerEnter={() => prefetchLocale(locale.key)}
                onFocus={() => prefetchLocale(locale.key)}
              >
                {locale.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (pathname.includes(keySwithcer)) {
    return (
      <div className={styles.switcher}>
        {hiddenPrefetch}
        {Object.keys(localeImages).map((key) => (
          localActive === key ? (
            <span
              key={key}
              className={cn(styles.language, styles.active, ArianAMU.className)}
              aria-current="true"
            >
              <NextImage
                src={localeImages[key]}
                alt={key}
                className={styles['option-image']}
                width={500}
                height={500}
              />
            </span>
          ) : (
            <Link
              key={key}
              href={hrefFor(key)}
              prefetch
              scroll={false}
              className={cn(styles.language, ArianAMU.className)}
              onPointerEnter={() => prefetchLocale(key)}
              onFocus={() => prefetchLocale(key)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = activeColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = color
              }}
            >
              <NextImage
                src={localeImages[key]}
                alt={key}
                className={styles['option-image']}
                width={500}
                height={500}
              />
            </Link>
          )
        ))}
      </div>
    );
  };

  const keys = Object.keys(localeStrings);

  return (
    <div className={styles.switcher}>
      {hiddenPrefetch}
      {keys.map((key, index) => (
        localActive === key ? (
          <span
            key={key}
            className={cn(styles.language, styles.active, ArianAMU.className)}
            style={{
              color: activeColor,
              borderRight: index !== keys.length - 1 ? `2px solid ${color}` : 'none'
            }}
            aria-current="true"
          >
            <span className={styles.option}>{localeStrings[key]}</span>
          </span>
        ) : (
          <Link
            key={key}
            href={hrefFor(key)}
            prefetch
            scroll={false}
            className={cn(styles.language, ArianAMU.className)}
            style={{
              color,
              borderRight: index !== keys.length - 1 ? `2px solid ${color}` : 'none',
              textDecoration: 'none',
            }}
            onPointerEnter={() => prefetchLocale(key)}
            onFocus={() => prefetchLocale(key)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = activeColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = color
            }}
          >
            <span className={styles.option}>{localeStrings[key]}</span>
          </Link>
        )
      ))}
    </div>
  );
};
