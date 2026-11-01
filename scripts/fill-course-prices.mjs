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
        // optional
    }
};

loadEnv('.env.production');
loadEnv('.env.local');
loadEnv('.env');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-02',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

const courses = await client.fetch(`*[_type == "courses-design" && !(_id in path("drafts.**"))]{
    _id, name, price_section
}`);
const existing = await client.fetch(`*[_type == "course-price-design" && !(_id in path("drafts.**"))]{
    _id, "courseId": course._ref
}`);
const byCourse = new Map(existing.map((doc) => [doc.courseId, doc._id]));
const created = [];

for (const course of courses) {
    if (byCourse.has(course._id)) continue;
    const section = course.price_section || {};
    const id = `course-price-${course._id}`;
    await client.createIfNotExists({
        _id: id,
        _type: 'course-price-design',
        course: { _type: 'reference', _ref: course._id },
        eyebrow: section.eyebrow || { am: 'Գնացուցակ', en: 'Price list', ru: 'Прайс-лист' },
        line_1: section.line_1 || { am: 'Ուսման', en: 'Tuition', ru: 'Стоимость' },
        line_2: section.line_2 || { am: 'վարձը.', en: 'and format.', ru: 'и формат.' },
        items: section.items || [],
    });
    created.push(course.name || course._id);
}

console.log(JSON.stringify({ created, courses: courses.length }, null, 2));
