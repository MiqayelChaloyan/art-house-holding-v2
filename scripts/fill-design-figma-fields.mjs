import { createClient } from 'next-sanity';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const loadEnv = (file) => {
    try {
        const text = readFileSync(resolve(file), 'utf8');
        for (const raw of text.split('\n')) {
            const line = raw.trim();
            if (!line || line.startsWith('#')) continue;
            const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
            if (!match || process.env[match[1]]) continue;
            process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
        }
    } catch {
        // optional file
    }
};

loadEnv('.env.production');
loadEnv('.env.local');
loadEnv('.env');

const loc = (am, en, ru) => ({ am, en, ru });
const locText = (am, en, ru) => ({ am, en, ru });
const emptyLoc = (value) => !value || (!value.am && !value.en && !value.ru);
const key = () => Math.random().toString(36).slice(2, 10);

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-02',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN');
}

const setIfEmpty = (patch, current, path, next) => {
    if (emptyLoc(current)) patch[path] = next;
};

const priceDefaults = [
    {
        title: loc('Խմբային', 'Group', 'Группа'),
        subtitle: loc('Շաբաթական 3 պարապմունք', '3 lessons a week', '3 занятия в неделю'),
        amount: loc('180 000 AMD', '180 000 AMD', '180 000 AMD'),
    },
    {
        title: loc('Անհատական', 'Individual', 'Индивидуально'),
        subtitle: loc('Անհատական գրաֆիկ', 'Flexible schedule', 'Гибкий график'),
        amount: loc('280 000 AMD', '280 000 AMD', '280 000 AMD'),
    },
];

const whyDefaults = [
    {
        title: loc('Համակարգիչ', 'Computer', 'Компьютер'),
        description: locText(
            'Ցանկացած ժամանակակից MacBook կամ Windows համակարգիչ, որը կարող է աշխատեցնել Adobe CC։',
            'Any modern MacBook or Windows machine capable of running Adobe CC.',
            'Любой современный MacBook или Windows, на котором работает Adobe CC.',
        ),
    },
    {
        title: loc('Ծրագրեր', 'Software', 'Программы'),
        description: locText(
            'Adobe Creative Cloud՝ Photoshop, Illustrator, InDesign։',
            'Adobe Creative Cloud: Photoshop, Illustrator, InDesign.',
            'Adobe Creative Cloud: Photoshop, Illustrator, InDesign.',
        ),
    },
    {
        title: loc('Ժամանակ', 'Time', 'Время'),
        description: locText(
            'Շաբաթական առնվազն 8 ժամ պրակտիկայի համար։',
            'At least 8 hours a week for practice.',
            'Не меньше 8 часов в неделю на практику.',
        ),
    },
    {
        title: loc('Պորտֆոլիո', 'Portfolio', 'Портфолио'),
        description: locText(
            'Պատրաստ եք հավաքել աշխատանքներ իրական նախագծերից։',
            'Ready to build work from real projects.',
            'Готовы собирать работы на реальных проектах.',
        ),
    },
    {
        title: loc('Լեզու', 'Language', 'Язык'),
        description: locText(
            'Դասընթացը հասանելի է հայերեն, անգլերեն և ռուսերեն։',
            'The course is available in Armenian, English and Russian.',
            'Курс доступен на армянском, английском и русском.',
        ),
    },
    {
        title: loc('Մակարդակ', 'Level', 'Уровень'),
        description: locText(
            'Հարմար է սկսնակներից մինչև միջին մակարդակ։',
            'Open to beginners through intermediate designers.',
            'Подходит от начального до среднего уровня.',
        ),
    },
];

