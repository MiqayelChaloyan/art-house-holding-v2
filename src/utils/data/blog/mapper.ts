import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';
import { formatLocalizedDate } from '@/src/utils/format-date';


type BlogPostRaw = Omit<BLOG_POST, 'formattedDate' | 'featuredImagePath'>;

export function enrichBlogPost(post: BlogPostRaw, locale: string): BLOG_POST {
    return {
        ...post,
        formattedDate: formatLocalizedDate(post.publishedAt, locale),
        featuredImagePath: urlForImage(post.featuredImage) as ImagePath,
    };
};

export function enrichBlogPosts(
    posts: BlogPostRaw[] | undefined,
    locale: string,
): BLOG_POST[] {
    return (posts ?? []).map((post) => enrichBlogPost(post, locale));
};

export function enrichBlogPostDetail(
    post: Omit<BLOG_POST_DETAIL, 'formattedDate' | 'featuredImagePath' | 'gallery' | 'relatedPosts'>,
    locale: string,
    relatedPosts?: Omit<BLOG_POST, 'formattedDate' | 'featuredImagePath'>[],
    gallery?: BLOG_GALLERY_IMAGE[],
): BLOG_POST_DETAIL {
    return {
        ...post,
        formattedDate: formatLocalizedDate(post.publishedAt, locale),
        featuredImagePath: urlForImage(post.featuredImage) as ImagePath,
        gallery: gallery?.map((image) => ({
            ...image,
            imagePath: urlForImage(image) as ImagePath,
        })),
        relatedPosts: relatedPosts?.map((relatedPost) => enrichBlogPost(relatedPost, locale)),
    };
};
