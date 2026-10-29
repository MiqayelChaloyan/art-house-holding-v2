import { createBlogPostsQuery, createBlogSlugQuery, createBlogSimilarPostsQuery, blogSectionQueryFragment } from '../blog-queries';

export const BLOG_POSTS_QUERY = createBlogPostsQuery('design-blog-post');
export const BLOG_SLUG_QUERY = createBlogSlugQuery('design-blog-post');
export const BLOG_SIMILAR_POSTS_QUERY = createBlogSimilarPostsQuery('design-blog-post');

export const ABOUT_US_DETAILS_QUERY = `
*[_type == "about-us-design"] {
   "main_section": main_section[] {
        _key,
        company_name,
        image,
        "title": title[$language],
    },
    "courses": courses[] {
        _key,
        name,
        gallery_of_course,
        categories,
        "course_name": course_name[$language],
        "about_course": about_course[$language],
    },
    "our_day": our_day {
        video,
    },
    "progress_section": progress_section[] {
        _key,
        quantity,
        isPlusSign,
        "title": title[$language],
    },
    "workers": workers[] {
        _key,
        worker_image,
        "worker": worker[$language],
        "profession": profession[$language],
    },
    ${blogSectionQueryFragment},
}`;

export const COURSES_QUERY = `
*[_type == "courses-design"] {
    _id,
    name,
    "slug": slug.current,
    gallery_of_course,
    "conditions": conditions[][$language],
    "course_name": course_name[$language],
    "guides": guides[][$language],
    "portfolios": portfolios[] {
        _key,
        image,
        background_image,
        "slug": slug.current,
        "author": author[$language],
        "title_images_array": title_images_array[] {
            _key,
            "title": title[$language],
            "images": images[],
        }
    },
    "orders": orders[] {
        _key,
        image,
        background_image,
        "slug": slug.current,
        "author": author[$language],
        "title_images_array": title_images_array[] {
            _key,
            "title": title[$language],
            "images": images[],
        }
    },
}`;

export const COURSE_ID_QUERY = `
*[_type == "courses-design" && _id == $_id][0] {
    _id,
    name,
    "slug": slug.current,
    gallery_of_course,
    "conditions": conditions[][$language],
    "course_name": course_name[$language],
    "guides": guides[][$language],
    "portfolios": portfolios[] {
        _key,
        image,
        background_image,
        "slug": slug.current,
        "author": author[$language],
        "title_images_array": title_images_array[] {
            _key,
            "title": title[$language],
            "images": images[],
        }
    },
    "orders": orders[] {
        _key,
        image,
        background_image,
        "slug": slug.current,
        "author": author[$language],
        "title_images_array": title_images_array[] {
            _key,
            "title": title[$language],
            "images": images[],
        }
    },
}`;

export const COURSE_SLUG_QUERY = `
*[_type == "courses-design" && slug.current == $slug] {
    _id,
    name,
    "course_name": course_name[$language],
    "slug": slug.current,
    gallery_of_course,
    "conditions": conditions[][$language],
    "guides": guides[][$language],
    "portfolios": portfolios[] {
        _key,
        "author": author[$language],
        image,
        background_image,
        "slug": slug.current,
        "title_images_array": title_images_array[] {
            _key,
            "title": title[$language],
            "images": images[],
        }
    },
    "orders": orders[] {
        _key,
        "author": author[$language],
        image,
        background_image,
        "slug": slug.current,
        "title_images_array": title_images_array[] {
            _key,
            "title": title[$language],
            "images": images[],
        }
    },
    ogImage,
    keywords,
    "ogDescription": ogDescription[$language],
}`;

export const SITE_META_QUERY = `
*[_type == "about-us-design"] {
    ogTitle,
    ogImage,
    keywords,
    "ogDescription": ogDescription[$language],
}`;

export const SOCIAL_QUERY = `
*[_type == "design-contact-us"] {
    name,
    email,
    phone_numbers,
    social_links,
    "address": address[$language],
}`;

export const LESSONS_QUERY = `
*[_type == "design-lessons-select-option"] {
    "_id": _id,
    "course_name": course_name[] {
        "course_name": course_name[$language],
        "slug": slug.current,
    },
    "order_name": order_name[] {
        "order_name": order_name[$language],
        "slug": slug.current,
    },
}`;

export const PORTFOLIO_QUERY = `
*[_type == "portfolio-design"] {
    _id,
    image
}`;

export const PRICE_LIST_QUERY = `
*[_type == "price-list-design"] {
    _id,
    "informatie": informatie[$language],
    "our_advantages": our_advantages[][$language],
    "price_list": price_list[] {
        _key,
        group_lessons,
        personal_lessons,
        "course": course[$language],
        "duration": duration[$language],
        "hours_lessons": hours_lessons[$language],
    }
}`;