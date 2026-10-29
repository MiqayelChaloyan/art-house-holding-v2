import { ActivityIcon } from '@sanity/icons'
import { RuleType } from '@/sanity/ruleType';

const promotionsSchemaLanguage = {
    name: 'promotions-languages',
    type: 'document',
    title: 'Promotions',
    id: 'promotions-languages',
    initialValue: () => ({
        publishedAt: new Date().toISOString()
    }),
    fields: [
        {
            name: 'discounts_list',
            type: 'array',
            title: 'Discounts',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ActivityIcon,
                    fields: [
                        {
                            title: 'Discount limit',
                            name: 'procent',
                            type: 'number',
                            description: 'Զեղչի սահմանաչափ',
                        },
                        {
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            options: {
                                hotspot: true,
                            },
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alternative text',
                                },
                            ],
                        },
                        {
                            title: 'About the discount',
                            description: 'Զեղչի մասին',
                            name: 'about_discount',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: 'Armenian',
                                    name: 'am',
                                    type: 'string'
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string'
                                },
                                {
                                    title: 'Russian',
                                    name: 'ru',
                                    type: 'string'
                                }
                            ]
                        },
                    ],
                    preview: {
                        select: {
                            title: 'about_discount.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    },
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Զեղչեր',
            };
        },
    }
};

export default promotionsSchemaLanguage;
