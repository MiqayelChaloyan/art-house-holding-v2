import { HomeIcon } from '@sanity/icons';

import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';
import { blogSectionFields } from '@/sanity/schemas/shared/blogSectionFields';

const aboutUsSchemaLanguage = {
    name: 'about-us-language',
    type: 'document',
    title: 'Home page',
    description: 'Language Studio landing page — about, daily life, and blog heading.',
    icon: HomeIcon,
    id: 'about-us-language',
    groups: [
        { name: 'about', title: '1. About', default: true },
        { name: 'daily', title: '2. Daily life' },
        { name: 'blog', title: '3. Blog' },
        { name: 'og', title: 'Social share' },
        {
            name: 'manifest',
            title: 'Web app',
            hidden: ({ document }: {
                document: {
                    [key: string]: never;
                }
            }): boolean => !(document.isPwa)
        },
    ],
    fields: [
        {
            type: 'string',
            title: 'Share title',
            name: 'ogTitle',
            description:
                'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og']
        },
        {
            title: 'Keywords',
            name: 'keywords',
            type: 'array',
            of: [{ type: 'string' }],
            group: ['og'],
        },
        {
            title: 'Share description',
            name: 'ogDescription',
            type: 'object',
            group: ['og'],
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
            type: 'image',
            title: 'Share image',
            name: 'ogImage',
            description:
                'URL of the image that should be used in social media previews.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og'],
        },
        /* Schema */
        {
            title: 'About',
            name: 'about_us',
            type: 'object',
            group: 'about',
            fields: [
                {
                    title: 'Content',
                    name: 'content',
                    type: 'object',
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
                    name: 'about_us_images',
                    type: 'array',
                    title: 'About Us Images',
                    description: 'No less than three, and no more, only you can modify them',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(3),
                    of: [{
                        type: 'image', alt: 'alt',
                        fields: [
                            {
                                name: 'alt',
                                type: 'string',
                                title: 'Alternative text',
                            },
                        ],
                    }],
                    options: {
                        layout: 'grid',
                    },
                },
                {
                    name: 'about_our_daily',
                    type: 'array',
                    title: 'Videos about our daily life',
                    description: 'No less than two, and no more, only you can modify them',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(2),
                    of: [
                        {
                            name: 'Object',
                            type: 'object',
                            fields: [
                                {
                                    name: 'video',
                                    type: 'object',
                                    title: 'Video',
                                    fields: [
                                        {
                                            name: 'useUpload',
                                            type: 'boolean',
                                            title: 'Use uploaded video?',
                                            description: 'Check this box to upload a video file. Leave unchecked to provide a video URL.',
                                            initialValue: false,
                                        },
                                        {
                                            name: 'video_url',
                                            title: 'Video Link',
                                            type: 'url',
                                            hidden: ({ parent }: { parent: { useUpload?: boolean } }) => parent?.useUpload === true,
                                        },
                                        {
                                            name: 'videoFile',
                                            type: 'file',
                                            title: 'Upload Video',
                                            options: {
                                                accept: 'video/*',
                                            },
                                            hidden: ({ parent }: { parent: { useUpload?: boolean } }) => parent?.useUpload === false,
                                        },
                                        {
                                            name: 'video_light',
                                            title: 'Video Light',
                                            type: 'image',
                                            options: { hotspot: true },
                                            fields: [
                                                {
                                                    name: 'alt',
                                                    title: 'Alternative text',
                                                    type: 'string'
                                                }
                                            ],
                                        },
                                    ],
                                    validation: (Rule: RuleType) =>
                                        Rule.custom((fields) => {
                                            if (fields.useUpload && !fields.videoFile) {
                                                return 'Please upload a video file or uncheck "Use uploaded video?"';
                                            }
                                            if (!fields.useUpload && !fields.video_url) {
                                                return 'Please provide a video URL or check "Use uploaded video?"';
                                            }
                                            return true;
                                        }),
                                }
                            ],
                            preview: {
                                select: {
                                    title: 'title',
                                },
                                prepare() {
                                    return {
                                        title: 'Uploaded Video',
                                    };
                                },
                            }
                        }
                    ]
                },
            ],
        },
        {
            title: 'Daily life',
            name: 'our_daily_life',
            type: 'object',
            group: 'daily',
            fields: [
                {
                    name: 'our_daily_life_images',
                    type: 'array',
                    title: 'Our Daily Life Images',
                    description: 'No less than three, and no more, only you can modify them',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(3),
                    of: [{
                        type: 'image', alt: 'alt',
                        fields: [
                            {
                                name: 'alt',
                                type: 'string',
                                title: 'Alternative text',
                            },
                            {
                                name: 'slug',
                                type: 'slug',
                                options: {
                                    source: 'name',
                                },
                                validation: (Rule: any) => Rule.required(),
                            },
                        ],
                    }],
                    options: {
                        layout: 'grid',
                    },
                },
                {
                    name: 'about_our_daily',
                    type: 'array',
                    title: 'Videos about our daily life',
                    description: 'No less than three, and no more, only you can modify them',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(3),
                    of: [
                        {
                            name: 'Object',
                            type: 'object',
                            fields: [
                                {
                                    title: 'News',
                                    name: 'news',
                                    type: 'object',
                                    validation: (Rule: any) => Rule.required(),
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
                                    name: 'languages',
                                    type: 'reference',
                                    title: 'Languages Category',
                                    to: [{ type: 'about-language' }],
                                    validation: (Rule: any) => Rule.required(),
                                },
                                {
                                    name: 'video',
                                    type: 'object',
                                    title: 'Video',
                                    fields: [
                                        {
                                            name: 'useUpload',
                                            type: 'boolean',
                                            title: 'Use uploaded video?',
                                            description: 'Check this box to upload a video file. Leave unchecked to provide a video URL.',
                                            initialValue: false,
                                        },
                                        {
                                            name: 'video_url',
                                            title: 'Video Link',
                                            type: 'url',
                                            hidden: ({ parent }: { parent: { useUpload?: boolean } }) => parent?.useUpload === true,
                                        },
                                        {
                                            name: 'videoFile',
                                            type: 'file',
                                            title: 'Upload Video',
                                            options: {
                                                accept: 'video/*',
                                            },
                                            hidden: ({ parent }: { parent: { useUpload?: boolean } }) => parent?.useUpload === false,
                                        },
                                        {
                                            name: 'video_light',
                                            title: 'Video Light',
                                            type: 'image',
                                            options: { hotspot: true },
                                            fields: [
                                                {
                                                    name: 'alt',
                                                    title: 'Alternative text',
                                                    type: 'string'
                                                }
                                            ],
                                        },
                                    ],
                                    validation: (Rule: RuleType) =>
                                        Rule.custom((fields) => {
                                            if (fields.useUpload && !fields.videoFile) {
                                                return 'Please upload a video file or uncheck "Use uploaded video?"';
                                            }
                                            if (!fields.useUpload && !fields.video_url) {
                                                return 'Please provide a video URL or check "Use uploaded video?"';
                                            }
                                            return true;
                                        }),
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'news.en'
                                },
                                prepare(selection: { title?: string }) {
                                    return {
                                        title: selection.title,
                                    };
                                },
                            }
                        },
                    ],
                },
            ],
        },
        {
            ...blogSectionFields,
            group: 'blog',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Home page',
                subtitle: 'Language Studio · Գլխավոր',
            };
        },
    }
};

export default aboutUsSchemaLanguage;