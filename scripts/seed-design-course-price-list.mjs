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
const key = () => Math.random().toString(36).slice(2, 10);
const emptyLoc = (value) => !value || (!value.am && !value.en && !value.ru);

/** Figma order: individual, then group. */
const priceTemplates = () => [
    {
        title: loc('Անհատական դասընթացներ', 'Individual courses', 'Индивидуальные курсы'),
        subtitle: loc('Առցանց / Դասարան', 'Online/Offline', 'Онлайн/Офлайн'),
        duration: loc('4 ամիս', '4 month', '4 месяца'),
        amount: loc('100.000 AMD', '100.000AMD', '100.000 AMD'),
    },
    {
        title: loc('Խմբային դասընթացներ', 'Group courses', 'Групповые курсы'),
        subtitle: loc('Առցանց / Դասարան', 'Online/Offline', 'Онлайн/Офлайн'),
        duration: loc('4 ամիս', '4 month', '4 месяца'),
        amount: loc('50.000 AMD', '50.000AMD', '50.000 AMD'),
    },
];

const hasPriceItems = (section) => {
    const items = section?.items;
    if (!Array.isArray(items) || items.length === 0) return false;
    return items.some((row) => !emptyLoc(row?.title) || !emptyLoc(row?.amount));
};

const rowNeedsFill = (row) => (
    emptyLoc(row?.duration)
    || emptyLoc(row?.subtitle)
    || emptyLoc(row?.title)
    || emptyLoc(row?.amount)
);

const needsPriceSeed = (section) => !hasPriceItems(section);

const needsPriceFill = (section) => {
    if (!hasPriceItems(section)) return false;
    return section.items.some((row) => rowNeedsFill(row));
};

const mergePriceSection = (section) => {
    const templates = priceTemplates();
    const existing = section?.items;

    if (!hasPriceItems(section)) {
        return {
            items: templates.map((template) => ({ _key: key(), ...template })),
        };
    }

    const items = existing.map((row, index) => {
        const template = templates[index] ?? templates[templates.length - 1];
        return {
            _key: row._key || key(),
            title: emptyLoc(row.title) ? template.title : row.title,
            subtitle: emptyLoc(row.subtitle) ? template.subtitle : row.subtitle,
            duration: emptyLoc(row.duration) ? template.duration : row.duration,
            amount: emptyLoc(row.amount) ? template.amount : row.amount,
        };
    });

    while (items.length < templates.length) {
        const template = templates[items.length];
        items.push({ _key: key(), ...template });
    }

    return { items };
};

const replaceAll = process.argv.includes('--replace');

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

const courses = await client.fetch(`*[_type == "courses-design"] {
    _id,
    name,
    price_section,
}`);

const updated = [];

for (const course of courses) {
    const section = course.price_section;
    const shouldPatch = replaceAll
        || needsPriceSeed(section)
        || needsPriceFill(section);

    if (!shouldPatch) continue;

    const nextSection = replaceAll
        ? { items: priceTemplates().map((template) => ({ _key: key(), ...template })) }
        : mergePriceSection(section);

    await client.patch(course._id).set({ price_section: nextSection }).commit();
    updated.push(course.name || course._id);
}

console.log(updated.length
    ? `Updated price list for ${updated.length} course(s):\n${updated.join('\n')}`
    : 'All courses already have complete price list rows.');
