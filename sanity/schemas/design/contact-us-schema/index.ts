import { LinkIcon } from '@sanity/icons';
import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';

const contactUsSchemaDesign = {
    name: 'design-contact-us',
    type: 'document',
    title: 'Contact',
    description: 'Design Studio address, hours, phones, and social links.',
    icon: LinkIcon,
    id: 'contact-us-design',
    groups: [
        { name: 'contact', title: '1. Contact', default: true },
        { name: 'social', title: '2. Social' },
    ],
    fields: [
        {
            title: 'Country, Region/City, Street',
            name: 'address',
            type: 'object',
            group: 'contact',
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
            name: 'email',
            title: 'Email',
            type: 'string',
            group: 'contact',
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            title: 'Working hours',
            name: 'hours',
            type: 'localeString',
            group: 'contact',
        },
        {
            title: 'Phone Numbers',
            name: 'phone_numbers',
            type: 'array',
            group: 'contact',
            of: [{ type: 'string' }],
            description: 'You can only add two phone number',
            validation: (Rule: RuleType | any) => Rule.max(2).unique(),
            components: { input: ArrayMaxItems },
        },
        {
            name: 'social_links',
            type: 'array',
            title: 'Social Links',
            group: 'social',
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
                title: 'Contact',
                subtitle: 'Design Studio · Կապ մեզ հետ',
            };
        },
    }
};

export default contactUsSchemaDesign;
