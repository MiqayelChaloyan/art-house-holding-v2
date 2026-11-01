import { BillIcon } from '@sanity/icons';
import { RuleType } from '@/sanity/ruleType';

const loc = (title: string, name: string, type: 'string' | 'text' = 'string', description?: string) => ({
    title,
    name,
    type: type === 'text' ? 'localeText' : 'localeString',
    ...(description ? { description } : {}),
});

const coursePriceSchemaDesign = {
    name: 'course-price-design',
    type: 'document',
    title: 'Course price list',
    description: 'The price list for one Design course. Each course has its own page.',
    icon: BillIcon,
    fields: [
        {
            name: 'course',
            title: 'Course',
            type: 'reference',
            to: [{ type: 'courses-design' }],
            validation: (Rule: RuleType) => Rule.required(),
            options: { disableNew: true },
        },
        loc('Eyebrow', 'eyebrow', 'string', 'Small line above the title, for example Price list.'),
        loc('Headline line 1', 'line_1'),
        loc('Headline line 2 (italic)', 'line_2'),
        {
            name: 'items',
            title: 'Prices',
            type: 'array',
            description: 'Usually two cards: group and individual.',
            validation: (Rule: RuleType) => Rule.max(4),
            of: [{
                type: 'object',
                fields: [
                    loc('Title', 'title'),
                    loc('Subtitle', 'subtitle', 'string', 'Short line under the title.'),
                    loc('Amount', 'amount', 'string', 'For example 180 000 AMD.'),
                ],
                preview: {
                    select: { title: 'title.en', subtitle: 'amount.en' },
                },
            }],
        },
    ],
    preview: {
        select: {
            title: 'course.course_name.en',
            subtitle: 'eyebrow.en',
        },
        prepare(selection: { title?: string; subtitle?: string }) {
            return {
                title: selection.title || 'Course price list',
                subtitle: selection.subtitle || 'Design Studio',
            };
        },
    },
};

export default coursePriceSchemaDesign;
