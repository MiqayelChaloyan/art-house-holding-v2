import { SparklesIcon } from '@sanity/icons';

export const portfolioSchemaDesign = {
    name: 'portfolio-design',
    type: 'document',
    title: 'Portfolio',
    id: 'portfolio-design',
    icon: SparklesIcon,
    fields: [
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
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Պորտֆոլիո',
            };
        },
    }
};

export default portfolioSchemaDesign;