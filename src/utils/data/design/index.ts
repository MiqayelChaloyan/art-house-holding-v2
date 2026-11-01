import { cache } from 'react';

import { ABOUT_US_DETAILS_QUERY, COURSE_ID_QUERY, COURSE_SLUG_QUERY, COURSES_QUERY, LESSONS_QUERY, PORTFOLIO_QUERY, PRICE_LIST_QUERY, SOCIAL_QUERY, BLOG_POSTS_QUERY, BLOG_SLUG_QUERY, BLOG_SIMILAR_POSTS_QUERY, LEGAL_PAGE_QUERY, ABOUT_PAGE_QUERY } from '@/sanity/services/design-service';

import { sanityFetch } from '@/src/api/sanity-fetch';
import { createBlogFetchers } from '@/src/utils/data/blog/fetchers';


const blogFetchers = createBlogFetchers({
    posts: BLOG_POSTS_QUERY,
    slug: BLOG_SLUG_QUERY,
    similar: BLOG_SIMILAR_POSTS_QUERY,
    tag: 'design-blog',
});

export const getBlogPosts = blogFetchers.getBlogPosts;
export const getBlogPost = blogFetchers.getBlogPost;
export const getSimilarBlogPosts = blogFetchers.getSimilarBlogPosts;


export const getHomeDetails = cache(async (locale: string): Promise<HOME_DETALIS_DESIGN_QUERYResult> => {
    const result = await sanityFetch<HOME_DETALIS_DESIGN_QUERYResult[]>({
        query: ABOUT_US_DETAILS_QUERY,
        params: { language: locale },
        tags: ['design-home'],
    });

    return result[0];
});

export const getCourses = cache(async (locale: string): Promise<COURSES_DESIGN_QUERYResult[]> => {
    const result = await sanityFetch<COURSES_DESIGN_QUERYResult[]>({
        query: COURSES_QUERY,
        params: { language: locale },
        tags: ['design-courses'],
    });

    return result;
});

export async function getCourseBySlug(locale: string, slug: string): Promise<COURSES_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_DESIGN_QUERYResult[]>({
            query: COURSE_SLUG_QUERY,
            params: { language: locale, slug },
            tags: ['design-courses'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourseById(locale: string, slug: string): Promise<COURSES_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_DESIGN_QUERYResult[]>({
            query: COURSE_ID_QUERY,
            params: { language: locale, slug },
            tags: ['design-courses'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export const getSelectOptions = cache(async (locale: string): Promise<SELECT_OPTIONS_DESIGN_QUERYResult> => {
    const result = await sanityFetch<SELECT_OPTIONS_DESIGN_QUERYResult[]>({
        query: LESSONS_QUERY,
        params: { language: locale },
        tags: ['design-lessons'],
    });

    return result[0];
});

export const getAboutPage = cache(async (locale: string): Promise<ABOUT_PAGE_DESIGN_QUERYResult | null> => {
    const result = await sanityFetch<ABOUT_PAGE_DESIGN_QUERYResult | null>({
        query: ABOUT_PAGE_QUERY,
        params: { language: locale },
        tags: ['design-about'],
    });

    return result;
});

export const getLegalPage = cache(async (locale: string, page: LEGAL_PAGE_SLUG): Promise<LEGAL_PAGE_DESIGN_QUERYResult | null> => {
    const result = await sanityFetch<LEGAL_PAGE_DESIGN_QUERYResult | null>({
        query: LEGAL_PAGE_QUERY,
        params: { language: locale, page },
        tags: ['design-legal'],
    });

    return result;
});

export const getContacts = cache(async (locale: string): Promise<CONTACT_US_DESIGN_QUERYResult> => {
    const result = await sanityFetch<CONTACT_US_DESIGN_QUERYResult[]>({
        query: SOCIAL_QUERY,
        params: { language: locale },
        tags: ['design-contacts'],
    });

    return result[0];
});

export async function getPriceList(locale: string): Promise<PRICE_LIST_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<PRICE_LIST_DESIGN_QUERYResult[]>({
            query: PRICE_LIST_QUERY,
            params: { language: locale },
            tags: ['design-home', 'design-courses'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export const getPortfolioPage = cache(async (locale: string): Promise<PORTFOLIO_PAGE_DESIGN_QUERYResult | null> => {
    const result = await sanityFetch<PORTFOLIO_PAGE_DESIGN_QUERYResult | null>({
        query: PORTFOLIO_QUERY,
        params: { language: locale },
        tags: ['design-portfolios'],
    });

    return result;
});