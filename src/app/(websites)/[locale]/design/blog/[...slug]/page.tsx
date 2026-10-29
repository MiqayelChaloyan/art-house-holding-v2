import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import BlogDetailPage from '@/src/components/blog/DetailPage';
import JsonLd from '@/src/components/seo/JsonLd';

import { Locale } from '@/src/locales';
import { BlogSiteKey } from '@/src/components/blog/config';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';
import { absoluteUrl } from '@/src/config/site';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { buildBlogPostingSchema } from '@/src/utils/structured-data';
import { getBlogPost, getSimilarBlogPosts } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
        slug: string[];
    };
};

export default async function Page({
    params: { locale, slug },
}: Readonly<Props>) {
    const slugPath = slug?.[0];

    if (!slugPath) {
        notFound();
    }

    const decodedSlug = decodeURIComponent(slugPath);
    const post = await getBlogPost(locale, decodedSlug);

    if (!post) {
        notFound();
    }

    const similarPosts = await getSimilarBlogPosts(locale, decodedSlug, post.relatedPosts);
    const shareUrl = absoluteUrl(`/${locale}/design/blog/${decodedSlug}`);

    return (
        <>
            <JsonLd
                data={buildBlogPostingSchema({
                    title: post.title,
                    url: shareUrl,
                    locale,
                    description: post.ogDescription || post.excerpt,
                    imageUrl: post.featuredImagePath?.src,
                    publishedAt: post.publishedAt,
                })}
            />
            <BlogDetailPage
                siteKey={'design' satisfies BlogSiteKey}
                post={post}
                similarPosts={similarPosts}
                shareUrl={shareUrl}
            />
        </>
    );
};

export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale; slug: string[] };
}): Promise<Metadata> {
    const slugPath = slug?.[0];

    if (!slugPath) {
        notFound();
    }

    const decodedSlug = decodeURIComponent(slugPath);
    const data = await getBlogPost(locale, decodedSlug);

    if (!data) {
        notFound();
    }

    const path: ImagePath = urlForImage(data.ogImage || data.featuredImage);

    return generateMetadataDynamic(
        data.ogDescription || data.excerpt,
        data.title,
        path,
        null,
        locale,
        data.keywords,
        `/${locale}/design/blog/${decodedSlug}`,
    );
};
