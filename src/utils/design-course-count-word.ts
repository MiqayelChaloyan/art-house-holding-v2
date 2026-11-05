const capitalize = (value: string) => (
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value
);

const buildEnglishWords = (max: number): string[] => {
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];

    return Array.from({ length: max + 1 }, (_, index) => {
        if (index < 10) return capitalize(ones[index]);
        if (index < 20) return capitalize(teens[index - 10]);
        if (index % 10 === 0) return capitalize(tens[index / 10]);
        const ten = tens[Math.floor(index / 10)];
        const one = ones[index % 10];
        return `${capitalize(ten)}-${capitalize(one)}`;
    });
};

const buildRussianWords = (max: number): string[] => {
    const ones = ['ноль', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят'];

    return Array.from({ length: max + 1 }, (_, index) => {
        if (index < 10) return capitalize(ones[index]);
        if (index < 20) return capitalize(teens[index - 10]);
        if (index % 10 === 0) return capitalize(tens[index / 10]);
        const ten = tens[Math.floor(index / 10)];
        const one = ones[index % 10];
        return `${capitalize(ten)} ${one}`;
    });
};

const ARMENIAN_WORDS = [
    'Զրո', 'Մեկ', 'Երկու', 'Երեք', 'Չորս', 'Հինգ', 'Վեց', 'Յոթ', 'Ութ', 'Ինը', 'Տաս',
    'Տասը մեկ', 'Տասը երկու', 'Տասը երեք', 'Տասը չորս', 'Տասը հինգ', 'Տասը վեց', 'Տասը յոթ', 'Տասը ութ', 'Տասը ինը',
    'Քսան', 'Քսան մեկ', 'Քսան երկու', 'Քսան երեք', 'Քսան չորս', 'Քսան հինգ', 'Քսան վեց', 'Քսան յոթ', 'Քսան ութ', 'Քսան ինը',
    'Երեսուն', 'Երեսուն մեկ', 'Երեսուն երկու', 'Երեսուն երեք', 'Երեսուն չորս', 'Երեսուն հինգ', 'Երեսուն վեց', 'Երեսուն յոթ', 'Երեսուն ութ', 'Երեսուն ինը',
    'Քառասուն', 'Քառասուն մեկ', 'Քառասուն երկու', 'Քառասուն երեք', 'Քառասուն չորս', 'Քառասուն հինգ', 'Քառասուն վեց', 'Քառասուն յոթ', 'Քառասուն ութ', 'Քառասուն ինը',
    'Հիսուն',
];

const EN_WORDS = buildEnglishWords(50);
const RU_WORDS = buildRussianWords(50);

export const DESIGN_COURSE_COUNT_MAX = 50;

export function designCourseCountWord(count: number, locale: string): string {
    const index = Math.min(DESIGN_COURSE_COUNT_MAX, Math.max(0, Math.floor(count)));

    if (locale === 'am') {
        return ARMENIAN_WORDS[index] ?? String(index);
    }

    if (locale === 'ru') {
        return RU_WORDS[index] ?? String(index);
    }

    return EN_WORDS[index] ?? String(index);
}
