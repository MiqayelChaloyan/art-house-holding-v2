import type { NotFoundCopy } from './NotFoundView';


export const NOT_FOUND_COPY: Record<'en' | 'am' | 'ru', NotFoundCopy> = {
    en: {
        eyebrow: '404',
        line1: 'This page',
        line2: 'is missing.',
        description:
            'The link may be outdated or the address was typed incorrectly. Return home or choose one of our studios.',
        home: 'Art House Home',
        explore: 'Explore our websites',
        design: 'Design Studio',
        language: 'Language Studio',
        educational: 'Educational Center',
    },
    am: {
        eyebrow: '404',
        line1: 'Էջը',
        line2: 'չի գտնվել։',
        description:
            'Հղումը կարող է հնացած լինել կամ հասցեն սխալ է մուտքագրվել։ Վերադարձեք գլխավոր էջ կամ ընտրեք մեր ստուդիաներից մեկը։',
        home: 'Art House գլխավոր',
        explore: 'Մեր կայքերը',
        design: 'Դիզայն ստուդիա',
        language: 'Լեզվի կենտրոն',
        educational: 'Կրթական կենտրոն',
    },
    ru: {
        eyebrow: '404',
        line1: 'Страница',
        line2: 'не найдена.',
        description:
            'Ссылка могла устареть или адрес введён неверно. Вернитесь на главную или выберите один из наших разделов.',
        home: 'Art House — главная',
        explore: 'Наши сайты',
        design: 'Студия дизайна',
        language: 'Языковой центр',
        educational: 'Образовательный центр',
    },
};

export const resolveNotFoundLocale = (value: string | undefined): 'en' | 'am' | 'ru' => {
    if (value === 'am' || value === 'ru') return value;
    return 'en';
};
