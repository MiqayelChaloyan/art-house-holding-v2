import { headers } from 'next/headers';

import NotFoundView from '@/src/components/screens/not-found/NotFoundView';
import { NOT_FOUND_COPY, resolveNotFoundLocale } from '@/src/components/screens/not-found/copy';

import { designFont, Inter } from '@/src/constants/font';

import cn from 'classnames';

import '@/src/styles/globals.sass';


export default function NotFound() {
    const headerList = headers();
    const pathname = headerList.get('x-pathname') || '';
    const localeMatch = pathname.match(/^\/(en|am|ru)(\/|$)/);
    const locale = resolveNotFoundLocale(localeMatch?.[1]);

    return (
        <html lang={locale}>
            <head>
                <title>404 — Art House</title>
            </head>
            <body className={cn(Inter.className, designFont.vars, designFont.ui)}>
                <NotFoundView locale={locale} copy={NOT_FOUND_COPY[locale]} />
            </body>
        </html>
    );
}
