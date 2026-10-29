import { cache } from 'react';

import { HOME_DETALIS_QUERY, COURSES_QUERY, COURSE_SLUG_QUERY, LESSONS_QUERY, SOCIAL_QUERY, BLOG_POSTS_QUERY, BLOG_SLUG_QUERY, BLOG_SIMILAR_POSTS_QUERY } from '@/sanity/services/educational-center-service';

import { sanityFetch } from '@/src/api/sanity-fetch';
import { createBlogFetchers } from '@/src/utils/data/blog/fetchers';


const blogFetchers = createBlogFetchers({
    posts: BLOG_POSTS_QUERY,
    slug: BLOG_SLUG_QUERY,
    similar: BLOG_SIMILAR_POSTS_QUERY,
    tag: 'educational-blog',
});

export const getBlogPosts = blogFetchers.getBlogPosts;
export const getBlogPost = blogFetchers.getBlogPost;
export const getSimilarBlogPosts = blogFetchers.getSimilarBlogPosts;


export const getHomeDetails = cache(async (locale: string): Promise<HOME_DETALIS_QUERYResult> => {
    const result = await sanityFetch<HOME_DETALIS_QUERYResult[]>({
        query: HOME_DETALIS_QUERY,
        params: { language: locale },
        tags: ['educational-home'],
    });

    return result[0];
});

export const getCourses = cache(async (locale: string): Promise<COURSES_QUERYResult[]> => {
    const result = await sanityFetch<COURSES_QUERYResult[]>({
        query: COURSES_QUERY,
        params: { language: locale },
        tags: ['educational-courses'],
    });

    return result;
});

export async function getCourse(locale: string, slug: string): Promise<COURSES_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_QUERYResult[]>({
            query: COURSE_SLUG_QUERY,
            params: { language: locale, slug },
            tags: ['educational-courses'],
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export const getSelectOptions = cache(async (locale: string): Promise<SELECT_OPTIONS_QUERYResult> => {
    const result = await sanityFetch<SELECT_OPTIONS_QUERYResult[]>({
        query: LESSONS_QUERY,
        params: { language: locale },
        tags: ['educational-lessons'],
    });

    return result[0];
});

export const getContacts = cache(async (locale: string): Promise<CONTACT_US_QUERYResult> => {
    const result = await sanityFetch<CONTACT_US_QUERYResult[]>({
        query: SOCIAL_QUERY,
        params: { language: locale },
        tags: ['educational-contacts'],
    });

    return result[0];
});