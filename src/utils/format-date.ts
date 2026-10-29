const localeDateMap: Record<string, string> = {
    am: 'hy-AM',
    en: 'en-US',
    ru: 'ru-RU',
};

export function formatLocalizedDate(date: string | undefined, locale: string): string {
    if (!date) {
        return '';
    }

    return new Date(date).toLocaleDateString(localeDateMap[locale] ?? 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
