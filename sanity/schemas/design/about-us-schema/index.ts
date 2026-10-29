import { ClipboardIcon, UserIcon } from '@sanity/icons';
import { GiProgression } from 'react-icons/gi';

import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';
import { blogSectionFields } from '@/sanity/schemas/shared/blogSectionFields';

const localizedString = (title: string, name: string, type: 'string' | 'text' = 'string') => ({
    title,
    name,
    type: type === 'text' ? 'localeText' : 'localeString',
});

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
            name: 'studio_section',
            title: 'Studio Section',
            type: 'object',
            description: 'The section after the hero. Headline, buttons, stats, and a sliding gallery.',
            fields: [
                localizedString('Eyebrow', 'eyebrow'),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2', 'line_2'),
                localizedString('Headline line 3 (italic)', 'line_3'),
                localizedString('Headline line 4', 'line_4'),
                localizedString('Description', 'description', 'text'),
                {
                    name: 'stats',
                    title: 'Stats',
                    type: 'array',
                    description: 'Exactly three stats.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.required().min(3).max(3),
                    of: [
                        {
                            name: 'stat',
                            type: 'object',
                            fields: [
                                {
                                    name: 'value',
                                    title: 'Value',
                                    type: 'string',
                                    description: 'Shown as-is, for example 07, 1.2k, 180+.',
                                },
                                localizedString('Label', 'title'),
                            ],
                            preview: {
                                select: { title: 'value', subtitle: 'title.en' },
                            },
                        },
                    ],
                },
                {
                    name: 'slides',
                    title: 'Sliding images',
                    type: 'array',
                    description: 'At least two images. They crossfade inside the card.',
                    validation: (Rule: RuleType) => Rule.min(2),
                    of: [
                        {
                            name: 'slide',
                            type: 'object',
                            fields: [
                                {
                                    name: 'image',
                                    title: 'Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [
                                        { name: 'alt', title: 'Alternative text', type: 'string' },
                                    ],
                                },
                            ],
                            preview: {
                                select: { media: 'image', title: 'image.alt' },
                                prepare(selection: { title?: string; media?: unknown }) {
                                    return { title: selection.title || 'Slide', media: selection.media };
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'courses_section',
            title: 'Courses Section',
            type: 'object',
            description: 'Heading above the course cards on the home page.',
            fields: [
                localizedString('Eyebrow', 'eyebrow'),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
            ],
        },
        {
            name: 'why_section',
            title: 'Why Art House Section',
            type: 'object',
            description: 'Six reasons grid after the courses block.',
            fields: [
                localizedString('Eyebrow', 'eyebrow'),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                {
                    name: 'items',
                    title: 'Reasons',
                    type: 'array',
                    description: 'Exactly six items, shown in a 3×2 grid.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.required().min(6).max(6),
                    of: [
                        {
                            name: 'reason',
                            type: 'object',
                            fields: [
                                {
                                    name: 'number',
                                    title: 'Number',
                                    type: 'string',
                                    description: 'For example 01, 02, 03.',
                                },
                                localizedString('Title', 'title'),
                                localizedString('Description', 'description', 'text'),
                            ],
                            preview: {
                                select: { title: 'number', subtitle: 'title.en' },
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'courses',
            type: 'array',
            title: 'Courses',
            description: 'You can add up to six courses',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(6),
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
                        localizedString('Card description', 'card_description', 'text'),
                        localizedString('Duration', 'duration'),
                        localizedString('Level', 'level'),
                        {
                            name: 'card_image',
                            title: 'Card image',
                            type: 'image',
                            description: 'Optional cover for the home grid. Falls back to the first gallery image.',
                            options: { hotspot: true },
                            fields: [
                                { name: 'alt', title: 'Alternative text', type: 'string' },
                            ],
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
            name: 'projects_section',
            title: 'Selected Work',
            type: 'object',
            description: 'Bento grid of featured projects on the home page.',
            fields: [
                localizedString('Eyebrow', 'eyebrow'),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                localizedString('Description', 'description', 'text'),
                {
                    name: 'projects',
                    title: 'Projects',
                    type: 'array',
                    description: 'Four projects: large, two small, then a wide one.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.required().min(4).max(4),
                    of: [
                        {
                            name: 'project',
                            type: 'object',
                            fields: [
                                localizedString('Title', 'title'),
                                localizedString('Category', 'category'),
                                {
                                    name: 'year',
                                    title: 'Year',
                                    type: 'string',
                                },
                                {
                                    name: 'image',
                                    title: 'Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                                },
                                {
                                    name: 'href',
                                    title: 'Link',
                                    type: 'string',
                                    description: 'Optional path, for example /design/portfolios',
                                },
                            ],
                            preview: {
                                select: { title: 'title.en', subtitle: 'category.en', media: 'image' },
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'staff_section',
            title: 'Staff Section',
            type: 'object',
            description: 'Heading above the staff slider.',
            fields: [
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                localizedString('Headline line 3', 'line_3'),
            ],
        },
        {
            name: 'certificates_section',
            title: 'Certificate and Diploma',
            type: 'object',
            description: 'Two documents shown after the staff slider.',
            fields: [
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                localizedString('Headline line 3', 'line_3'),
                {
                    name: 'certificate',
                    title: 'Certificate image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                },
                {
                    name: 'diploma',
                    title: 'Diploma image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                },
            ],
        },
        {
            name: 'workers',
            type: 'array',
            title: 'Staff',
            description: 'Team members shown in the staff slider.',
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
                        localizedString('Experience', 'experience'),
                        localizedString('Bio', 'bio', 'text'),
                        {
                            name: 'programs',
                            title: 'Programs',
                            type: 'array',
                            of: [
                                {
                                    name: 'program',
                                    type: 'object',
                                    fields: [localizedString('Label', 'label')],
                                    preview: { select: { title: 'label.en' } },
                                },
                            ],
                        },
                        {
                            name: 'skills',
                            title: 'Skills',
                            type: 'array',
                            of: [
                                {
                                    name: 'skill',
                                    type: 'object',
                                    fields: [localizedString('Label', 'label')],
                                    preview: { select: { title: 'label.en' } },
                                },
                            ],
                        },
                        {
                            name: 'behance_url',
                            title: 'Behance URL',
                            type: 'url',
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
        {
            name: 'voices_section',
            title: 'Student Voices',
            type: 'object',
            description: 'Testimonial slider on the home page.',
            fields: [
                localizedString('Eyebrow', 'eyebrow'),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                {
                    name: 'items',
                    title: 'Testimonials',
                    type: 'array',
                    description: 'Student quotes. Three to six slides.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.required().min(3).max(6),
                    of: [
                        {
                            name: 'voice',
                            type: 'object',
                            fields: [
                                localizedString('Name', 'name'),
                                localizedString('Role', 'role'),
                                localizedString('Quote', 'quote', 'text'),
                                {
                                    name: 'rating',
                                    title: 'Rating',
                                    type: 'number',
                                    initialValue: 5,
                                    validation: (Rule: RuleType) => Rule.min(1).max(5).integer(),
                                },
                                {
                                    name: 'image',
                                    title: 'Portrait',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                                },
                            ],
                            preview: {
                                select: { title: 'name.en', subtitle: 'role.en', media: 'image' },
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'clients',
            title: 'Clients marquee',
            type: 'array',
            description: 'Client logos scrolling above the footer.',
            of: [
                {
                    name: 'client',
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                        },
                        {
                            name: 'logo',
                            title: 'Logo',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: { title: 'name', media: 'logo' },
                    },
                },
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