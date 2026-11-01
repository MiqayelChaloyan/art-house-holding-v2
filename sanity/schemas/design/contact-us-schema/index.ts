import { LinkIcon } from '@sanity/icons';
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

const contactUsSchemaDesign = {
    name: 'design-contact-us',
    type: 'document',
    title: 'Contact',
    description: 'Design Studio contact page, header, and footer — address, phones, logo, and social links.',
    icon: LinkIcon,
    id: 'contact-us-design',
    groups: [
        { name: 'page', title: '1. Contact page', default: true },
        { name: 'contact', title: '2. Details' },
        { name: 'brand', title: '3. Header and footer' },
        { name: 'social', title: '4. Social' },
    ],
    fields: [
        { ...localizedString('Eyebrow', 'eyebrow', 'string', 'Small line above the title.'), group: 'page' },
        { ...localizedString('Headline line 1', 'line_1'), group: 'page' },
        { ...localizedString('Headline line 2 (italic)', 'line_2'), group: 'page' },
        { ...localizedString('Form title', 'form_title', 'string', 'The heading above the form, for example Feedback.'), group: 'page' },
        { ...localizedString('Hours', 'hours', 'string', 'Opening hours on the contact page, for example 10:00 – 21:00 Monday–Saturday.'), group: 'contact' },
        {
            title: 'Country, Region/City, Street',
            name: 'address',
            type: 'object',
            group: 'contact',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                { title: 'Հայերեն', name: 'am', type: 'string' },
                { title: 'English', name: 'en', type: 'string' },
                { title: 'Русский', name: 'ru', type: 'string' },
            ],
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            group: 'contact',
            validation: (Rule: RuleType) => Rule.required(),
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
            name: 'logo',
            title: 'Logo',
            type: 'image',
            group: 'brand',
            description: 'Used in the header and the footer.',
            options: { hotspot: true },
            fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
        },
        { ...localizedString('Brand line 1', 'brand_line_1', 'string', 'First line next to the logo, for example ART HOUSE.'), group: 'brand' },
        { ...localizedString('Brand line 2', 'brand_line_2', 'string', 'Second line next to the logo, for example DESIGN STUDIO.'), group: 'brand' },
        { ...localizedString('Footer tagline', 'tagline', 'text', 'The short paragraph under the footer logo.'), group: 'brand' },
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
                    ],
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
                title: 'Contact',
                subtitle: 'Design Studio · Կապ մեզ հետ',
            };
        },
    },
};

export default contactUsSchemaDesign;
