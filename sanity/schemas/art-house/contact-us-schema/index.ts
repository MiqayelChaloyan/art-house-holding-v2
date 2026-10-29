import { LinkIcon } from '@sanity/icons';
import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';

const contactUsSchemaArtHouse = {
    name: 'art-house-contact-us',
    type: 'document',
    title: 'Contact Us',
    id: 'art-house-contact-us',
    fields: [
        {
            title: 'Country, Region/City, Street',
            name: 'address',
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
            title: 'Phone Numbers',
            name: 'phone_numbers',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'You can only add six phone number.',
            validation: (Rule: RuleType) => Rule.max(6).unique(),
            components: { input: ArrayMaxItems },
        },
        {
            name: 'social_links',
            type: 'array',
            title: 'Social Links',
            description: 'You can only add these Facebook, Instagram, Gmail, Linkedin, X, Tiktok, Telegram, YouTube, Pinterest, WhatsApp, Viber.',
            validation: (Rule: RuleType) => Rule.max(11).unique(),
            components: { input: ArrayMaxItems },
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: LinkIcon,
                    validation: (Rule: RuleType) => Rule.required(),
                    fields: [
                        {
                            name: 'social_name',
                            title: 'Social Name',
                            type: 'string',
                        },
                        {
                            name: 'social_link',
                            title: 'Social Link',
                            type: 'string',
                        },
                    ]
                }
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Կապ մեզ հետ',
            };
        },
    }
};

export default contactUsSchemaArtHouse;