import { siteName, siteUrl } from '@/src/config/site';

/** Stable node id so BlogPosting nodes can reference the same organisation as the home page graph. */
const ORGANIZATION_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

/** Google truncates longer headlines in rich results. */
const MAX_HEADLINE_LENGTH = 110;

const organizationNode = {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: siteName,
    url: siteUrl,
};

type SocialLink = { social_link?: string | null };

interface SiteSchemaInput {
    locale: string;
    address?: string | null;
    phoneNumbers?: string[] | null;
    socialLinks?: SocialLink[] | null;
};

const EMAIL_PATTERN = /^(mailto:)?[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function buildSiteSchema({
    locale,
    address,
    phoneNumbers,
    socialLinks,
}: SiteSchemaInput) {
    const links = socialLinks
        ?.map((link) => link?.social_link?.trim())
        .filter((link): link is string => Boolean(link)) ?? [];

    // The CMS stores email alongside social profiles, but schema.org sameAs accepts URLs only.
    const sameAs = links.filter((link) => /^https?:\/\//.test(link));
    const email = links.find((link) => EMAIL_PATTERN.test(link))?.replace(/^mailto:/, '');
    const telephone = phoneNumbers?.filter((phone) => Boolean(phone?.trim())) ?? [];

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'EducationalOrganization',
                '@id': ORGANIZATION_ID,
                name: siteName,
                url: siteUrl,
                ...(sameAs.length ? { sameAs } : {}),
                ...(email ? { email } : {}),
                ...(telephone.length ? { telephone } : {}),
                ...(address?.trim()
                    ? { address: { '@type': 'PostalAddress', streetAddress: address } }
                    : {}),
            },
            {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                url: siteUrl,
                name: siteName,
                inLanguage: locale,
                publisher: { '@id': ORGANIZATION_ID },
            },
        ],
    };
};

interface BlogPostingSchemaInput {
    title: string;
    url: string;
    locale: string;
    description?: string | null;
    imageUrl?: string | null;
    publishedAt?: string | null;
};

export function buildBlogPostingSchema({
    title,
    url,
    locale,
    description,
    imageUrl,
    publishedAt,
}: BlogPostingSchemaInput) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': url,
        url,
        mainEntityOfPage: url,
        headline: title?.slice(0, MAX_HEADLINE_LENGTH),
        inLanguage: locale,
        ...(description?.trim() ? { description } : {}),
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(publishedAt ? { datePublished: publishedAt } : {}),
        author: organizationNode,
        publisher: organizationNode,
    };
};
