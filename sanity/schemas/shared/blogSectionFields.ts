const localizedStringFields = [
    {
        title: 'Armenian',
        name: 'am',
        type: 'string',
    },
    {
        title: 'English',
        name: 'en',
        type: 'string',
    },
    {
        title: 'Russian',
        name: 'ru',
        type: 'string',
    },
];

export const blogSectionFields = {
    name: 'blog_section',
    type: 'object',
    title: 'Blog Section',
    fields: [
        {
            title: 'Section Title',
            name: 'section_title',
            type: 'object',
            fields: localizedStringFields,
        },
        {
            title: 'Section Subtitle',
            name: 'section_subtitle',
            type: 'object',
            fields: localizedStringFields,
        },
    ],
};