const groupDefaults = [
    {
        mode: 'evening',
        shift: loc('Երեկոյան', 'Evening', 'Вечер'),
        start_date: loc('12 նոյեմբեր 2026', '12 Nov 2026', '12 ноября 2026'),
        schedule: loc('Երկ · Չրք · Ուր', 'Mon · Wed · Fri', 'Пн · Ср · Пт'),
        time: loc('18:00', '18:00', '18:00'),
        duration: loc('3 ամիս', '3 months', '3 месяца'),
        price: loc('180 000 AMD', '180 000 AMD', '180 000 AMD'),
    },
    {
        mode: 'morning',
        shift: loc('Առավոտյան', 'Morning', 'Утро'),
        start_date: loc('16 նոյեմբեր 2026', '16 Nov 2026', '16 ноября 2026'),
        schedule: loc('Երկ · Չրք · Ուր', 'Mon · Wed · Fri', 'Пн · Ср · Пт'),
        time: loc('10:00', '10:00', '10:00'),
        duration: loc('3 ամիս', '3 months', '3 месяца'),
        price: loc('180 000 AMD', '180 000 AMD', '180 000 AMD'),
    },
    {
        mode: 'online',
        shift: loc('Առցանց', 'Online', 'Онлайн'),
        start_date: loc('19 նոյեմբեր 2026', '19 Nov 2026', '19 ноября 2026'),
        schedule: loc('Երք · Հնգ', 'Tue · Thu', 'Вт · Чт'),
        time: loc('19:00', '19:00', '19:00'),
        duration: loc('3 ամիս', '3 months', '3 месяца'),
        price: loc('160 000 AMD', '160 000 AMD', '160 000 AMD'),
    },
];

const faqDefaults = [
    {
        question: loc('Որքա՞ն է տևում դասընթացը։', 'How long is the course?', 'Сколько длится курс?'),
        answer: locText('Երեք ամիս, շաբաթական երեք պարապմունք։', 'Three months, three lessons a week.', 'Три месяца, три занятия в неделю.'),
    },
    {
        question: loc('Պե՞տք է նախնական փորձ։', 'Do I need previous experience?', 'Нужен ли опыт?'),
        answer: locText('Ոչ։ Սկսում ենք հիմքերից և հասնում ենք պորտֆոլիոյի։', 'No. We start from the basics and finish with a portfolio.', 'Нет. Начинаем с основ и заканчиваем портфолио.'),
    },
    {
        question: loc('Ի՞նչ ծրագրեր ենք օգտագործում։', 'What software do we use?', 'Какие программы используем?'),
        answer: locText('Adobe Photoshop, Illustrator և InDesign։', 'Adobe Photoshop, Illustrator and InDesign.', 'Adobe Photoshop, Illustrator и InDesign.'),
    },
    {
        question: loc('Կա՞ առցանց տարբերակ։', 'Is there an online option?', 'Есть ли онлайн?'),
        answer: locText('Այո, կարող եք ընտրել առցանց խումբ։', 'Yes, you can join an online group.', 'Да, можно выбрать онлайн-группу.'),
    },
    {
        question: loc('Ի՞նչ եմ ստանում վերջում։', 'What do I get at the end?', 'Что я получаю в конце?'),
        answer: locText('Պորտֆոլիո և սերտիֆիկատ։', 'A portfolio and a certificate.', 'Портфолио и сертификат.'),
    },
];

const withKeys = (items) => items.map((item) => ({ _key: key(), ...item }));

const mergeSection = (current, headings, listKey, listValue) => {
    const next = { ...(current || {}) };
    for (const [field, value] of Object.entries(headings)) {
        if (emptyLoc(next[field])) next[field] = value;
    }
    if (!next[listKey]?.length) next[listKey] = listValue;
    return next;
};

const [home] = await client.fetch(`*[_type == "about-us-design"]`);
const courses = await client.fetch(`*[_type == "courses-design"]`);
const [contact] = await client.fetch(`*[_type == "design-contact-us"]`);
const [portfolio] = await client.fetch(`*[_type == "portfolio-design"]`);

const homeCards = home?.courses || [];
const patched = [];

if (home?._id) {
    const section = home.courses_section || {};
    const next = {};
    setIfEmpty(next, section.page_eyebrow, 'courses_section.page_eyebrow', loc('Դասընթացներ · Վեց ծրագիր', 'Courses · Six Programs', 'Курсы · Шесть программ'));
    setIfEmpty(next, section.page_line_1, 'courses_section.page_line_1', loc('Ծրագրեր', 'Programs for', 'Программы для'));
    setIfEmpty(next, section.page_line_2, 'courses_section.page_line_2', loc('լուրջ դիզայներների համար.', 'serious designers.', 'серьёзных дизайнеров.'));
    if (Object.keys(next).length) {
        await client.patch(home._id).set(next).commit();
        patched.push('home courses listing headings');
    }
}

