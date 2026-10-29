interface BLOG_SECTION {
    section_title: string;
    section_subtitle?: string;
};

interface BLOG_POST {
    _id: string;
    slug: string;
    publishedAt: string;
    formattedDate: string;
    featuredImage: Asset;
    featuredImagePath?: {
        src: string;
        width: number;
        height: number;
    };
    title: string;
    excerpt: string;
    category?: string;
};

interface BLOG_GALLERY_IMAGE extends Asset {
    _key: string;
    imagePath?: {
        src: string;
        width: number;
        height: number;
    };
};

interface BLOG_POST_DETAIL extends BLOG_POST {
    body: TEXT;
    ogImage: Asset;
    keywords: string[];
    ogDescription: string;
    gallery?: BLOG_GALLERY_IMAGE[];
    galleryCaption?: string;
    relatedPosts?: BLOG_POST[];
};
