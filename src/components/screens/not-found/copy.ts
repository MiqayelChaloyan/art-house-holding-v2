import am from '@/locales/am.json';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

import type { NotFoundCopy } from './NotFoundView';


const fromLocale = (messages: typeof en): NotFoundCopy => ({
    eyebrow: messages['not-found-page'].eyebrow,
    line1: messages['not-found-page']['line-1'],
    line2: messages['not-found-page']['line-2'],
    description: messages['not-found-page'].description,
    home: messages['not-found-page'].home,
    explore: messages['not-found-page'].explore,
    design: messages['not-found-page'].design,
    language: messages['not-found-page'].language,
    educational: messages['not-found-page'].educational,
});

export const NOT_FOUND_COPY: Record<'en' | 'am' | 'ru', NotFoundCopy> = {
    en: fromLocale(en),
    am: fromLocale(am),
    ru: fromLocale(ru),
};

export const resolveNotFoundLocale = (value: string | undefined): 'en' | 'am' | 'ru' => {
    if (value === 'am' || value === 'ru') return value;
    return 'en';
};
