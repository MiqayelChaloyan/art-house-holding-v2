import { SparklesIcon } from '@sanity/icons';

export const portfolioSchemaDesign = {
    name: 'portfolio-design',
    type: 'document',
    title: 'Portfolios',
    description: 'Shared portfolio images for the Design Studio.',
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
                title: 'Portfolios',
                subtitle: 'Design Studio · Պորտֆոլիո',
            };
        },
    }
};

export default portfolioSchemaDesign;