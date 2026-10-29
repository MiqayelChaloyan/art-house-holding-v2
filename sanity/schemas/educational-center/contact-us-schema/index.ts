import { LinkIcon } from '@sanity/icons';
import ArrayMaxItems from '@/src/helpers/ArrayMaxItems';
import { RuleType } from '@/sanity/ruleType';

const contactUsSchemaEducationalCenter = {
    name: 'educational-center-contact-us',
    type: 'document',
    title: 'Contact Us',
    id: 'contact-us-educational-center',
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
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule: RuleType) => Rule.required(),
        },  
        {
            name: 'phone_number',
            title: 'Phone Number',
            type: 'string',
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            name: 'social_links',
            type: 'array',
            title: 'Social Links',
            description: `
                        You can only add these Facebook, Instagram, Gmail, Linkedin, X, Tiktok, Telegram, YouTube, Pinterest, WhatsApp, Viber.
                        It would be advisable to choose any three of the above, no more.
                        `,
            validation: (Rule: RuleType) => Rule.max(4),
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

export default contactUsSchemaEducationalCenter;
