import { ProjectsIcon } from '@sanity/icons';
import { GiProgression } from 'react-icons/gi';

import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';

const homeSchemaArtHouse = {
    name: 'art-house-home',
    type: 'document',
    title: 'Home',
    id: 'art-house',
    groups: [
        {
            name: 'og',
            title: 'Social Share Info',
            default: true
        },
        {
            name: 'manifest',
            title: 'Web App Settings',
            hidden: ({ document }: {
                document: {
                    [key: string]: never;
                }
            }): boolean => !(document.isPwa)
        },
    ],
    fields: [
        {
            title: 'Open Graph Title',
            name: 'ogTitle',
            type: 'string',
            description:
                'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og']
        },
        {
            title: 'Meta keywords',
            name: 'keywords',
            type: 'array',
            of: [{ type: 'string' }],
            group: ['og'],
        },
        {
            title: 'Social Share Description',
            name: 'ogDescription',
            type: 'object',
            group: ['og'],
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
        {
            type: 'image',
            title: 'Image',
            name: 'ogImage',
            description:
                'URL of the image that should be used in social media previews.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og'],
        },
        /* Schema */
        {
            name: 'our_websites',
            type: 'array',
            title: 'Websites',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(5),
            description: 'No less than five and no more, only you can modify them.',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ProjectsIcon,
                    validation: (Rule: RuleType) => Rule.required(),
                    fields: [
                        {
                            title: 'Company Name (Ընկերության Անվանումը)',
                            name: 'company_name',
                            type: 'string'
                        },
                        {
                            title: 'Website Title',
                            name: 'words',
                            type: 'object',
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
                        {
                            title: 'Website Logo Front',
                            name: 'website_logo_front',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            title: 'Website Logo Back',
                            name: 'website_logo_back',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'web_site_url',
                            title: 'Website url',
                            type: 'string',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'company_name',
                            words: 'words.en'
                        },
                        prepare(selection: { title?: string, words?: string }) {
                            return {
                                title: `${selection.title} ${selection.words}`,
                            };
                        },
                    }
                }
            ],
        },
        {
            name: 'progress_section',
            type: 'array',
            title: 'Progress bars',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(4),
            description: 'No less than four and no more, only you can modify them.',
            of: [
                {
                    type: 'object',
                    name: 'tag',
                    icon: GiProgression,
                    fields: [
                        {
                            title: 'Title',
                            name: 'title',
                            type: 'object',
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
                        {
                            title: 'Quantity',
                            name: 'quantity',
                            type: 'number',
                            initialValue: 0,
                        },
                        {
                            name: 'isPlusSign',
                            title: 'Plus sign',
                            type: 'boolean',
                            description: 'Add a plus sign (+) to the quantity.',
                            options: {
                                layout: 'checkbox',
                            },
                        }
                    ],
                    preview: {
                        select: {
                            title: 'title.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    },
                    initialValue: {
                        isPlusSign: true,
                    },
                }
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Գլխավոր',
            };
        },
    }
};

export default homeSchemaArtHouse;
