/** Next.js cache tags used by sanityFetch — must match data fetchers. */
export const CACHE_TAGS = {
  partners: 'partners',
  artHouseHome: 'art-house-home',
  artHouseContacts: 'art-house-contacts',
  artHouseAbout: 'art-house-about',
  designHome: 'design-home',
  designCourses: 'design-courses',
  designLessons: 'design-lessons',
  designContacts: 'design-contacts',
  designBlog: 'design-blog',
  designLegal: 'design-legal',
  designAbout: 'design-about',
  educationalHome: 'educational-home',
  educationalCourses: 'educational-courses',
  educationalLessons: 'educational-lessons',
  educationalContacts: 'educational-contacts',
  educationalBlog: 'educational-blog',
  languageHome: 'language-home',
  languageCourses: 'language-courses',
  languageContacts: 'language-contacts',
  languageBlog: 'language-blog',
} as const;

/** Maps Sanity document `_type` values to the cache tags that should refresh. */
const SANITY_TYPE_TO_TAGS: Record<string, readonly string[]> = {
  partners: [CACHE_TAGS.partners],
  'art-house-home': [CACHE_TAGS.artHouseHome],
  'art-house-contact-us': [CACHE_TAGS.artHouseContacts],
  'art-house-about-us': [CACHE_TAGS.artHouseAbout],
  'about-us-design': [CACHE_TAGS.designHome, CACHE_TAGS.designBlog],
  'courses-design': [CACHE_TAGS.designCourses],
  'design-lessons-select-option': [CACHE_TAGS.designLessons],
  'design-contact-us': [CACHE_TAGS.designContacts],
  'price-list-design': [CACHE_TAGS.designHome, CACHE_TAGS.designCourses],
  'portfolio-design': [CACHE_TAGS.designCourses],
  'design-blog-post': [CACHE_TAGS.designBlog],
  'legal-page-design': [CACHE_TAGS.designLegal],
  'about-page-design': [CACHE_TAGS.designAbout],
  'about-us': [CACHE_TAGS.educationalHome, CACHE_TAGS.educationalBlog],
  courses: [CACHE_TAGS.educationalCourses],
  'educational-lessons-select-option': [CACHE_TAGS.educationalLessons],
  'educational-center-contact-us': [CACHE_TAGS.educationalContacts],
  'educational-center-blog-post': [CACHE_TAGS.educationalBlog],
  'about-us-language': [CACHE_TAGS.languageHome, CACHE_TAGS.languageBlog],
  'about-language': [CACHE_TAGS.languageCourses],
  'languages-select-option': [CACHE_TAGS.languageCourses],
  'language-contact-us': [CACHE_TAGS.languageContacts],
  'price-list-language': [CACHE_TAGS.languageHome, CACHE_TAGS.languageCourses],
  'promotions-languages': [CACHE_TAGS.languageHome],
  'languages-quiz': [CACHE_TAGS.languageHome],
  'language-blog-post': [CACHE_TAGS.languageBlog],
};

const SITEMAP_TYPES = new Set([
  'design-blog-post',
  'educational-center-blog-post',
  'language-blog-post',
  'courses-design',
  'courses',
  'about-language',
]);

export function resolveCacheTagsForSanityType(documentType: string): string[] {
  return [...(SANITY_TYPE_TO_TAGS[documentType] ?? [])];
}

export function shouldRevalidateSitemap(documentType: string): boolean {
  return SITEMAP_TYPES.has(documentType);
}

/** Every tag passed to sanityFetch — used when webhook payload has no `_type`. */
export function getAllCacheTags(): string[] {
  return Object.values(CACHE_TAGS);
}

export function collectRevalidationTargets(documentTypes: string[]): {
  tags: string[];
  revalidateSitemap: boolean;
} {
  const tags = new Set<string>();
  let revalidateSitemap = false;

  for (const documentType of documentTypes) {
    for (const tag of resolveCacheTagsForSanityType(documentType)) {
      tags.add(tag);
    }

    if (shouldRevalidateSitemap(documentType)) {
      revalidateSitemap = true;
    }
  }

  return {
    tags: [...tags],
    revalidateSitemap,
  };
}

function addDocumentType(value: unknown, types: Set<string>): void {
  if (!value || typeof value !== 'object') {
    return;
  }

  const record = value as Record<string, unknown>;
  if (typeof record._type === 'string') {
    types.add(record._type);
  }
}

/** Extract `_type` from Sanity webhook payloads (several shapes). */
export function extractSanityDocumentTypes(payload: unknown): string[] {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const body = payload as Record<string, unknown>;
  const types = new Set<string>();

  addDocumentType(body, types);
  addDocumentType(body.after, types);
  addDocumentType(body.before, types);
  addDocumentType(body.result, types);

  if (Array.isArray(body.documents)) {
    for (const doc of body.documents) {
      addDocumentType(doc, types);
    }
  }

  if (Array.isArray(body.results)) {
    for (const doc of body.results) {
      addDocumentType(doc, types);
    }
  }

  return [...types];
}
