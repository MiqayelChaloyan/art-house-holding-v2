export const locales = ['am', 'en', 'ru'] as const;
export const defaultLocale = 'am' satisfies (typeof locales)[number];
export type Locale = (typeof locales)[number];