import { UserIcon } from '@sanity/icons';

const localizedString = (title: string, name: string, type: 'string' | 'text' = 'string') => ({
    title,
    name,
    type: type === 'text' ? 'localeText' : 'localeString',
});

const aboutPageSchemaDesign = {
    name: 'about-page-design',
    type: 'document',
    title: 'About',
    description: 'Design Studio about page — headline, portrait, and story sections.',
    icon: UserIcon,
    fields: [
        localizedString('Eyebrow', 'eyebrow'),
        localizedString('Headline line 1', 'line_1'),
        localizedString('Headline line 2 (italic)', 'line_2'),
        localizedString('Intro', 'intro', 'text'),
        {
            name: 'image',
            title: 'Portrait image',
            type: 'image',
            options: { hotspot: true },
            fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
        },
        {
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    name: 'section',
                    type: 'object',
                    fields: [
                        localizedString('Heading', 'heading'),
                        localizedString('Body', 'body', 'text'),
                    ],
                    preview: {
                        select: { title: 'heading.en' },
                    },
                },
            ],
        },
    ],
    preview: {
        prepare() {
            return { title: 'About', subtitle: 'Design Studio · Մեր մասին' };
        },
    },
};

export default aboutPageSchemaDesign;