if (contact?._id && emptyLoc(contact.hours)) {
    await client.patch(contact._id).set({
        hours: loc('10:00 – 21:00 Երկուշաբթի–Շաբաթ', '10:00 – 21:00 Monday–Saturday', '10:00 – 21:00 Понедельник–Суббота'),
    }).commit();
    patched.push('contact hours');
}

if (portfolio?._id) {
    const next = {};
    setIfEmpty(next, portfolio.all_label, 'all_label', loc('Բոլորը', 'All', 'Все'));
    setIfEmpty(next, portfolio.view_more, 'view_more', loc('Տեսնել ավելին', 'View more', 'Смотреть ещё'));
    if (Object.keys(next).length) {
        await client.patch(portfolio._id).set(next).commit();
        patched.push('portfolio labels');
    }
}

for (const course of courses) {
    const match = homeCards.find((card) => card.name === course.name || card.categories?._ref === course._id);
    const next = {};

    if (emptyLoc(course.duration)) {
        next.duration = match?.duration || loc('6 ամիս', '6 months', '6 месяцев');
    }
    if (emptyLoc(course.level)) {
        next.level = match?.level || loc('Բոլոր մակարդակներ', 'All levels', 'Все уровни');
    }
    if (emptyLoc(course.card_description)) {
        next.card_description = match?.card_description || course.intro || locText(
            course.course_name?.am || course.name,
            course.course_name?.en || course.name,
            course.course_name?.ru || course.name,
        );
    }
    if (!course.card_image && match?.card_image) {
        next.card_image = match.card_image;
    }

    next.price_section = mergeSection(course.price_section, {
        eyebrow: loc('Գնացուցակ', 'Price list', 'Прайс-лист'),
        line_1: loc('Ուսման', 'Tuition', 'Стоимость'),
        line_2: loc('վարձը.', 'and format.', 'и формат.'),
    }, 'items', withKeys(priceDefaults));

    next.why_section = mergeSection(course.why_section, {
        eyebrow: loc('Ինչու այս դասընթացը', 'Why This Course', 'Почему этот курс'),
        line_1: loc('Ինչ է', 'What you', 'Что нужно'),
        line_2: loc('պետք.', 'need.', 'иметь.'),
    }, 'items', withKeys(whyDefaults));

    next.groups_section = mergeSection(course.groups_section, {
        eyebrow: loc('Առաջիկա խմբեր', 'Upcoming Groups', 'Ближайшие группы'),
        line_1: loc('Ընտրեք', 'Choose a', 'Выберите'),
        line_2: loc('խումբ.', 'group.', 'группу.'),
        enroll_label: loc('Գրանցվել', 'Enroll', 'Записаться'),
        filter_all: loc('Բոլորը', 'All', 'Все'),
        start_date_label: loc('Մեկնարկ', 'Start date', 'Старт'),
        schedule_label: loc('Գրաֆիկ', 'Schedule', 'Расписание'),
        time_label: loc('Ժամ', 'Time', 'Время'),
        duration_label: loc('Տևողություն', 'Duration', 'Длительность'),
        price_label: loc('Գին', 'Price', 'Цена'),
    }, 'groups', withKeys(groupDefaults));

    next.faq_section = mergeSection(course.faq_section, {
        eyebrow: loc('Հարցեր', 'FAQ', 'FAQ'),
        line_1: loc('Հաճախ', 'Common', 'Частые'),
        line_2: loc('տրվող հարցեր.', 'questions.', 'вопросы.'),
    }, 'items', withKeys(faqDefaults));

    await client.patch(course._id).set(next).commit();
    patched.push(course.name || course._id);
}

console.log(JSON.stringify({ patched, courses: courses.length }, null, 2));
