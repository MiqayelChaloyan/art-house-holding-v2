'use client'

import React, { useCallback, useEffect, useTransition } from 'react';

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
  const [isPending, startTransition] = useTransition();
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
    if (variant !== 'codes') return undefined;

    const run = () => localeCodes.forEach(({ key }) => prefetchLocale(key));
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(run, 600);
    return () => window.clearTimeout(id);
  }, [prefetchLocale, variant]);

  const onSelectChange = (locale: string) => {
    startTransition(() => {
      router.replace(hrefFor(locale), { scroll: false });
    });
  };

  if (variant === 'codes') {
    return (
      <div className={styles.codes} role="group" aria-label="Language">
        {localeCodes.map((locale, index) => (
          <React.Fragment key={locale.key}>
            {index > 0 && <span className={styles.codeSep} aria-hidden>/</span>}
            <button
              type="button"
              className={cn(styles.code, { [styles.codeActive]: localActive === locale.key })}
              style={{ color: localActive === locale.key ? activeColor : color }}
              onClick={() => onSelectChange(locale.key)}
              onPointerEnter={() => prefetchLocale(locale.key)}
              onFocus={() => prefetchLocale(locale.key)}
              disabled={isPending}
              aria-current={localActive === locale.key ? 'true' : undefined}
            >
              {locale.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (pathname.includes(keySwithcer)) {
    return pathname.includes(keySwithcer) && (
      <div className={styles.switcher}>
        {Object.keys(localeImages).map((key, index) => (
          <div
            key={key}
            className={cn(
              styles.language,
              { [styles.active]: localActive === key },
              ArianAMU.className
            )}
            onClick={() => onSelectChange(key)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = activeColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = localActive === key ? activeColor : color
            }}
          >
            <NextImage
              src={localeImages[key]}
              alt={key}
              className={styles['option-image']}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.switcher}>
      {Object.keys(localeStrings).map((key, index) => (
        <div
          key={key}
          className={cn(
            styles.language,
            { [styles.active]: localActive === key },
            ArianAMU.className
          )}
          style={{
            color: localActive === key ? activeColor : color,
            borderRight: index !== Object.keys(localeStrings).length - 1 ? `2px solid ${color}` : 'none'
          }}
          onClick={() => onSelectChange(key)}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = activeColor
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = localActive === key ? activeColor : color
          }}
        >
          <span className={styles.option}>
            {localeStrings[key]}
          </span>
        </div>
      ))}
    </div>
  );
};
