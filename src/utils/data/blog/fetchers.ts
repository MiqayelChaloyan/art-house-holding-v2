import { cache } from 'react';

import { sanityFetch } from '@/src/api/sanity-fetch';
import { enrichBlogPostDetail, enrichBlogPosts } from '@/src/utils/data/blog/mapper';


interface BlogQueries {
    posts: string;
    slug: string;
    similar: string;
    tag?: string;
};

export function createBlogFetchers(queries: BlogQueries) {
    const tag = queries.tag ?? 'blog';

    const getBlogPosts = cache(async (locale: string): Promise<BLOG_POST[]> => {
        const result = await sanityFetch<Omit<BLOG_POST, 'formattedDate' | 'featuredImagePath'>[]>({
            query: queries.posts,
            params: { language: locale },
            tags: [tag],
        });

        return enrichBlogPosts(result, locale);
    });

    const getBlogPost = cache(async (locale: string, slug: string): Promise<BLOG_POST_DETAIL | null> => {
        const result = await sanityFetch<Omit<BLOG_POST_DETAIL, 'formattedDate' | 'featuredImagePath' | 'gallery' | 'relatedPosts'> & {
            gallery?: BLOG_GALLERY_IMAGE[];
            relatedPosts?: Omit<BLOG_POST, 'formattedDate' | 'featuredImagePath'>[];
        } | null>({
            query: queries.slug,
            params: { language: locale, slug },
            tags: [tag],
        });

        if (!result) {
            return null;
        }

        const { relatedPosts, gallery, ...post } = result;

        return enrichBlogPostDetail(post, locale, relatedPosts, gallery);
    });

    const getSimilarBlogPosts = cache(async (
        locale: string,
        slug: string,
        relatedPosts?: BLOG_POST[],
    ): Promise<BLOG_POST[]> => {
        const curatedPosts = relatedPosts
            ?.filter((post) => post.slug !== slug)
            .slice(0, 4) ?? [];

        if (curatedPosts.length > 0) {
            return curatedPosts;
        }

        const result = await sanityFetch<Omit<BLOG_POST, 'formattedDate' | 'featuredImagePath'>[]>({
            query: queries.similar,
            params: { language: locale, slug },
            tags: [tag],
        });

        return enrichBlogPosts(result, locale);
    });

    return {
        getBlogPosts,
        getBlogPost,
        getSimilarBlogPosts,
    };
};
