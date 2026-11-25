'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

import { endSoftLocaleNav, isSoftLocaleNav } from '@/src/utils/soft-locale-nav';

/** Clears the locale-switch freeze overlay once the new locale route has painted. */
export default function LocaleNavBridge() {
    const pathname = usePathname();
    const locale = useLocale();

    useEffect(() => {
        if (!isSoftLocaleNav()) return undefined;

        let inner = 0;
        const outer = window.requestAnimationFrame(() => {
            inner = window.requestAnimationFrame(() => {
                endSoftLocaleNav();
            });
        });

        return () => {
            window.cancelAnimationFrame(outer);
            window.cancelAnimationFrame(inner);
        };
    }, [pathname, locale]);

    return null;
}
