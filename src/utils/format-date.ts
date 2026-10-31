const SHORT_MONTHS: Record<'en' | 'am' | 'ru', string[]> = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    am: ['հնվ', 'փտվ', 'մրտ', 'ապր', 'մյս', 'հնս', 'հլս', 'օգս', 'սպտ', 'հոկ', 'նոյ', 'դեկ'],
    ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
};

const LONG_MONTHS: Record<'en' | 'am' | 'ru', string[]> = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    am: ['հունվարի', 'փետրվարի', 'մարտի', 'ապրիլի', 'մայիսի', 'հունիսի', 'հուլիսի', 'օգոստոսի', 'սեպտեմբերի', 'հոկտեմբերի', 'նոյեմբերի', 'դեկտեմբերի'],
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
};

const languageOf = (locale: string): 'en' | 'am' | 'ru' => (
    locale === 'am' || locale === 'ru' ? locale : 'en'
);

const dateParts = (date: string) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
    if (match) {
        return {
            year: Number(match[1]),
            month: Number(match[2]) - 1,
            day: Number(match[3]),
        };
    }

    const parsed = new Date(date);
    return {
        year: parsed.getUTCFullYear(),
        month: parsed.getUTCMonth(),
        day: parsed.getUTCDate(),
    };
};

const formatWith = (date: string | undefined, locale: string, months: Record<'en' | 'am' | 'ru', string[]>) => {
    if (!date) return '';

    const { year, month, day } = dateParts(date);
    const language = languageOf(locale);
    const monthName = months[language][month] ?? '';

    if (language === 'en') return `${monthName} ${day}, ${year}`;
    if (language === 'ru') return `${day} ${monthName} ${year} г.`;
    return `${day} ${monthName}, ${year} թ.`;
};

export function formatLocalizedDate(date: string | undefined, locale: string): string {
    return formatWith(date, locale, LONG_MONTHS);
}

export function formatCardDate(date: string | undefined, locale: string): string {
    return formatWith(date, locale, SHORT_MONTHS);
}
