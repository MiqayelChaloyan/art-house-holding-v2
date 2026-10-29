export const createBlogPostsQuery = (documentType: string) => `
*[_type == "${documentType}"] | order(publishedAt desc)[0...12] {
    _id,
    "slug": slug.current,
    publishedAt,
    featuredImage,
    "title": title[$language],
    "excerpt": excerpt[$language],
    "category": category[$language],
}`;

export const createBlogSlugQuery = (documentType: string) => `
*[_type == "${documentType}" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    publishedAt,
    featuredImage,
    "title": title[$language],
    "excerpt": excerpt[$language],
    "body": body[$language],
    "category": category[$language],
    gallery[] {
        _key,
        alt,
        asset
    },
    "galleryCaption": gallery_caption[$language],
    ogImage,
    keywords,
    "ogDescription": ogDescription[$language],
    "relatedPosts": related_posts[]-> {
        _id,
        "slug": slug.current,
        publishedAt,
        featuredImage,
        "title": title[$language],
        "excerpt": excerpt[$language],
        "category": category[$language],
    },
}`;

export const createBlogSimilarPostsQuery = (documentType: string) => `
*[_type == "${documentType}" && slug.current != $slug] | order(publishedAt desc)[0...4] {
    _id,
    "slug": slug.current,
    publishedAt,
    featuredImage,
    "title": title[$language],
    "excerpt": excerpt[$language],
    "category": category[$language],
}`;

export const blogSectionQueryFragment = `
    "blog_section": blog_section {
        "section_title": section_title[$language],
        "section_subtitle": section_subtitle[$language],
    }`;
