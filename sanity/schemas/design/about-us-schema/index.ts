import { ClipboardIcon, UserIcon } from '@sanity/icons';
import { GiProgression } from 'react-icons/gi';

import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';
import { blogSectionFields } from '@/sanity/schemas/shared/blogSectionFields';

export const aboutUsSchemaDesign = {
    name: 'about-us-design',
    type: 'document',
    title: 'Home',
    id: 'about-us-design',
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
            type: 'string',
            title: 'Open Graph Title',
            name: 'ogTitle',
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
            name: 'main_section',
            type: 'array',
            title: 'Main Section',
            description: 'You can add any number of pictures, with a minimum of two.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClipboardIcon,
                    fields: [
                        {
                            title: 'Company Name (Ընկերության Անվանումը)',
                            name: 'company_name',
                            type: 'string'
                        },
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
                            title: 'Course Image',
                            name: 'image',
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
                    ],
                    preview: {
                        select: {
                            title: 'title.en',
                            company_name: 'company_name'
                        },
                        prepare(selection: { title?: string, company_name?: string }) {
                            return {
                                title: `${selection.company_name} ${selection.title}`,
                            };
                        },
                    }
                }
            ],
        },
        {
            name: 'courses',
            type: 'array',
            title: 'Courses',
            description: 'You can add to five courses',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(5),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClipboardIcon,
                    fields: [
                        {
                            title: 'Name',
                            name: 'name',
                            type: 'string',
                            description: 'Title of the course: English (It is preferable that the length of the title does not exceed 30).'
                        },
                        {
                            title: 'Course Name',
                            name: 'course_name',
                            type: 'object',
                            description: 'Title of the course (It is preferable that the length of the title does not exceed 30).',
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
                            title: 'About Course',
                            name: 'about_course',
                            type: 'object',
                            description: 'About the course (It is preferable that the length does not exceed 165).',
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
                            name: 'categories',
                            type: 'reference',
                            title: 'Course Category',
                            to: [{ type: 'courses-design' }],
                            validation: (Rule: any) => Rule.required(),
                        },
                    ]
                }
            ],
        },
        {
            name: 'our_day',
            type: 'object',
            title: 'Our Day Video',
            validation: (Rule: RuleType) => Rule.required(),
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
            ]
        },
        {
            name: 'progress_section',
            type: 'array',
            title: 'Progress Section',
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
                            validation: (Rule: any) => Rule.required(),
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
                            validation: (Rule: any) => Rule.required(),
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
            ]
        },
        {
            name: 'workers',
            type: 'array',
            title: 'Workers',
            description: 'You can add any number of employees.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'Worker',
                            name: 'worker',
                            type: 'object',
                            description: 'Անուն, Ազգանուն',
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
                            title: "The employee's profession",
                            name: 'profession',
                            type: 'object',
                            description: 'Աշխատողի մասնագիտությունը',
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
                            title: 'Worker Image',
                            name: 'worker_image',
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
                    ],
                    preview: {
                        select: {
                            title: 'worker.en'
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
        blogSectionFields,
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

export default aboutUsSchemaDesign;