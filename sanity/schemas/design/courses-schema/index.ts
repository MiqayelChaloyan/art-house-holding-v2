import { SparklesIcon, BulbOutlineIcon, CheckmarkIcon, ImagesIcon, ClipboardImageIcon } from '@sanity/icons';
import { RuleType } from '@/sanity/ruleType';

export const coursesSchemaDesign = {
    name: 'courses-design',
    type: 'document',
    title: 'Courses',
    id: 'courses-design',
    icon: SparklesIcon,
    groups: [
        {
            name: 'portfolio',
            title: 'Portfolios',
            default: false
        },
        {
            name: 'orders',
            title: 'Orders',
            default: false
        },
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
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Դասընթացի անվանումը` անգլերեն'
        },
        {
            title: 'Course Name',
            name: 'course_name',
            type: 'object',
            description: 'Դասընթացի անվանումը',
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
        {
            name: 'slug',
            type: 'slug',
            description: 'Slug must be the name of the course in lowercase and must be unique. Write only between words with `-` or `_` symbols. Do not use these symbols `/`.',
            options: {
                source: 'name',
            },
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            name: 'gallery_of_course',
            type: 'array',
            title: 'Gallery of Course',
            description: 'You can add any number of pictures, with a minimum of two.',
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
            name: 'conditions',
            type: 'array',
            title: 'Conditions',
            description: 'You can add any number of conditions.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BulbOutlineIcon,
                    fields: [
                        {
                            title: 'Armenian',
                            name: 'am',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            title: 'English',
                            name: 'en',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            title: 'Russian',
                            name: 'ru',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        }
                    ]
                }
            ],
        },
        {
            name: 'guides',
            type: 'array',
            title: 'Guides',
            description: 'You can add any number of guidelines.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: CheckmarkIcon,
                    fields: [
                        {
                            title: 'Armenian',
                            name: 'am',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            title: 'English',
                            name: 'en',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            title: 'Russian',
                            name: 'ru',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        }
                    ]
                }
            ],
        },
        {
            name: 'portfolios',
            type: 'array',
            title: 'Portfolios',
            description: 'You can add any number of jobs, with a minimum of four.',
            validation: (Rule: RuleType) => Rule.required(),
            group: 'portfolio',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ImagesIcon,
                    validation: (Rule: RuleType) => Rule.required(),
                    fields: [
                        {
                            title: 'Author (name, surname)',
                            description: 'Հեղինակի անուն, ազգանունը',
                            name: 'author',
                            type: 'object',
                            fields: [
                                {
                                    title: 'Armenian',
                                    name: 'am',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.required(),
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.required(),
                                },
                                {
                                    title: 'Russian',
                                    name: 'ru',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.required(),
                                }
                            ]
                        },
                        {
                            title: 'Image',
                            name: 'image',
                            type: 'image',
                            options: { hotspot: true },
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    validation: (Rule: RuleType) => Rule.required(),
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: 'slug-ը պիտի եզակի լինի',
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            title: 'Background Image',
                            name: 'background_image',
                            type: 'image',
                            options: { hotspot: true },
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    validation: (Rule: RuleType) => Rule.required(),
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'title_images_array',
                            type: 'array',
                            title: 'Title and Images Array',
                            validation: (Rule: RuleType) => Rule.required(),
                            of: [
                                {
                                    type: 'object',
                                    icon: ClipboardImageIcon,
                                    fields: [
                                        {
                                            title: 'Title',
                                            name: 'title',
                                            type: 'object',
                                            validation: (Rule: RuleType) => Rule.required(),
                                            fields: [
                                                {
                                                    title: 'Armenian',
                                                    name: 'am',
                                                    type: 'string',
                                                    validation: (Rule: RuleType) => Rule.required(),
                                                },
                                                {
                                                    title: 'English',
                                                    name: 'en',
                                                    type: 'string',
                                                    validation: (Rule: RuleType) => Rule.required(),
                                                },
                                                {
                                                    title: 'Russian',
                                                    name: 'ru',
                                                    type: 'string',
                                                    validation: (Rule: RuleType) => Rule.required(),
                                                }
                                            ]
                                        },
                                        {
                                            name: 'images',
                                            type: 'array',
                                            title: 'Images',
                                            validation: (Rule: RuleType) => Rule.required(),
                                            of: [
                                                {
                                                    title: 'Image',
                                                    name: 'image',
                                                    type: 'image',
                                                    validation: (Rule: RuleType) => Rule.required(),
                                                    options: { hotspot: true },
                                                    fields: [
                                                        {
                                                            name: 'alt',
                                                            title: 'Alternative text',
                                                            type: 'string',
                                                            validation: (Rule: RuleType) => Rule.required(),
                                                        }
                                                    ]
                                                },
                                            ],
                                        },
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
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'author.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    },
                }
            ],
        },
        {
            name: 'orders',
            type: 'array',
            title: 'Orders',
            description: 'You can add any number of jobs, with a minimum of four.',
            validation: (Rule: RuleType) => Rule.required(),
            group: 'orders',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ImagesIcon,
                    fields: [
                        {
                            title: 'Author (name, surname)',
                            description: 'Հեղինակի անուն, ազգանունը',
                            name: 'author',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: 'Armenian',
                                    name: 'am',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.required(),
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.required(),
                                },
                                {
                                    title: 'Russian',
                                    name: 'ru',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.required(),
                                }
                            ]
                        },
                        {
                            title: 'Image',
                            name: 'image',
                            type: 'image',
                            validation: (Rule: RuleType) => Rule.required(),
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    validation: (Rule: RuleType) => Rule.required(),
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: 'slug-ը պիտի եզակի լինի',
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            title: 'Background Image',
                            name: 'background_image',
                            type: 'image',
                            validation: (Rule: RuleType) => Rule.required(),
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    validation: (Rule: RuleType) => Rule.required(),
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'title_images_array',
                            type: 'array',
                            title: 'Title and Images Array',
                            validation: (Rule: RuleType) => Rule.required(),
                            of: [
                                {
                                    type: 'object',
                                    icon: ClipboardImageIcon,
                                    fields: [
                                        {
                                            title: 'Title',
                                            name: 'title',
                                            type: 'object',
                                            validation: (Rule: RuleType) => Rule.required(),
                                            fields: [
                                                {
                                                    title: 'Armenian',
                                                    name: 'am',
                                                    type: 'string',
                                                    validation: (Rule: RuleType) => Rule.required(),
                                                },
                                                {
                                                    title: 'English',
                                                    name: 'en',
                                                    type: 'string',
                                                    validation: (Rule: RuleType) => Rule.required(),
                                                },
                                                {
                                                    title: 'Russian',
                                                    name: 'ru',
                                                    type: 'string',
                                                    validation: (Rule: RuleType) => Rule.required(),
                                                }
                                            ]
                                        },
                                        {
                                            name: 'images',
                                            type: 'array',
                                            title: 'Images',
                                            validation: (Rule: RuleType) => Rule.required(),
                                            of: [
                                                {
                                                    title: 'Image',
                                                    name: 'image',
                                                    type: 'image',
                                                    validation: (Rule: RuleType) => Rule.required(),
                                                    options: { hotspot: true },
                                                    fields: [
                                                        {
                                                            name: 'alt',
                                                            title: 'Alternative text',
                                                            validation: (Rule: RuleType) => Rule.required(),
                                                            type: 'string'
                                                        }
                                                    ]
                                                },
                                            ],
                                        },
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
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'author.en'
                                },
                                prepare(selection: { title?: string }) {
                                    return {
                                        title: selection.title,
                                    };
                                },
                            },
                        },
                    ],
                    preview: {
                        select: {
                            title: 'author.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    },
                }
            ],
        },
    ],
};

export default coursesSchemaDesign;