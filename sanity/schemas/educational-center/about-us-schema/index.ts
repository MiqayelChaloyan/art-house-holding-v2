import { ClipboardIcon, LaunchIcon, UserIcon } from '@sanity/icons';
import { GiProgression } from 'react-icons/gi';
import { TfiLayoutSliderAlt } from 'react-icons/tfi';

import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';
import { blogSectionFields } from '@/sanity/schemas/shared/blogSectionFields';

export const aboutUsSchemaEducationalCenter = {
    name: 'about-us',
    type: 'document',
    title: 'About Us',
    id: 'about-us-educational-center',
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
                    [key: string]: string;
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
                    icon: TfiLayoutSliderAlt,
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
                            title: 'title.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    }
                }
            ],
        },
        {
            name: 'about_us',
            type: 'object',
            title: 'About Us',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    title: 'Content',
                    name: 'about_us_content',
                    type: 'object',
                    validation: (Rule: RuleType) => Rule.required(),
                    fields: [
                        {
                            title: 'Armenian',
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
                            title: 'Russian',
                            name: 'ru',
                            type: 'array',
                            of: [{ type: 'block' }],
                        },
                    ]
                },
                {
                    name: 'about_us_image',
                    title: 'About Us Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternative text',
                            type: 'string'
                        }
                    ],
                    validation: (Rule: RuleType) => Rule.required(),
                },
            ]
        },
        {
            name: 'cooking_courses',
            type: 'object',
            title: 'Cooking Courses',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    title: 'Video Title',
                    name: 'video_section_title',
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
            name: 'section',
            type: 'object',
            title: 'Section Lessons',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    title: 'Section Title',
                    name: 'section_title',
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
                {
                    name: 'lessons',
                    type: 'array',
                    title: 'Lessons',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(3),
                    description: 'No less than three, and no more, only you can modify them.',
                    of: [
                        {
                            name: 'Object',
                            type: 'object',
                            icon: ClipboardIcon,
                            fields: [
                                {
                                    title: 'Lessons Title',
                                    name: 'subtitle',
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
                                {
                                    title: 'Content',
                                    name: 'content',
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
                                {
                                    name: 'image_one',
                                    title: 'Image 1',
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
                                    name: 'image_two',
                                    title: 'Image 2',
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
                                    title: 'subtitle.en',
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
                            title: 'Quantity',
                            name: 'quantity',
                            type: 'number',
                            initialValue: 0,
                            validation: (Rule: RuleType) => Rule.required(),
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
            name: 'specialists_section',
            type: 'array',
            title: 'Specialists',
            description: 'You can add any number of pictures, with a minimum of two.',
            validation: (Rule: RuleType) => Rule.min(2),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: LaunchIcon,
                    fields: [
                        {
                            title: 'Specialists Title',
                            name: 'title',
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
                        {
                            title: 'Course Name',
                            name: 'course_name',
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
                        {
                            name: 'specialists_section_image',
                            title: 'Specialists Image',
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
                            name: 'categories',
                            type: 'reference',
                            title: 'Course Category',
                            to: [{ type: 'courses' }],
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            name: 'specialists_section_images',
                            type: 'array',
                            title: 'Specialists Images',
                            description: 'No less than eight, and no more, only you can modify them.',
                            components: { input: ArrayMaxItems },
                            validation: (Rule: RuleType) => Rule.max(8),
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
                    ],
                    preview: {
                        select: {
                            title: 'title.en',
                            course_name: 'course_name.en'
                        },
                        prepare(selection: { title?: string, course_name?: string }) {
                            return {
                                title: `${selection.title} / ${selection.course_name}`,
                            };
                        },
                    },
                }
            ],
        },
        {
            name: 'our_rating_section',
            type: 'array',
            title: 'Our Rating',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(3),
            description: 'No less than three, and no more, only you can modify them.',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'User Name',
                            name: 'user_name',
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
                        {
                            name: 'user_image',
                            title: 'User Image',
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
                            title: 'User Feedback',
                            name: 'user_feedback',
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
                        {
                            name: 'our_rating_section_image',
                            title: 'Our Rating Background Image',
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
                            title: 'Rating (1-5)*',
                            name: 'rating',
                            type: 'number',
                            validation: (Rule: RuleType) => Rule.required(),
                            initialValue: 5,
                        },
                    ],
                    preview: {
                        select: {
                            title: 'user_name.en',
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
                title: 'Մեր մասին',
            };
        },
    }
};

export default aboutUsSchemaEducationalCenter;