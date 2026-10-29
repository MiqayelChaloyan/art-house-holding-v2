export const blogSectionFields = {
    name: 'blog_section',
    type: 'object',
    title: 'Blog Section',
    description: 'Heading for the home Blog and news block, and the blog listing page.',
    fields: [
        {
            title: 'Eyebrow',
            name: 'eyebrow',
            type: 'localeString',
        },
        {
            title: 'Headline line 1',
            name: 'section_title',
            type: 'localeString',
        },
        {
            title: 'Headline line 2 (italic)',
            name: 'section_subtitle',
            type: 'localeString',
        },
    ],
};
