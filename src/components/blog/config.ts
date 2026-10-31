import { ArianAMU, Arial, Calibri, InstrumentSerif, Inter } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';


export type BlogSiteKey = 'educational' | 'design' | 'language';

export interface BlogSiteConfig {
    key: BlogSiteKey;
    documentType: string;
    blogHome: string;
    siteHome: string;
    sectionId: string;
    titleFont: { className: string };
    bodyFont: { className: string };
    heroEyebrowKey?: string;
};

export const BLOG_SITE_CONFIG: Record<BlogSiteKey, BlogSiteConfig> = {
    educational: {
        key: 'educational',
        documentType: 'educational-center-blog-post',
        blogHome: Pages.EDUCATIONAL_BLOG_HOME,
        siteHome: Pages.EDUCATIONAL_HOME,
        sectionId: 'blog',
        titleFont: ArianAMU,
        bodyFont: Inter,
        heroEyebrowKey: 'rating-title',
    },
    design: {
        key: 'design',
        documentType: 'design-blog-post',
        blogHome: Pages.DESIGN_BLOG_HOME,
        siteHome: Pages.DESIGN_HOME,
        sectionId: 'blog',
        titleFont: InstrumentSerif,
        bodyFont: Inter,
        heroEyebrowKey: 'design-studio-title',
    },
    language: {
        key: 'language',
        documentType: 'language-blog-post',
        blogHome: Pages.LANGUAGE_BLOG_HOME,
        siteHome: Pages.LANGUAGE_HOME,
        sectionId: 'blog',
        titleFont: Arial,
        bodyFont: Calibri,
        heroEyebrowKey: 'language-center-title',
    },
};
