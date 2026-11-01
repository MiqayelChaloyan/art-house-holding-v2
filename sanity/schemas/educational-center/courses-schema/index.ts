import { BookIcon } from '@sanity/icons';
import { TfiLayoutSliderAlt } from 'react-icons/tfi';

import { RuleType } from '@/sanity/ruleType';

export const coursesSchemaEducationalCenter = {
    name: 'courses',
    type: 'document',
    title: 'Educational course',
    description: 'A course page for the Educational Center.',
    id: 'courses-educational-center',
    icon: BookIcon,
    groups: [
        {
            name: 'og',
            title: 'Social share',
        },
        {
            name: 'manifest',
            title: 'Web app',
            hidden: ({ document }: {
                document: {
                    [key: string]: string;
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
            title: 'Image',
            name: 'ogImage',
            description:
                'URL of the image that should be used in social media previews.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og'],
        },
        /* Schema */
        {
            title: 'Course Name',
            name: 'course_name',
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
            name: 'slug',
            type: 'slug',
            description: 'Slug must be the name of the course in lowercase and must be unique. Write only between words with `-` or `_` symbols. Do not use these symbols `/`.',
            options: {
                source: 'name',
            },
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            name: 'course_main',
            type: 'array',
            title: 'Course Main',
            description: 'You can add any number of pictures, with a minimum of two.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: TfiLayoutSliderAlt,
                    fields: [
                        {
                            title: 'Title',
                            name: 'title',
                            type: 'object',
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
            title: 'About Courses Title',
            name: 'about_us_title',
            type: 'object',
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
            title: 'About Courses Content',
            name: 'about_us_content',
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
            name: 'course_process',
            type: 'object',
            title: 'Course Process',
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

            name: 'student_works',
            type: 'array',
            title: 'Student works',
            description: 'You can add any number of pictures.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
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
            ],
            options: {
                layout: 'grid',
            },
        },
        {
            name: 'svg',
            title: 'Svg',
            type: 'image',
            options: { hotspot: true },
            description: "This will also be used as the page's favicon",
            fields: [

                {
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string'
                }
            ],
        },
        {
            name: 'price_list',
            type: 'array',
            title: 'Price list',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BookIcon,
                    fields: [
                        {
                            title: 'Course Title',
                            name: 'course_title',
                            type: 'object',
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
                            title: 'Course Amount',
                            name: 'amount',
                            type: 'number',
                            initialValue: 0,
                        },
                        {
                            title: 'Duration',
                            name: 'duration',
                            type: 'object',
                            description: 'Տևողությունը',
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
                            name: 'duration_of_class',
                            type: 'number',
                            title: 'Duration of Class',
                            description: 'Դասերի տևողությունը',
                            initialValue: 0,
                        },
                    ],
                    preview: {
                        select: {
                            title: 'course_title.en',
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
            title: 'course_name.en',
        },
        prepare(selection: { title?: string }) {
            return {
                title: selection.title || 'Educational course',
                subtitle: 'Educational Center',
            };
        },
    },
};

export default coursesSchemaEducationalCenter;