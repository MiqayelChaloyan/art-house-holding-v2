import { UserIcon } from '@sanity/icons';
import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';

const feedbackLengthWarning = 'This feedback is much longer than the others and will stretch the testimonial card. You can still publish it.';

export const aboutUsSchemaArtHouse = {
    name: 'art-house-about-us',
    type: 'document',
    title: 'Home',
    id: 'art-house-about-us',
    fields: [
        {
            title: 'About Us',
            name: 'about_us_section',
            type: 'object',
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
                    title: 'Image',
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
            ]
        },
        {
            name: 'our_rating',
            type: 'array',
            title: 'Our Rating Section (max 70)',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.min(2).max(70),
            description: 'No less than 2, and no more than 70.',
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
                            title: 'User Feedback',
                            name: 'user_feedback',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            description: 'Recommended length: 150-300 characters, so every testimonial card stays the same size.',
                            fields: [
                                {
                                    title: 'Armenian',
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
                                    title: 'Russian',
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
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
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
                title: 'Մեր մասին',
            };
        },
    }
};

export default aboutUsSchemaArtHouse;