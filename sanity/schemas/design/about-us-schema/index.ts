import { ClipboardIcon, HomeIcon, UserIcon } from '@sanity/icons';

import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';
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
    description: 'Design Studio landing page — banner, studio, courses, staff, projects, and the partners slider.',
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
        { name: 'clients', title: '10. Partners' },
        { name: 'og', title: 'Social share' },
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
                localizedString('Courses button', 'explore_label', 'string', 'The red button under the paragraph.'),
                localizedString('Portfolio button', 'portfolio_label', 'string', 'The outline button next to it.'),
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
            description: 'The title above the course cards on Home and on the Courses page. The course page headings below are used on every course.',
            fields: [
                smallLabel(),
                localizedString('Headline line 1', 'line_1'),
                localizedString('Headline line 2 (italic)', 'line_2'),
                localizedString('Courses page eyebrow', 'page_eyebrow', 'string', 'The Courses list page, for example Courses · Six Programs. If empty, the home eyebrow is used.'),
                localizedString('Courses page line 1', 'page_line_1', 'string', 'First line of the Courses list title.'),
                localizedString('Courses page line 2 (italic)', 'page_line_2', 'string', 'Second line of the Courses list title.'),
                localizedString('Course page eyebrow', 'detail_eyebrow', 'string', 'Small line above the course name, for example Course.'),
                localizedString('Course page italic', 'detail_emphasis', 'string', 'Italic line under the course name on the course page and in its About block, for example courses.'),
                localizedString('Courses button', 'explore_label', 'string', 'Button on the course page.'),
                localizedString('Portfolio button', 'portfolio_label', 'string', 'Second button on the course page.'),
                localizedString('About block eyebrow', 'about_eyebrow'),
                localizedString('Curriculum eyebrow', 'curriculum_eyebrow', 'string', 'Small line above Course topics, for example Curriculum.'),
                localizedString('Curriculum modules label', 'curriculum_modules_label', 'string', 'Word after the topic count, for example modules. Shown as Curriculum · 7 modules.'),
                localizedString('Curriculum title', 'curriculum_title', 'string', 'For example Course.'),
                localizedString('Curriculum italic', 'curriculum_emphasis', 'string', 'Italic second word, for example topics.'),
                localizedString('Curriculum text', 'curriculum_description', 'text', 'Short paragraph to the right of the Course topics title.'),
                localizedString('Trainers eyebrow', 'trainers_eyebrow', 'string', 'Small line above the Trainers title. The title is the course name.'),
                localizedString('Trainers italic', 'trainers_emphasis', 'string', 'Italic line under the course name in the Trainers block, for example trainers.'),
            ],
        },
        {
            name: 'why_section',
            title: 'Reasons block',
            type: 'object',
            group: 'reasons',
            description: 'The grid after the courses. Add up to 30 reasons. They wrap three across. The small label and headline come from locale files (why-section in locales/), not Sanity.',
            fields: [
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
            name: 'projects_section',
            title: 'Projects block',
            type: 'object',
            group: 'projects',
            description: 'The project grid. Section title lines are in locales/projects-section. The first project is the large card. You can add up to 10.',
            fields: [
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
            name: 'certificates_section',
            title: 'Certificates block',
            type: 'object',
            group: 'certificates',
            description: 'Certificate pictures after the staff block. Title lines are in locales/certificates-section. Add up to 10 pictures.',
            fields: [
                {
                    name: 'images',
                    title: 'Certificate pictures',
                    type: 'array',
                    description: 'Add the diploma, the certificate, and any other pictures here. Maximum 10, in this order.',
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
            ],
        },
        {
            name: 'workers',
            type: 'array',
            title: 'Staff members',
            group: 'staff',
            description: 'The people in the staff slider. Drag to change who appears first. Section title lines and default labels are in locales/staff-section.json keys.',
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
                            description: 'Full Behance profile URL (https://…). When set, a clickable Behance icon appears next to the person’s name on the site.',
                            type: 'url',
                            validation: (Rule: RuleType) => Rule.uri({
                                scheme: ['http', 'https'],
                            }),
                        },
                        {
                            name: 'courses',
                            title: 'Teaches',
                            description: 'The courses whose page shows this person in the Trainers block.',
                            type: 'array',
                            of: [{ type: 'reference', to: [{ type: 'courses-design' }], options: { disableNew: true } }],
                            validation: (Rule: RuleType) => Rule.unique(),
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
            name: 'blog_section',
            type: 'object',
            title: 'Blog block',
            group: 'blog',
            description: 'Four existing Design Studio posts for the home page. Heading lines are in locales/design-blog-section. Pick posts from the list. Do not create new posts here.',
            fields: [
                {
                    name: 'posts',
                    title: 'Posts on the home page',
                    type: 'array',
                    description: 'Choose up to 4 existing blog posts. The first is the large card. Drag to change the order. New posts are added under Blog posts, not here.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(4),
                    of: [
                        {
                            type: 'reference',
                            to: [{ type: 'design-blog-post' }],
                            options: { disableNew: true },
                        },
                    ],
                },
            ],
        },
        {
            name: 'voices_section',
            title: 'Voices block',
            type: 'object',
            group: 'voices',
            description: 'Student quotes near the bottom of the page. Title lines are in locales/voices-section. Add 3 to 30 quotes.',
            fields: [
                {
                    name: 'items',
                    title: 'Quotes',
                    type: 'array',
                    description: 'From 3 to 30. Each quote needs a name, a role, the words, and a portrait.',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.required().min(3).max(30),
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
            title: 'Partner names',
            group: 'clients',
            type: 'array',
            description: 'Only the names that slide above the footer. Add each one in Armenian, English, and Russian.',
            of: [
                {
                    name: 'client',
                    type: 'object',
                    fields: [
                        localizedString('Name', 'name'),
                    ],
                    preview: {
                        select: { title: 'name.en', fallback: 'name' },
                        prepare(selection: { title?: string; fallback?: string | { en?: string } }) {
                            const fallback = typeof selection.fallback === 'string'
                                ? selection.fallback
                                : selection.fallback?.en;
                            return { title: selection.title || fallback || 'Partner' };
                        },
                    },
                },
            ],
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