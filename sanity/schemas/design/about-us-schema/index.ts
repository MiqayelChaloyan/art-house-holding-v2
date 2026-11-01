import { ClipboardIcon, HomeIcon, UserIcon } from '@sanity/icons';
import { GiProgression } from 'react-icons/gi';

import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';
import { blogSectionFields } from '@/sanity/schemas/shared/blogSectionFields';

const localizedString = (
    title: string,
    name: string,
    type: 'string' | 'text' = 'string',
    description?: string,
) => ({
    title,
    name,
    type: type === 'text' ? 'localeText' : 'localeString',
    ...(description ? { description } : {}),
});

const smallLabel = () => localizedString(
    'Small label',
    'eyebrow',
    'string',
    'Short text above the big title. Fill Armenian, English, and Russian.',
);

export const aboutUsSchemaDesign = {
    name: 'about-us-design',
    type: 'document',
    title: 'Home page',
    description: 'Design Studio landing page — banner, studio, courses, staff, and projects.',
    icon: HomeIcon,
    id: 'about-us-design',
    groups: [
        { name: 'banner', title: '1. Banner', default: true },
        { name: 'studio', title: '2. Studio' },
        { name: 'courses', title: '3. Courses' },
        { name: 'reasons', title: '4. Reasons' },
        { name: 'staff', title: '5. Staff' },
        { name: 'certificates', title: '6. Certificates' },
        { name: 'projects', title: '7. Projects' },
        { name: 'blog', title: '8. Blog' },
        { name: 'voices', title: '9. Voices' },
        { name: 'clients', title: '10. Clients' },
        { name: 'older', title: 'Not on this page' },
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
            description: 'The title shown when this page is shared on social media.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og']
        },
        {
            title: 'Keywords',
            name: 'keywords',
            type: 'array',
            description: 'Words that describe this page. Separate each word into its own item.',
            of: [{ type: 'string' }],
            group: ['og'],
        },
        {
            title: 'Share description',
            name: 'ogDescription',
            description: 'The short text shown with the share title, in each language.',
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
            description: 'The picture shown when this page is shared.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og'],
        },
        /* Schema */
        {
            name: 'main_section',
            type: 'array',
            title: 'Banner slides',
            group: 'banner',
            description: 'Full-width slides at the top of the home page. Add at least two. Drag to change the order.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClipboardIcon,
                    fields: [
                        {
                            title: 'Top line',
                            name: 'company_name',
                            type: 'string',
                            description: 'The first line on the slide, usually the studio name.',
                        },
                        {
                            title: 'Second line',
                            name: 'title',
                            type: 'object',
                            description: 'The line under the studio name, in each language.',
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
                            title: 'Background image',
                            name: 'image',
                            type: 'image',
                            description: 'Fills the slide behind the text.',
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
            title: 'Studio block',
            type: 'object',
            group: 'studio',
            description: 'The block under the banner. The big title is four lines. Line 3 is italic. Then the paragraph, three numbers, and the fading photos.',
            fields: [
                smallLabel(),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2', 'line_2'),
                localizedString('Headline line 3 (italic)', 'line_3'),
                localizedString('Headline line 4', 'line_4'),
                localizedString('Description', 'description', 'text'),
                {
                    name: 'stats',
                    title: 'Numbers',
                    type: 'array',
                    description: 'Exactly three numbers, such as years, students, and projects.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.required().min(3).max(3),
                    of: [
                        {
                            name: 'stat',
                            type: 'object',
                            fields: [
                                {
                                    name: 'value',
                                    title: 'Number',
                                    type: 'string',
                                    description: 'Shown as you type it. Examples: 07, 1.2k, 180+.',
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
                    title: 'Photos',
                    type: 'array',
                    description: 'At least two photos. They fade into each other inside the portrait.',
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
            title: 'Courses heading',
            type: 'object',
            group: 'courses',
            description: 'The title above the course cards. The cards themselves are the list under this heading. Up to 10 are shown.',
            fields: [
                smallLabel(),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
            ],
        },
        {
            name: 'why_section',
            title: 'Reasons block',
            type: 'object',
            group: 'reasons',
            description: 'The grid after the courses. Add up to 30 reasons. They wrap three across.',
            fields: [
                smallLabel(),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                {
                    name: 'items',
                    title: 'Reasons',
                    type: 'array',
                    description: 'Up to 30. Each one needs a number, a title, and a short description, in each language.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(30),
                    of: [
                        {
                            name: 'reason',
                            type: 'object',
                            fields: [
                                {
                                    name: 'number',
                                    title: 'Number',
                                    type: 'string',
                                    description: 'The red number, for example 01, 02, 03.',
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
            title: 'Course cards',
            group: 'courses',
            description: 'Up to 10 cards, in this order. Drag to reorder. The link goes to the course category you choose.',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(10),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClipboardIcon,
                    fields: [
                        {
                            title: 'Name in the studio',
                            name: 'name',
                            type: 'string',
                            description: 'English only. This is the name in the list here. It is not shown on the website.'
                        },
                        {
                            title: 'Title on the card',
                            name: 'course_name',
                            type: 'object',
                            description: 'The course name visitors see, in each language. Keep it to about 30 characters so it fits the card.',
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
                            title: 'Text on the card',
                            name: 'about_course',
                            type: 'object',
                            description: 'One or two lines under the title, in each language. About 165 characters keeps the cards the same height.',
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
                        localizedString('Longer description', 'card_description', 'text', 'Optional. If you fill this, it replaces the short text on the card.'),
                        localizedString('Duration', 'duration', 'string', 'Shown at the bottom of the card, for example 6 months.'),
                        localizedString('Level', 'level', 'string', 'Shown next to the duration, for example Beginner.'),
                        {
                            name: 'card_image',
                            title: 'Card image',
                            type: 'image',
                            description: 'The picture on the home card. If you leave it empty, the first gallery picture is used.',
                            options: { hotspot: true },
                            fields: [
                                { name: 'alt', title: 'Alternative text', type: 'string' },
                            ],
                        },
                        {
                            name: 'gallery_of_course',
                            type: 'array',
                            title: 'More pictures',
                            description: 'Extra pictures for this course. The first one is the card picture when no card image is set.',
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
                            title: 'Course page',
                            description: 'Where the card links. Choose the matching course.',
                            to: [{ type: 'courses-design' }],
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: { title: 'course_name.en', subtitle: 'name', media: 'card_image' },
                        prepare(selection: { title?: string; subtitle?: string; media?: unknown }) {
                            return { title: selection.title || selection.subtitle || 'Course', media: selection.media };
                        },
                    },
                }
            ],
        },
        {
            name: 'our_day',
            type: 'object',
            title: 'Video',
            group: 'older',
            description: 'Saved for an older layout. It is not shown on the current home page.',
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
                            title: 'Upload a file instead of a link',
                            description: 'Turn this on to upload a video file. Leave it off to paste a video link.',
                            initialValue: false,
                        },
                        {
                            name: 'video_url',
                            title: 'Video link',
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
                            title: 'Poster image',
                            description: 'The still image shown before the video plays.',
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
                                return 'Upload a video file, or turn off “Upload a file instead of a link”.';
                            }
                            if (!fields.useUpload && !fields.video_url) {
                                return 'Paste a video link, or turn on “Upload a file instead of a link”.';
                            }
                            return true;
                        }),
                }
            ]
        },
        {
            name: 'progress_section',
            type: 'array',
            title: 'Progress numbers',
            group: 'older',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(4),
            description: 'Up to 4 numbers. This block is not shown on the current home page.',
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
            title: 'Projects block',
            type: 'object',
            group: 'projects',
            description: 'The project grid. The first project is the large card. You can add up to 10.',
            fields: [
                smallLabel(),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                localizedString('Description', 'description', 'text'),
                {
                    name: 'projects',
                    title: 'Projects',
                    type: 'array',
                    description: 'Up to 10. The first item is the large card. Drag to reorder.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(10),
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
                                    description: 'Optional. Where the card opens, for example /design/portfolios. Leave empty to open the portfolio page.',
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
            title: 'Staff heading',
            type: 'object',
            group: 'staff',
            description: 'The three lines of the title next to the team. The people are in the Staff members list on this same tab.',
            fields: [
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                localizedString('Headline line 3', 'line_3'),
            ],
        },
        {
            name: 'certificates_section',
            title: 'Certificates block',
            type: 'object',
            group: 'certificates',
            description: 'The title and the certificate pictures after the staff block. Add up to 10 pictures.',
            fields: [
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                localizedString('Headline line 3', 'line_3'),
                {
                    name: 'images',
                    title: 'Certificates',
                    type: 'array',
                    description: 'Up to 10 pictures, in this order. If this list is empty, the two pictures below are shown instead.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(10),
                    of: [
                        {
                            name: 'certificateImage',
                            type: 'object',
                            fields: [
                                {
                                    name: 'image',
                                    title: 'Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                                },
                            ],
                            preview: {
                                select: { media: 'image', title: 'image.alt' },
                                prepare(selection: { title?: string; media?: unknown }) {
                                    return { title: selection.title || 'Certificate', media: selection.media };
                                },
                            },
                        },
                    ],
                },
                {
                    name: 'certificate',
                    title: 'Certificate picture',
                    description: 'Used only when the list above is empty.',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                },
                {
                    name: 'diploma',
                    title: 'Diploma picture',
                    description: 'Used only when the list above is empty.',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                },
            ],
        },
        {
            name: 'workers',
            type: 'array',
            title: 'Staff members',
            group: 'staff',
            description: 'The people in the staff slider. Drag to change who appears first.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'Full name',
                            name: 'worker',
                            type: 'object',
                            description: 'First and last name, in each language.',
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
                            title: 'Role',
                            name: 'profession',
                            type: 'object',
                            description: 'The job title under the name, in each language.',
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
                            title: 'Portrait',
                            description: 'Used for the large photo and the round photo on the card.',
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
                        localizedString('Experience', 'experience', 'string', 'Short line on the card, for example 15+ YEAR.'),
                        localizedString('Bio', 'bio', 'text', 'The paragraph on the profile card.'),
                        {
                            name: 'programs',
                            title: 'Programs',
                            description: 'Small tags on the card, such as AutoCAD or Interior Design.',
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
                            description: 'A second row of tags, such as Modeling or Planning.',
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
                            title: 'Behance link',
                            description: 'Optional link to this person’s Behance profile.',
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
            title: 'Voices block',
            type: 'object',
            group: 'voices',
            description: 'Student quotes near the bottom of the page. Add 3 to 6 quotes.',
            fields: [
                smallLabel(),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                {
                    name: 'items',
                    title: 'Quotes',
                    type: 'array',
                    description: 'From 3 to 6. Each quote needs a name, a role, the words, and a portrait.',
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
                                    title: 'Stars',
                                    type: 'number',
                                    description: 'From 1 to 5.',
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
            title: 'Client names',
            group: 'clients',
            type: 'array',
            description: 'The names that scroll above the footer. The name is what visitors see. A logo is kept for reference.',
            of: [
                {
                    name: 'client',
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name on the page',
                            type: 'string',
                            description: 'Shown in the scrolling line, for example ART HOUSE.',
                        },
                        {
                            name: 'logo',
                            title: 'Logo',
                            description: 'Required by the form. The scrolling line uses the name, and the logo text if the name is empty.',
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
        {
            ...blogSectionFields,
            group: 'blog',
            title: 'Blog heading',
            description: 'The title above the news cards. The articles themselves are edited under Blog posts. The home page shows up to four.',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Home page',
                subtitle: 'Design Studio · Գլխավոր',
            };
        },
    }
};

export default aboutUsSchemaDesign;