import { SparklesIcon, BulbOutlineIcon, CheckmarkIcon, ImagesIcon, ClipboardImageIcon, UserIcon } from '@sanity/icons';
import { RuleType } from '@/sanity/ruleType';
import { slugFromParent } from '@/sanity/schemas/shared/slugSource';

const loc = (title: string, name: string, type: 'string' | 'text' = 'string', description?: string) => ({
    title,
    name,
    type: type === 'text' ? 'localeText' : 'localeString',
    ...(description ? { description } : {}),
});

const headingFields = [
    loc('Eyebrow', 'eyebrow', 'string', 'Small line above the title.'),
    loc('Headline line 1', 'line_1'),
    loc('Headline line 2 (italic)', 'line_2'),
];

export const coursesSchemaDesign = {
    name: 'courses-design',
    type: 'document',
    title: 'Design course',
    description: 'A course page for the Design Studio, including portfolios and orders.',
    id: 'courses-design',
    icon: SparklesIcon,
    groups: [
        { name: 'card', title: '1. Course card' },
        { name: 'about', title: '2. About the course' },
        { name: 'topics', title: '3. Course topics' },
        { name: 'trainers', title: '4. Trainers' },
        { name: 'price', title: '5. Price list' },
        { name: 'why', title: '6. Why this course' },
        { name: 'groups', title: '7. Upcoming groups' },
        { name: 'faq', title: '8. FAQ' },
        { name: 'portfolio', title: 'Portfolios' },
        { name: 'orders', title: 'Orders' },
        { name: 'og', title: 'Social share' },
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
            title: 'Intro',
            name: 'intro',
            type: 'object',
            description: 'The paragraph under the course name on the course page, in each language.',
            fields: [
                { title: 'Հայերեն', name: 'am', type: 'text' },
                { title: 'English', name: 'en', type: 'text' },
                { title: 'Русский', name: 'ru', type: 'text' },
            ],
        },
        { ...loc('Duration', 'duration', 'string', 'Shown on the course card, for example 6 months.'), group: 'card' },
        { ...loc('Level', 'level', 'string', 'Shown next to the duration, for example Beginner.'), group: 'card' },
        { ...loc('Card text', 'card_description', 'text', 'Short text under the course name on the Courses page.'), group: 'card' },
        {
            name: 'card_image',
            title: 'Card image',
            type: 'image',
            group: 'card',
            description: 'The picture on the Courses page card. If empty, the first gallery picture is used.',
            options: { hotspot: true },
            fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
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
            name: 'about_section',
            title: 'About the course',
            type: 'object',
            group: 'about',
            description: 'The block next to the second gallery picture. The title is the course name.',
            fields: [
                loc('Text', 'text', 'text', 'The paragraph under the title.'),
                {
                    name: 'points',
                    title: 'Points',
                    type: 'array',
                    description: 'Up to 4, for example What you’ll learn, Who it’s for, Skills you’ll gain, Career opportunities. If empty, the first four Guides are shown.',
                    validation: (Rule: RuleType) => Rule.max(4),
                    of: [{
                        name: 'point',
                        type: 'object',
                        fields: [
                            loc('Title', 'title'),
                            loc('Text', 'text', 'text'),
                        ],
                        preview: { select: { title: 'title.en', subtitle: 'text.en' } },
                    }],
                },
            ],
        },
        {
            name: 'topics_section',
            title: 'Course topics heading',
            type: 'object',
            group: 'topics',
            description: 'The heading above the topics list on this course page. If empty, Home → Courses curriculum fields are used.',
            fields: [
                loc('Eyebrow', 'eyebrow', 'string', 'Small line above the title, for example Curriculum.'),
                loc('Modules label', 'modules_label', 'string', 'Word after the topic count, for example modules. Shown as Curriculum · 7 modules.'),
                loc('Headline line 1', 'title', 'string', 'For example Course.'),
                loc('Headline italic', 'emphasis', 'string', 'Italic second word, for example topics.'),
                loc('Text', 'description', 'text', 'Short paragraph to the right of the title.'),
            ],
        },
        {
            name: 'topics',
            title: 'Course topics',
            type: 'array',
            group: 'topics',
            description: 'Each row is a module. Clicking + on the course page opens the topic text.',
            of: [{
                name: 'topic',
                type: 'object',
                fields: [
                    loc('Title', 'title', 'string', 'The row label, for example Typography.'),
                    loc('Opened text', 'description', 'text', 'The text shown when + is clicked.'),
                ],
                preview: { select: { title: 'title.en', subtitle: 'description.en' } },
            }],
        },
        {
            name: 'conditions',
            type: 'array',
            title: 'Conditions',
            group: 'topics',
            description: 'Optional fallback. Used as Course topics when the list above is empty. Prefer Course topics for new content.',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BulbOutlineIcon,
                    fields: [
                        {
                            title: 'Հայերեն',
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
                            title: 'Русский',
                            name: 'ru',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        loc('Opened text', 'description', 'text', 'Shown when + is clicked. Prefer Course topics above for new rows.'),
                    ],
                    preview: { select: { title: 'en', subtitle: 'description.en' } },
                }
            ],
        },
        {
            name: 'guides',
            type: 'array',
            title: 'Guides',
            group: 'about',
            description: 'Optional. The first four are shown in About the course when its points are empty.',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: CheckmarkIcon,
                    fields: [
                        {
                            title: 'Հայերեն',
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
                            title: 'Русский',
                            name: 'ru',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        }
                    ]
                }
            ],
        },
        {
            name: 'trainers_section',
            title: 'Trainers',
            type: 'object',
            group: 'trainers',
            description: 'The trainers block on this course page. If empty, the Design home staff is shown.',
            fields: [
                loc('Eyebrow', 'eyebrow', 'string', 'Small line above the title, for example Trainers.'),
                loc('Headline italic', 'emphasis', 'string', 'Italic line under the course name, for example trainers.'),
                loc('Experience label', 'experience_label'),
                loc('Programs label', 'programs_label'),
                loc('Skills label', 'skills_label'),
                {
                    name: 'items',
                    title: 'Trainers',
                    type: 'array',
                    of: [{
                        name: 'trainer',
                        type: 'object',
                        icon: UserIcon,
                        fields: [
                            loc('Full name', 'worker'),
                            loc('Role', 'profession'),
                            {
                                name: 'worker_image',
                                title: 'Portrait',
                                type: 'image',
                                options: { hotspot: true },
                                fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
                            },
                            loc('Experience', 'experience', 'string', 'Short line on the card, for example 5+ YEAR.'),
                            loc('Bio', 'bio', 'text', 'The paragraph on the profile card.'),
                            {
                                name: 'programs',
                                title: 'Programs',
                                type: 'array',
                                of: [{
                                    name: 'program',
                                    type: 'object',
                                    fields: [loc('Label', 'label')],
                                    preview: { select: { title: 'label.en' } },
                                }],
                            },
                            {
                                name: 'skills',
                                title: 'Skills',
                                type: 'array',
                                of: [{
                                    name: 'skill',
                                    type: 'object',
                                    fields: [loc('Label', 'label')],
                                    preview: { select: { title: 'label.en' } },
                                }],
                            },
                            {
                                name: 'behance_url',
                                title: 'Behance link',
                                type: 'url',
                            },
                        ],
                        preview: {
                            select: { title: 'worker.en', subtitle: 'profession.en', media: 'worker_image' },
                        },
                    }],
                },
            ],
        },
        {
            name: 'price_section',
            title: 'Price list',
            type: 'object',
            group: 'price',
            description: 'The price rows on this course page. Each course has its own list.',
            fields: [
                ...headingFields,
                {
                    name: 'items',
                    title: 'Prices',
                    type: 'array',
                    description: 'Usually two cards: group and individual.',
                    validation: (Rule: RuleType) => Rule.max(4),
                    of: [{
                        type: 'object',
                        fields: [
                            loc('Title', 'title'),
                            loc('Subtitle', 'subtitle', 'string', 'Short line under the title, for example Online/Offline.'),
                            loc('Duration', 'duration', 'string', 'For example 4 months.'),
                            loc('Amount', 'amount', 'string', 'For example 180 000 AMD.'),
                        ],
                        preview: {
                            select: { title: 'title.en', subtitle: 'amount.en' },
                        },
                    }],
                },
            ],
        },
        {
            name: 'why_section',
            title: 'Why this course',
            type: 'object',
            group: 'why',
            description: 'The six requirement cards under Why This Course.',
            fields: [
                ...headingFields,
                {
                    name: 'items',
                    title: 'Requirements',
                    type: 'array',
                    description: 'Up to 6. Shown in a 3-column grid.',
                    validation: (Rule: RuleType) => Rule.max(6),
                    of: [{
                        type: 'object',
                        fields: [
                            loc('Title', 'title'),
                            loc('Description', 'description', 'text'),
                        ],
                        preview: {
                            select: { title: 'title.en' },
                        },
                    }],
                },
            ],
        },
        {
            name: 'groups_section',
            title: 'Upcoming groups',
            type: 'object',
            group: 'groups',
            description: 'The group cards with start date, schedule, time, duration, and price.',
            fields: [
                ...headingFields,
                loc('Enroll button', 'enroll_label', 'string', 'The button on each group card.'),
                loc('All filter', 'filter_all', 'string', 'The first filter chip.'),
                loc('Start date label', 'start_date_label'),
                loc('Schedule label', 'schedule_label'),
                loc('Time label', 'time_label'),
                loc('Duration label', 'duration_label'),
                loc('Price label', 'price_label'),
                {
                    name: 'groups',
                    title: 'Groups',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            {
                                name: 'mode',
                                title: 'Filter',
                                type: 'string',
                                options: {
                                    list: [
                                        { title: 'Morning', value: 'morning' },
                                        { title: 'Evening', value: 'evening' },
                                        { title: 'Online', value: 'online' },
                                        { title: 'Offline', value: 'offline' },
                                    ],
                                    layout: 'radio',
                                },
                            },
                            loc('Badge', 'shift', 'string', 'Shown on the card, for example Evening.'),
                            loc('Start date', 'start_date'),
                            loc('Schedule', 'schedule', 'string', 'For example Mon · Wed · Fri.'),
                            loc('Time', 'time', 'string', 'For example 18:00.'),
                            loc('Duration', 'duration', 'string', 'For example 3 months.'),
                            loc('Price', 'price'),
                        ],
                        preview: {
                            select: { title: 'shift.en', subtitle: 'start_date.en' },
                        },
                    }],
                },
            ],
        },
        {
            name: 'faq_section',
            title: 'FAQ',
            type: 'object',
            group: 'faq',
            description: 'The numbered questions at the bottom of the About Course page.',
            fields: [
                ...headingFields,
                {
                    name: 'items',
                    title: 'Questions',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            loc('Question', 'question'),
                            loc('Answer', 'answer', 'text'),
                        ],
                        preview: {
                            select: { title: 'question.en' },
                        },
                    }],
                },
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
                                    title: 'Հայերեն',
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
                                    title: 'Русский',
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
                                source: slugFromParent('author.en'),
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
                                                    title: 'Հայերեն',
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
                                                    title: 'Русский',
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
                                    title: 'Հայերեն',
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
                                    title: 'Русский',
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
                                source: slugFromParent('author.en'),
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
                                                    title: 'Հայերեն',
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
                                                    title: 'Русский',
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
    preview: {
        select: {
            title: 'course_name.en',
        },
        prepare(selection: { title?: string }) {
            return {
                title: selection.title || 'Design course',
                subtitle: 'Design Studio',
            };
        },
    },
};

export default coursesSchemaDesign;