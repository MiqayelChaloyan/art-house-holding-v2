import { DocumentTextIcon } from '@sanity/icons';

import { RuleType } from '@/sanity/ruleType';

const localizedString = (title: string, name: string, type: 'string' | 'text' = 'string') => ({
    title,
    name,
    type: type === 'text' ? 'localeText' : 'localeString',
});

const legalPageSchemaDesign = {
    name: 'legal-page-design',
    type: 'document',
    title: 'Legal page',
    description: 'Design Studio privacy, terms, or imprint page.',
    icon: DocumentTextIcon,
    fields: [
        {
            name: 'page',
            title: 'Page',
            type: 'string',
            options: {
                list: [
                    { title: 'Privacy', value: 'privacy' },
                    { title: 'Terms', value: 'terms' },
                    { title: 'Imprint', value: 'imprint' },
                ],
                layout: 'radio',
            },
            validation: (Rule: RuleType) => Rule.required(),
        },
        localizedString('Eyebrow', 'eyebrow'),
        localizedString('Headline line 1', 'line_1'),
        localizedString('Headline line 2', 'line_2'),
        localizedString('Lead', 'lead', 'text'),
        {
            name: 'updated_at',
            title: 'Last updated',
            type: 'date',
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
        select: {
            page: 'page',
            title: 'line_1.en',
        },
        prepare({ page, title }: { page?: string; title?: string }) {
            const labels: Record<string, string> = {
                privacy: 'Privacy',
                terms: 'Terms',
                imprint: 'Imprint',
            };

            return {
                title: labels[page || ''] || 'Legal page',
                subtitle: title ? `Design Studio · ${title}` : 'Design Studio',
            };
        },
    },
};

export default legalPageSchemaDesign;
