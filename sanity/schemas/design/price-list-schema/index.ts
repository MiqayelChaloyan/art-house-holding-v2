import { EarthGlobeIcon, CheckmarkIcon } from '@sanity/icons';
import { BookIcon } from '@sanity/icons';
import { RuleType } from '@/sanity/ruleType';

const priceListSchemaDesign = {
    name: 'price-list-design',
    type: 'document',
    title: 'Price list',
    description: 'Design Studio price list.',
    icon: EarthGlobeIcon,
    id: 'price-list-design',
    initialValue: () => ({
        publishedAt: new Date().toISOString()
    }),
    fields: [
        {
            title: 'Informatie',
            name: 'informatie',
            type: 'object',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    title: 'Հայերեն',
                    name: 'am',
                    type: 'array',
                    of: [{ type: 'block' }],
                },
                {
                    title: 'English',
                    name: 'en',
                    type: 'array',
                    of: [{ type: 'block' }],
                },
                {
                    title: 'Русский',
                    name: 'ru',
                    type: 'array',
                    of: [{ type: 'block' }],
                },
            ]
        },
        {
            name: 'our_advantages',
            type: 'array',
            title: 'Our advantages',
            description: 'You can add any amount (Text should not be more than 250 characters).',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: CheckmarkIcon,
                    fields: [
                        {
                            title: 'Հայերեն',
                            name: 'am',
                            type: 'string',
                        },
                        {
                            title: 'English',
                            name: 'en',
                            type: 'string'
                        },
                        {
                            title: 'Русский',
                            name: 'ru',
                            type: 'string'
                        }
                    ]
                },
            ],
        },
        {
            name: 'price_list',
            type: 'array',
            title: 'Price List',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BookIcon,
                    fields: [
                        {
                            title: 'Course',
                            description: 'Դասընթաց',
                            name: 'course',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: 'Հայերեն',
                                    name: 'am',
                                    type: 'string'
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string'
                                },
                                {
                                    title: 'Русский',
                                    name: 'ru',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            title: 'Group lessons',
                            description: 'Խմբային դասեր',
                            name: 'group_lessons',
                            type: 'number',
                        },
                        {
                            title: 'Personal lessons',
                            description: 'Անհատական դասեր',
                            name: 'personal_lessons',
                            type: 'number',
                        },
                        {
                            title: 'Duration Group/Individual',
                            description: 'Տևողությունը Խմբային/Անհատական',
                            name: 'duration',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: 'Հայերեն',
                                    name: 'am',
                                    type: 'string'
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string'
                                },
                                {
                                    title: 'Русский',
                                    name: 'ru',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            title: 'Hours Group/Individual',
                            description: 'Ժամեր Խմբային/Անհատական',
                            name: 'hours_lessons',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: 'Հայերեն',
                                    name: 'am',
                                    type: 'string'
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string'
                                },
                                {
                                    title: 'Русский',
                                    name: 'ru',
                                    type: 'string'
                                }
                            ]
                        },
                    ],
                    preview: {
                        select: {
                            title: 'course.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    },
                }
            ]
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Price list',
                subtitle: 'Design Studio · Գնացուցակ',
            };
        },
    }
};

export default priceListSchemaDesign;
