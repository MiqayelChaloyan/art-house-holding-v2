import { SparklesIcon } from '@sanity/icons';

const localizedString = (title: string, name: string, type: 'string' | 'text' = 'string') => ({
    title,
    name,
    type: type === 'text' ? 'localeText' : 'localeString',
});

export const portfolioSchemaDesign = {
    name: 'portfolio-design',
    type: 'document',
    title: 'Portfolios',
    description: 'The heading on the Design Studio portfolios page. The projects themselves are on each course.',
    id: 'portfolio-design',
    icon: SparklesIcon,
    fields: [
        localizedString('Eyebrow', 'eyebrow'),
        localizedString('Headline line 1', 'line_1'),
        localizedString('Headline line 2 (italic)', 'line_2'),
        localizedString('Empty message', 'empty', 'string'),
        localizedString('All filter', 'all_label', 'string', 'The first filter chip, for example All.'),
        localizedString('View more', 'view_more', 'string', 'The button under the grid when there are more projects.'),
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            description: 'Optional picture kept from the previous Portfolios document.',
            options: { hotspot: true },
            fields: [
                { name: 'alt', title: 'Alternative text', type: 'string' },
            ],
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Portfolios',
                subtitle: 'Design Studio · Պորտֆոլիո',
            };
        },
    },
};

export default portfolioSchemaDesign;
