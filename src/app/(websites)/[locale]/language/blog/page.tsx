import { type Metadata } from 'next';

import BlogListPage from '@/src/components/blog/ListPage';

import { Locale } from '@/src/locales';
import { BlogSiteKey } from '@/src/components/blog/config';

import { getBlogPosts, getHomeDetails } from '@/src/utils/data/language';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';

import { SITE_META_QUERY } from '@/sanity/services/language-service';
import { Pages } from '@/src/constants/pages';


interface Props {
    params: {
        locale: string;
    };
};

export default async function Page({
    params: { locale },
}: Readonly<Props>) {
    const [posts, homeData] = await Promise.all([
        getBlogPosts(locale),
        getHomeDetails(locale),
    ]);

    return (
        <BlogListPage
            siteKey={'language' satisfies BlogSiteKey}
            posts={posts ?? []}
            section={homeData?.blog_section}
        />
    );
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.LANGUAGE_BLOG_HOME}`,
        navigationKey: 'blog',
    });
};
