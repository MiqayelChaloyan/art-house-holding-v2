import { cache } from 'react';

import { ABOUT_US_DETAILS_QUERY, COURSES_QUERY, DISCOUNTS_QUERY, FILTER_COURSES_QUERY, LANGUAGE_ID_QUERY, LANGUAGE_SLUG_QUERY, LANGUAGES_QUERY, PRICE_LIST_QUERY, QUIZ_SLUG_QUERY, QUIZS_QUERY, SOCIAL_QUERY, BLOG_POSTS_QUERY, BLOG_SLUG_QUERY, BLOG_SIMILAR_POSTS_QUERY } from '@/sanity/services/language-service';

import { sanityFetch } from '@/src/api/sanity-fetch';
import { createBlogFetchers } from '@/src/utils/data/blog/fetchers';


const blogFetchers = createBlogFetchers({
    posts: BLOG_POSTS_QUERY,
    slug: BLOG_SLUG_QUERY,
    similar: BLOG_SIMILAR_POSTS_QUERY,
    tag: 'language-blog',
});

export const getBlogPosts = blogFetchers.getBlogPosts;
export const getBlogPost = blogFetchers.getBlogPost;
export const getSimilarBlogPosts = blogFetchers.getSimilarBlogPosts;

export const getHomeDetails = cache(async (locale: string): Promise<HOME_DETALIS_LANGUAGE_QUERYResult> => {
    const result = await sanityFetch<HOME_DETALIS_LANGUAGE_QUERYResult[]>({
        query: ABOUT_US_DETAILS_QUERY,
        params: { language: locale },
        tags: ['language-home'],
    });

    return result[0];
});

export async function getDiscounts(locale: string): Promise<DISCOUNTS_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<DISCOUNTS_QUERYResult[]>({
            query: DISCOUNTS_QUERY,
            params: { language: locale },
            tags: ['language-home'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourses(locale: string): Promise<LANGUAGE[]> {
    try {
        "use server";
        const result = await sanityFetch<LANGUAGE[]>({
            query: LANGUAGES_QUERY,
            params: { language: locale },
            tags: ['language-courses'],
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export async function getCourseBySlug(locale: string, slug: string): Promise<LANGUAGE> {
    try {
        "use server";
        const result = await sanityFetch<LANGUAGE[]>({
            query: LANGUAGE_SLUG_QUERY,
            params: { language: locale, slug },
            tags: ['language-courses'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourseById(locale: string, slug: string): Promise<ABOUT_LANGUAGE_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<ABOUT_LANGUAGE_QUERYResult[]>({
            query: LANGUAGE_ID_QUERY,
            params: { language: locale, slug },
            tags: ['language-courses'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export const getSelectOptions = cache(async (locale: string): Promise<COURSES> => {
    const result = await sanityFetch<COURSES[]>({
        query: COURSES_QUERY,
        params: { language: locale },
        tags: ['language-courses'],
    });

    return result[0];
});

export const getSelectOptionsFiltered = cache(async (locale: string): Promise<COURSES> => {
    const result = await sanityFetch<COURSES[]>({
        query: FILTER_COURSES_QUERY,
        params: { language: locale },
        tags: ['language-courses'],
    });

    return result[0];
});

export const getContacts = cache(async (locale: string): Promise<CONTACT_US_LANGUAGE_QUERYResult> => {
    const result = await sanityFetch<CONTACT_US_LANGUAGE_QUERYResult[]>({
        query: SOCIAL_QUERY,
        params: { language: locale },
        tags: ['language-contacts'],
    });

    return result[0];
});

export async function getPriceList(locale: string): Promise<PRICE_LIST_LANGUAGE_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<PRICE_LIST_LANGUAGE_QUERYResult[]>({
            query: PRICE_LIST_QUERY,
            params: { language: locale },
            tags: ['language-home', 'language-courses'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getQuizs(locale: string): Promise<QUIZ_QUERYResult[]> {
    try {
        "use server";
        const result = await sanityFetch<QUIZ_QUERYResult[]>({
            query: QUIZS_QUERY,
            params: { language: locale },
            tags: ['language-home'],
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export async function getQuizBySlug(locale: string, slug: string): Promise<QUIZ_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<QUIZ_QUERYResult[]>({
            query: QUIZ_SLUG_QUERY,
            params: { language: locale, slug },
            tags: ['language-home'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};