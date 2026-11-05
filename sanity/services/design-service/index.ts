import { createBlogPostsQuery, createBlogSlugQuery, createBlogSimilarPostsQuery, designBlogSectionQueryFragment } from '../blog-queries';

export const BLOG_POSTS_QUERY = createBlogPostsQuery('design-blog-post');
export const BLOG_SLUG_QUERY = createBlogSlugQuery('design-blog-post');
export const BLOG_SIMILAR_POSTS_QUERY = createBlogSimilarPostsQuery('design-blog-post');

const courseCardFields = `
    card_image,
    "duration": duration[$language],
    "level": level[$language],
    "card_description": card_description[$language],
`;

const coursePageFields = `
    "about_section": about_section {
        "description": description[$language],
        "reasons": reasons[] {
            _key,
            "title": title[$language],
            "description": description[$language],
        },
    },
    "topics": topics[] {
        _key,
        "title": title[$language],
        "description": description[$language],
    },
    "condition_items": conditions[] {
        _key,
        "title": @[$language],
        "description": description[$language],
    },
    "trainers_section": trainers_section {
        "items": items[defined(workerKey)]{
            _key,
            "workerKey": workerKey,
            ...(*[_type == "about-us-design"][0].workers[_key == ^.workerKey][0]{
                worker_image,
                behance_url,
                "worker": worker[$language],
                "profession": profession[$language],
                "experience": experience[$language],
                "bio": bio[$language],
                "programs": programs[] { "label": label[$language] }.label,
                "skills": skills[] { "label": label[$language] }.label,
            }),
        },
    },
    "price_section": price_section {
        "items": items[] {
            _key,
            "title": title[$language],
            "subtitle": subtitle[$language],
            "duration": duration[$language],
            "amount": amount[$language],
        },
    },
    "why_section": why_section {
        "items": items[] {
            _key,
            "title": title[$language],
            "description": description[$language],
        },
    },
    "groups_section": groups_section {
        "groups": groups[] {
            _key,
            mode,
            "shift": shift[$language],
            "start_date": start_date[$language],
            "schedule": schedule[$language],
            "time": time[$language],
            "duration": duration[$language],
            "price": price[$language],
        },
    },
    "faq_section": faq_section {
        "items": items[] {
            _key,
            "question": question[$language],
            "answer": answer[$language],
        },
    },
    "blog_posts": blog_posts[]-> {
        _id,
        "slug": slug.current,
        publishedAt,
        featuredImage,
        "title": title[$language],
        "excerpt": excerpt[$language],
        "category": category[$language],
    },
    "selected_work_section": selected_work_section {
        "description": description[$language],
        "portfolio_picks": portfolio_picks[] {
            _key,
            portfolio_key,
            "courseSlug": course->slug.current,
            "courseLabel": course->course_name[$language],
            "portfolio": course->portfolios[_key == ^.portfolio_key][0] {
                _key,
                image,
                "author": author[$language],
                "title": title_images_array[0].title[$language],
            },
        },
    },
`;

export const ABOUT_US_DETAILS_QUERY = `
*[_type == "about-us-design"] {
   "main_section": main_section[] {
        _key,
        company_name,
        image,
        "title": title[$language],
    },
    "studio_section": studio_section {
        "eyebrow": eyebrow[$language],
        "line_1": line_1[$language],
        "line_2": line_2[$language],
        "line_3": line_3[$language],
        "line_4": line_4[$language],
        "description": description[$language],
        "explore_label": explore_label[$language],
        "portfolio_label": portfolio_label[$language],
        "stats": stats[] {
            _key,
            value,
            "title": title[$language],
        },
        "slides": slides[] {
            _key,
            image,
        },
    },
    "courses_section": courses_section {
        "eyebrow": eyebrow[$language],
        "line_1": line_1[$language],
        "line_2": line_2[$language],
    },
    "why_section": why_section {
        "items": items[0...30] {
            _key,
            number,
            "title": title[$language],
            "description": description[$language],
        },
    },
    "courses": courses[0...10] {
        _key,
        name,
        gallery_of_course,
        card_image,
        categories,
        "slug": categories->slug.current,
        "course_name": course_name[$language],
        "about_course": about_course[$language],
        "card_description": card_description[$language],
        "duration": duration[$language],
        "level": level[$language],
    },
    "projects_section": projects_section {
        "description": description[$language],
        "projects": projects[0...10] {
            _key,
            year,
            href,
            image,
            "title": title[$language],
            "category": category[$language],
        },
    },
    "certificates_section": certificates_section {
        "images": images[0...10] {
            _key,
            image,
        },
    },
    "workers": workers[] {
        _key,
        worker_image,
        behance_url,
        "worker": worker[$language],
        "profession": profession[$language],
        "experience": experience[$language],
        "bio": bio[$language],
        "programs": programs[] { "label": label[$language] }.label,
        "skills": skills[] { "label": label[$language] }.label,
        "courses": courses[]._ref,
    },
    "clients": clients[] {
        _key,
        "name": coalesce(name[$language], name),
    },
    "voices_section": voices_section {
        "items": items[] {
            _key,
            rating,
            image,
            "name": name[$language],
            "role": role[$language],
            "quote": quote[$language],
        },
    },
    ${designBlogSectionQueryFragment},
}`;

export const COURSES_QUERY = `
*[_type == "courses-design"] {
    _id,
    name,
    "slug": slug.current,
    gallery_of_course,
    ${courseCardFields}
    "conditions": conditions[][$language],
    "course_name": course_name[$language],
    "intro": intro[$language],
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
    "intro": intro[$language],
    "slug": slug.current,
    gallery_of_course,
    ${courseCardFields}
    ${coursePageFields}
    "conditions": conditions[][$language],
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
    email,
    phone_numbers,
    social_links,
    logo,
    "address": address[$language],
    "eyebrow": eyebrow[$language],
    "line_1": line_1[$language],
    "line_2": line_2[$language],
    "form_title": form_title[$language],
    "hours": hours[$language],
    "brand_line_1": brand_line_1[$language],
    "brand_line_2": brand_line_2[$language],
    "tagline": tagline[$language],
    "map_links": map_links[] {
        _key,
        name,
        link,
        image,
    },
}`;

export const LESSONS_QUERY = `
*[_type == "design-lessons-select-option"] {
    "_id": _id,
    "course_name": course_name[] {
        "course_name": course_name[$language],
        "slug": slug.current,
    },
}`;

export const ABOUT_PAGE_QUERY = `
*[_type == "about-page-design"][0] {
    _id,
    "eyebrow": eyebrow[$language],
    "line_1": line_1[$language],
    "line_2": line_2[$language],
    "intro": intro[$language],
    image,
    "sections": sections[] {
        _key,
        "heading": heading[$language],
        "body": body[$language],
    },
}`;

export const LEGAL_PAGE_QUERY = `
*[_type == "legal-page-design" && _id == "legal-" + $page + "-design"][0] {
    _id,
    page,
    "eyebrow": eyebrow[$language],
    "line_1": line_1[$language],
    "line_2": line_2[$language],
    "lead": lead[$language],
    updated_at,
    "sections": sections[] {
        _key,
        "heading": heading[$language],
        "body": body[$language],
    },
}`;
