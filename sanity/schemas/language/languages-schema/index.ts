import { EarthGlobeIcon, UserIcon } from '@sanity/icons';
import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';

const languagesSchemaLanguage = {
    name: 'about-language',
    type: 'document',
    title: 'Language program',
    description: 'A language page — overview, teachers, and course process.',
    icon: EarthGlobeIcon,
    id: 'languages-languages-center',
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
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Do not change the name.'
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
            title: 'Image',
            name: 'image',
            type: 'object',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    name: 'am',
                    type: 'image',
                    title: 'Հայերեն',
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
                    name: 'en',
                    type: 'image',
                    title: 'English',
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
                    name: 'ru',
                    type: 'image',
                    title: 'Русский',
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
            ]
        },
        {
            title: 'Text',
            name: 'text',
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
            name: 'during_courses_images',
            type: 'array',
            title: 'During Courses Images',
            description: 'No less than six, and no more, only you can modify them',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(6),
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
            title: 'Course Process Video',
            name: 'course_process',
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
            ]
        },
        {
            name: 'teachers',
            type: 'array',
            title: 'Teachers',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'Name, Surname',
                            name: 'fullName',
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
                            name: 'teacher_image',
                            title: 'Teacher Image',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [

                                {
                                    name: 'alt',
                                    title: 'Alt',
                                    type: 'string'
                                }
                            ]
                        },
                    ],
                    preview: {
                        select: {
                            title: 'fullName.en'
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
            title: 'name',
            media: 'image.en',
        },
        prepare(selection: { title?: string }) {
            return {
                title: selection.title || 'Language program',
                subtitle: 'Language Studio',
            };
        },
    },
};

export default languagesSchemaLanguage;











