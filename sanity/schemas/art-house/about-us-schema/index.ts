import { UserIcon, UsersIcon } from '@sanity/icons';
import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';

const feedbackLengthWarning = 'This feedback is much longer than the others and will stretch the testimonial card. You can still publish it.';

export const aboutUsSchemaArtHouse = {
    name: 'art-house-about-us',
    type: 'document',
    title: 'About',
    description: 'The Art House Holding about page: the story at the top, then the reviews.',
    icon: UsersIcon,
    id: 'art-house-about-us',
    fieldsets: [
        {
            name: 'about',
            title: '1. About',
            description: 'Story and portrait at the top of the page.',
            options: { collapsible: false },
        },
        {
            name: 'ratings',
            title: '2. Ratings',
            description: 'Review cards under the story.',
            options: { collapsible: false },
        },
    ],
    fields: [
        {
            title: 'Story and portrait',
            name: 'about_us_section',
            type: 'object',
            fieldset: 'about',
            description: 'This block sits at the top of the About page.',
            options: { collapsible: false },
            fields: [
                {
                    title: 'Story',
                    name: 'about_us_content',
                    type: 'object',
                    description: 'Write the same story in each language. It appears next to the portrait.',
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
                    title: 'Portrait',
                    name: 'image',
                    type: 'image',
                    description: 'The photo shown beside the story.',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternative text',
                            type: 'string',
                            description: 'Short description of the photo for accessibility.',
                        }
                    ]
                },
            ]
        },
        {
            name: 'our_rating',
            type: 'array',
            title: 'Reviews',
            fieldset: 'ratings',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.min(2).max(70),
            description: 'Each item is one review card. Add at least 2, at most 70.',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    title: 'Review',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'Name',
                            name: 'user_name',
                            type: 'object',
                            description: 'The name shown on the review card.',
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
                            name: 'user_image',
                            title: 'Photo',
                            type: 'image',
                            description: 'The person on the review card.',
                            options: { hotspot: true },
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            title: 'Quote',
                            name: 'user_feedback',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            description: 'Keep this around 150–300 characters so the cards stay the same size.',
                            fields: [
                                {
                                    title: 'Հայերեն',
                                    name: 'am',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.max(350).warning(feedbackLengthWarning),
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.max(350).warning(feedbackLengthWarning),
                                },
                                {
                                    title: 'Русский',
                                    name: 'ru',
                                    type: 'string',
                                    validation: (Rule: RuleType) => Rule.max(350).warning(feedbackLengthWarning),
                                }
                            ]
                        },
                    ],
                    preview: {
                        select: {
                            title: 'user_name.en',
                            armenian: 'user_name.am',
                            russian: 'user_name.ru',
                            media: 'user_image',
                        },
                        prepare(selection: { title?: string; armenian?: string; russian?: string; media?: unknown }) {
                            return {
                                title: selection.title || selection.armenian || selection.russian || 'Review',
                                subtitle: 'About page review',
                                media: selection.media,
                            };
                        },
                    }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'About',
                subtitle: 'Art House Holding · Մեր մասին',
            };
        },
    }
};

export default aboutUsSchemaArtHouse;
