import { getCourses as getCoursesEducational, getBlogPosts as getEducationalBlogPosts } from '@/src/utils/data/educational-center';
import { getCourses as getCoursesDesign, getBlogPosts as getDesignBlogPosts } from '@/src/utils/data/design';
import { getCourses as getCoursesLanguages, getBlogPosts as getLanguageBlogPosts } from '@/src/utils/data/language';

import { MetadataRoute } from 'next';
import { Pages } from '@/src/constants/pages';
import { locales } from '@/src/locales';
import { siteUrl } from '@/src/config/site';
import { encodeCanonicalPath } from '@/src/utils/canonical';

/** Regenerate hourly so newly published CMS content reaches Search Console without a redeploy. */
export const revalidate = 3600;

const staticRoutes: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: `/${Pages.HOME_ABOUT}`, priority: 0.5 },
  { path: Pages.EDUCATIONAL_HOME, priority: 1 },
  { path: Pages.EDUCATIONAL_ABOUT, priority: 0.5 },
  { path: Pages.EDUCATIONAL_PARTNERS, priority: 0.5 },
  { path: Pages.EDUCATIONAL_PRICE_LIST, priority: 0.5 },
  { path: Pages.EDUCATIONAL_BLOG_HOME, priority: 0.7 },
  { path: Pages.LANGUAGE_HOME, priority: 1 },
  { path: Pages.LANGUAGE_LANGUAGES, priority: 0.5 },
  { path: Pages.LANGUAGE_PROMOTIONS, priority: 0.5 },
  { path: Pages.LANGUAGE_PRICE_LIST, priority: 0.5 },
  { path: Pages.LANGUAGE_PARTNERS, priority: 0.5 },
  { path: Pages.LANGUAGE_SEND_REQUEST, priority: 0.5 },
  { path: Pages.LANGUAGE_TAKE_TEST, priority: 0.5 },
  { path: Pages.LANGUAGE_ABOUT, priority: 0.5 },
  { path: Pages.LANGUAGE_BLOG_HOME, priority: 0.7 },
  { path: Pages.DESIGN_HOME, priority: 1 },
  { path: Pages.DESIGN_ABOUT, priority: 0.5 },
  { path: Pages.DESIGN_PRICE_LIST, priority: 0.5 },
  { path: Pages.DESIGN_CONTACT, priority: 0.5 },
  { path: Pages.DESIGN_PRIVACY, priority: 0.4 },
  { path: Pages.DESIGN_TERMS, priority: 0.4 },
  { path: Pages.DESIGN_IMPRINT, priority: 0.4 },
  { path: Pages.DESIGN_PORTFOLIOS, priority: 0.5 },
  { path: Pages.DESIGN_ORDERS, priority: 0.5 },
  { path: Pages.DESIGN_BLOG_HOME, priority: 0.7 },
];

function escapeUrl(url: string): string {
  return url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/** Must match the canonical tag byte for byte, or Search Console reports the sitemap URL as a non-indexed alternate. */
function buildUrl(locale: string, path: string): string {
  return escapeUrl(`${siteUrl}${encodeCanonicalPath(`/${locale}${path}`)}`);
};

/** A CMS outage must degrade the sitemap to its static routes, never fail the whole response. */
async function safeList<T>(label: string, load: () => Promise<T[] | null | undefined>): Promise<T[]> {
  try {
    const result = await load();
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error(`[sitemap] failed to load ${label}`, error);
    return [];
  }
};

function dedupeByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return entries.filter(({ url }) => {
    if (seen.has(url)) {
      return false;
    }

    seen.add(url);
    return true;
  });
};

type SlugValue = string | string[] | { current?: string | null } | null | undefined;
type SluggedItem = { slug?: SlugValue };
type BlogItem = SluggedItem & { publishedAt?: string | null };

function readSlug({ slug }: SluggedItem): string | null {
  const value = Array.isArray(slug)
    ? slug[0]
    : typeof slug === 'string'
      ? slug
      : slug?.current;

  return value?.trim() ? value : null;
};

/** Content missing a slug has no reachable URL, so it must never reach the sitemap. */
function slugEntries<T extends SluggedItem>(
  items: T[],
  toUrl: (slug: string) => string,
  priority: number,
  toLastModified: (item: T) => string,
): MetadataRoute.Sitemap {
  return items.flatMap((item) => {
    const slug = readSlug(item);

    if (!slug) {
      return [];
    }

    return [{ url: toUrl(slug), lastModified: toLastModified(item), priority }];
  });
};

async function generateSitemapEntries(locale: string): Promise<MetadataRoute.Sitemap> {
  const [
    educationalCourses,
    designCourses,
    languageCourses,
    educationalBlogPosts,
    designBlogPosts,
    languageBlogPosts,
  ] = await Promise.all([
    safeList('educational courses', () => getCoursesEducational(locale)),
    safeList('design courses', () => getCoursesDesign(locale)),
    safeList('language courses', () => getCoursesLanguages(locale)),
    safeList('educational blog posts', () => getEducationalBlogPosts(locale)),
    safeList('design blog posts', () => getDesignBlogPosts(locale)),
    safeList('language blog posts', () => getLanguageBlogPosts(locale)),
  ]);

  const lastModified = new Date().toISOString();
  const publishedOr = (post: BlogItem) => post.publishedAt || lastModified;
  const always = () => lastModified;

  const staticEntries = staticRoutes.map(({ path, priority }) => ({
    url: buildUrl(locale, path),
    lastModified,
    priority,
    changeFrequency: 'weekly' as const,
  }));

  return [
    ...staticEntries,
    ...slugEntries(educationalCourses, (slug) => buildUrl(locale, `${Pages.EDUCATIONAL_HOME}/${slug}`), 1, always),
    ...slugEntries(designCourses, (slug) => buildUrl(locale, `${Pages.DESIGN_HOME}/${slug}`), 1, always),
    ...slugEntries(designCourses, (slug) => buildUrl(locale, `${Pages.DESIGN_PORTFOLIOS}/${slug}`), 0.8, always),
    ...slugEntries(designCourses, (slug) => buildUrl(locale, `${Pages.DESIGN_ORDERS}/${slug}`), 0.8, always),
    ...slugEntries(languageCourses, (slug) => buildUrl(locale, `${Pages.LANGUAGE_LANGUAGES}/${slug}`), 1, always),
    ...slugEntries(educationalBlogPosts, (slug) => buildUrl(locale, `${Pages.EDUCATIONAL_BLOG_HOME}/${slug}`), 0.8, publishedOr),
    ...slugEntries(designBlogPosts, (slug) => buildUrl(locale, `${Pages.DESIGN_BLOG_HOME}/${slug}`), 0.8, publishedOr),
    ...slugEntries(languageBlogPosts, (slug) => buildUrl(locale, `${Pages.LANGUAGE_BLOG_HOME}/${slug}`), 0.8, publishedOr),
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localeSitemaps = await Promise.all(
    locales.map((locale) => generateSitemapEntries(locale))
  );

  return dedupeByUrl(localeSitemaps.flat());
};
