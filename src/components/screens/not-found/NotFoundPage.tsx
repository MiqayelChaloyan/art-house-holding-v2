'use client';

import { useLocale, useTranslations } from 'next-intl';

import { designFont } from '@/src/constants/font';

import NotFoundView, { type NotFoundCopy } from './NotFoundView';

import cn from 'classnames';


const NotFoundPage = () => {
    const locale = useLocale();
    const t = useTranslations('not-found-page');

    const copy: NotFoundCopy = {
        eyebrow: t('eyebrow'),
        line1: t('line-1'),
        line2: t('line-2'),
        description: t('description'),
        home: t('home'),
        explore: t('explore'),
        design: t('design'),
        language: t('language'),
        educational: t('educational'),
    };

    return (
        <div className={cn(designFont.vars, designFont.ui)}>
            <NotFoundView locale={locale} copy={copy} />
        </div>
    );
};

export default NotFoundPage;
