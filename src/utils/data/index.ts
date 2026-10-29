import { cache } from 'react';

import { PARTNERS_QUERY } from '@/sanity/services/generic-service';

import { sanityFetch } from '@/src/api/sanity-fetch';


export const getPartners = cache(async (locale: string): Promise<PARTNER_Result[]> => {
    const result = await sanityFetch<PARTNER_Result[]>({
        query: PARTNERS_QUERY,
        params: { language: locale },
        tags: ['partners'],
    });

    return result;
});
