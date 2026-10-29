import { cache } from 'react';

import { ABOUT_US_DETAILS_QUERY, HOME_DETALIS_QUERY, SOCIAL_QUERY } from '@/sanity/services/art-house-service';

import { sanityFetch } from '@/src/api/sanity-fetch';


export const getHomeDetails = cache(async (locale: string): Promise<HOME_DETALIS_QUERYResult> => {
    const result = await sanityFetch<HOME_DETALIS_QUERYResult[]>({
        query: HOME_DETALIS_QUERY,
        params: { language: locale },
        tags: ['art-house-home'],
    });

    return result[1];
});

export const getContacts = cache(async (locale: string): Promise<SOCIAL_QUERYResult> => {
    const result = await sanityFetch<SOCIAL_QUERYResult[]>({
        query: SOCIAL_QUERY,
        params: { language: locale },
        tags: ['art-house-contacts'],
    });

    return result[0];
});

export const getAboutDetails = cache(async (locale: string): Promise<ABOUT_US_DETAILS_Result> => {
    const result = await sanityFetch<ABOUT_US_DETAILS_Result[]>({
        query: ABOUT_US_DETAILS_QUERY,
        params: { language: locale },
        tags: ['art-house-about'],
    });

    return result[0];
});
