import { createBlogPostsQuery, createBlogSlugQuery, createBlogSimilarPostsQuery, blogSectionQueryFragment } from '../blog-queries';

export const BLOG_POSTS_QUERY = createBlogPostsQuery('language-blog-post');
export const BLOG_SLUG_QUERY = createBlogSlugQuery('language-blog-post');
export const BLOG_SIMILAR_POSTS_QUERY = createBlogSimilarPostsQuery('language-blog-post');

export const ABOUT_US_DETAILS_QUERY = `
*[_type == "about-us-language"] {
    _id,
    "about_us": about_us {
        about_us_images,
        about_our_daily,
        "content": content[$language],
    },
    "our_daily_life": our_daily_life {
        "our_daily_life_images": our_daily_life_images,
        "about_our_daily": about_our_daily[] {
            _key,
            languages,
            video,
            "news": news[$language],
        },
    },
    ${blogSectionQueryFragment},
}`;

export const SITE_META_QUERY = `
*[_type == "about-us-language"] {
    ogTitle,
    ogImage,
    keywords,
    "ogDescription": ogDescription[$language],
}`;

export const COURSES_QUERY =
    `*[_type == "languages-select-option"] {
    _id,
    "course_name": course_name[] {
        "course_name": course_name[$language],
        "slug": slug.current,
    },
    "week_number_of_lessons": week_number_of_lessons[] {
        "week_number_of_lessons": week_number_of_lessons[$language],
        "slug": slug.current,
    },
    "course_type": course_type[] {
        "course_type": course_type[$language],
        "slug": slug.current,
    },
}`;

export const FILTER_COURSES_QUERY = `
*[_type == "languages-select-option"] {
        "course_name": course_name[] {
            "course_name": course_name[$language],
            "slug": slug.current,
        },
}`;

export const SOCIAL_QUERY = `
*[_type == "language-contact-us"] {
    name,
    phone_number,
    social_links,
    "address": address[$language],
}`;

export const LANGUAGES_QUERY = 
`*[_type == "about-language"] {
    _id,
    name,
    slug,
    "image": image[$language],
    "text": text[$language],
    during_courses_images,
    course_process,
    "teachers": teachers[] {
        _key,
        teacher_image,
        "fullName": fullName[$language],
    },
}`;

export const LANGUAGE_SLUG_QUERY = 
`*[_type == "about-language" && slug.current == $slug] {
    _id,
    name,
    slug,
    "image": image[$language],
    "text": text[$language],
    during_courses_images,
    course_process,
    "teachers": teachers[] {
        _key,
        teacher_image,
        "fullName": fullName[$language],
    },
    ogImage,
    keywords,
    "ogDescription": ogDescription[$language],
}`;

export const LANGUAGE_ID_QUERY = 
`*[_type == "about-language" && _id == $_id][0] {
    _id,
    name,
    slug,
    "image": image[$language],
    "text": text[$language],
    during_courses_images,
    course_process,
    "teachers": teachers[] {
        _key,
        teacher_image,
        "fullName": fullName[$language],
    },
}`;

export const PRICE_LIST_QUERY = 
`*[_type == "price-list-language"] {
    _id,
    "price_list": price_list[] {
        _key,
        group_lessons,
        private_lessons,
        "teaching_language": teaching_language[$language],
    },
    "private_lessons": private_lessons[] {
        _key,
        private_lessons,
        "teaching_language": teaching_language[$language],
    },
    "english_courses": english_courses[] {
        _key,
        private_lessons,
        "language_type": language_type[$language],
        "duration": duration[$language],
    },
}`;

export const DISCOUNTS_QUERY = 
`*[_type == "promotions-languages"] {
    _id,
    "discounts_list": discounts_list[] {
        _key,
        procent,
        image,
        "about_discount": about_discount[$language],
    },
}`;

export const QUIZS_QUERY = 
`*[_type == "languages-quiz"] {
    _id,
    name,
    question_logo,
    "slug": slug.current,
    "questions": questions[] {
        question,
        "slug": slug.current,
        options,
        answer
    },
}`;

export const QUIZ_SLUG_QUERY = 
`*[_type == "languages-quiz" && slug.current == $slug] {
    _id,
    name,
    question_logo,
    "slug": slug.current,
    "questions": questions[] {
        question,
        "slug": slug.current,
        options,
        answer
    },
}`;
