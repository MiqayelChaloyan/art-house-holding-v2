import { LinkIcon } from '@sanity/icons';
import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';

const contactUsSchemaArtHouse = {
    name: 'art-house-contact-us',
    type: 'document',
    title: 'Contact',
    description: 'Address and phones on the site, plus social links in the footer.',
    icon: LinkIcon,
    id: 'art-house-contact-us',
    fieldsets: [
        {
            name: 'contact',
            title: '1. Contact',
            description: 'Address and phone numbers shown on the site.',
            options: { collapsible: false },
        },
        {
            name: 'social',
            title: '2. Social',
            description: 'Links shown in the footer.',
            options: { collapsible: false },
        },
    ],
    fields: [
        {
            title: 'Address',
            name: 'address',
            type: 'object',
            fieldset: 'contact',
            description: 'Country, city, and street. Write it in each language.',
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
            title: 'Phone numbers',
            name: 'phone_numbers',
            type: 'array',
            fieldset: 'contact',
            of: [{ type: 'string' }],
            description: 'Up to 6 numbers. Each one is shown as a phone link.',
            validation: (Rule: RuleType) => Rule.max(6).unique(),
            components: { input: ArrayMaxItems },
        },
        {
            name: 'social_links',
            type: 'array',
            title: 'Social links',
            fieldset: 'social',
            description: 'Facebook, Instagram, Gmail, LinkedIn, X, TikTok, Telegram, YouTube, Pinterest, WhatsApp, or Viber. Up to 11.',
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
                            title: 'Network',
                            type: 'string',
                        },
                        {
                            name: 'social_link',
                            title: 'URL',
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
                title: 'Contact',
                subtitle: 'Art House Holding · Կապ մեզ հետ',
            };
        },
    }
};

export default contactUsSchemaArtHouse;