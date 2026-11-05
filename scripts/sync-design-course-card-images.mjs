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

const hasImageAsset = (image) => Boolean(image?.asset?._ref || image?.asset?._id);

const cardImageFromGallery = (gallery) => {
    const first = (gallery || []).find((item) => hasImageAsset(item));
    if (!first) return undefined;
    return {
        _type: 'image',
        asset: first.asset,
        ...(first.alt ? { alt: first.alt } : {}),
    };
};

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
    card_image,
    gallery_of_course,
}`);

const [home] = await client.fetch(`*[_type == "about-us-design"] { _id, courses }`);
const updated = [];

for (const course of courses) {
    if (hasImageAsset(course.card_image)) continue;
    const card_image = cardImageFromGallery(course.gallery_of_course);
    if (!card_image) {
        console.warn(`Skip ${course.name}: no gallery image`);
        continue;
    }
    await client.patch(course._id).set({ card_image }).commit();
    updated.push(`courses-design: ${course.name}`);
}

if (home?._id && Array.isArray(home.courses)) {
    let dirty = false;
    const coursesNext = home.courses.map((card) => {
        if (hasImageAsset(card.card_image)) return card;
        const card_image = cardImageFromGallery(card.gallery_of_course);
        if (!card_image) return card;
        dirty = true;
        return { ...card, card_image };
    });
    if (dirty) {
        await client.patch(home._id).set({ courses: coursesNext }).commit();
        updated.push('about-us-design: home course cards');
    }
}

console.log(updated.length ? updated.join('\n') : 'Nothing to update (card images already set).');
