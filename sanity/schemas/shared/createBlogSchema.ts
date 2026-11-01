import { DocumentTextIcon } from '@sanity/icons';

import { RuleType } from '@/sanity/ruleType';

const localizedStringFields = [
    {
        title: 'Հայերեն',
        name: 'am',
        type: 'string',
    },
    {
        title: 'English',
        name: 'en',
        type: 'string',
    },
    {
        title: 'Русский',
        name: 'ru',
        type: 'string',
    },
];

const localizedBlockFields = [
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
];

export default function createBlogSchema(name: string, title: string, description?: string) {
    return {
        name,
        type: 'document',
        title,
        description,
        icon: DocumentTextIcon,
        groups: [
            {
                name: 'og',
                title: 'Social share',
            },
        ],
        fields: [
            {
                title: 'Meta keywords',
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
                fields: localizedStringFields,
            },
            {
                type: 'image',
                title: 'Share image',
                name: 'ogImage',
                description: 'URL of the image that should be used in social media previews.',
                group: ['og'],
            },
            {
                title: 'Title',
                name: 'title',
                type: 'object',
                validation: (Rule: RuleType) => Rule.required(),
                fields: localizedStringFields,
            },
            {
                name: 'slug',
                type: 'slug',
                description: 'Slug must be unique. Use lowercase letters with `-` or `_` between words.',
                options: {
                    source: 'title.en',
                    maxLength: 96,
                },
                validation: (Rule: RuleType) => Rule.required(),
            },
            {
                title: 'Excerpt',
                name: 'excerpt',
                type: 'object',
                validation: (Rule: RuleType) => Rule.required(),
                fields: localizedStringFields,
            },
            {
                title: 'Body',
                name: 'body',
                type: 'object',
                validation: (Rule: RuleType) => Rule.required(),
                fields: localizedBlockFields,
            },
            {
                title: 'Featured Image',
                name: 'featuredImage',
                type: 'image',
                options: { hotspot: true },
                validation: (Rule: RuleType) => Rule.required(),
                fields: [
                    {
                        name: 'alt',
                        title: 'Alternative text',
                        type: 'string',
                    },
                ],
            },
            {
                title: 'Gallery',
                name: 'gallery',
                type: 'array',
                description: 'Add multiple images to display in the blog post gallery.',
                of: [
                    {
                        type: 'image',
                        options: { hotspot: true },
                        fields: [
                            {
                                name: 'alt',
                                title: 'Alternative text',
                                type: 'string',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Gallery Caption',
                name: 'gallery_caption',
                type: 'object',
                fields: localizedStringFields,
            },
            {
                title: 'Publish Date',
                name: 'publishedAt',
                type: 'datetime',
                validation: (Rule: RuleType) => Rule.required(),
                initialValue: () => new Date().toISOString(),
            },
            {
                title: 'Category',
                name: 'category',
                type: 'object',
                fields: localizedStringFields,
            },
            {
                title: 'Related Posts',
                name: 'related_posts',
                type: 'array',
                description: 'Optional. Pick up to 4 related posts. If empty, similar posts are chosen automatically.',
                validation: (Rule: RuleType) => Rule.max(4),
                of: [
                    {
                        type: 'reference',
                        to: [{ type: name }],
                    },
                ],
            },
        ],
        orderings: [
            {
                title: 'Publish Date, Newest',
                name: 'publishedAtDesc',
                by: [{ field: 'publishedAt', direction: 'desc' }],
            },
        ],
        preview: {
            select: {
                title: 'title.en',
                subtitle: 'publishedAt',
                media: 'featuredImage',
            },
            prepare(selection: { title?: string; subtitle?: string }) {
                return {
                    title: selection.title,
                    subtitle: selection.subtitle
                        ? new Date(selection.subtitle).toLocaleDateString()
                        : undefined,
                };
            },
        },
    };
};
