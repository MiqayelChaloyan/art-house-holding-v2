import { createBlogPostsQuery, createBlogSlugQuery, createBlogSimilarPostsQuery, blogSectionQueryFragment } from '../blog-queries';

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
    "price_section": coalesce(
        *[_type == "course-price-design" && course._ref == ^._id][0] {
            "eyebrow": eyebrow[$language],
            "line_1": line_1[$language],
            "line_2": line_2[$language],
            "items": items[] {
                _key,
                "title": title[$language],
                "subtitle": subtitle[$language],
                "amount": amount[$language],
            },
        },
        price_section {
            "eyebrow": eyebrow[$language],
            "line_1": line_1[$language],
            "line_2": line_2[$language],
            "items": items[] {
                _key,
                "title": title[$language],
                "subtitle": subtitle[$language],
                "amount": amount[$language],
            },
        }
    ),
    "why_section": why_section {
        "eyebrow": eyebrow[$language],
        "line_1": line_1[$language],
        "line_2": line_2[$language],
        "items": items[] {
            _key,
            "title": title[$language],
            "description": description[$language],
        },
    },
    "groups_section": groups_section {
        "eyebrow": eyebrow[$language],
        "line_1": line_1[$language],
        "line_2": line_2[$language],
        "enroll_label": enroll_label[$language],
        "filter_all": filter_all[$language],
        "start_date_label": start_date_label[$language],
        "schedule_label": schedule_label[$language],
        "time_label": time_label[$language],
        "duration_label": duration_label[$language],
        "price_label": price_label[$language],
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
        "eyebrow": eyebrow[$language],
        "line_1": line_1[$language],
        "line_2": line_2[$language],
        "items": items[] {
            _key,
            "question": question[$language],
            "answer": answer[$language],
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
        "page_eyebrow": page_eyebrow[$language],
        "page_line_1": page_line_1[$language],
        "page_line_2": page_line_2[$language],
        "detail_eyebrow": detail_eyebrow[$language],
        "explore_label": explore_label[$language],
        "portfolio_label": portfolio_label[$language],
        "about_eyebrow": about_eyebrow[$language],
        "about_title": about_title[$language],
        "about_emphasis": about_emphasis[$language],
        "curriculum_eyebrow": curriculum_eyebrow[$language],
        "curriculum_title": curriculum_title[$language],
        "curriculum_emphasis": curriculum_emphasis[$language],
        "work_eyebrow": work_eyebrow[$language],
        "work_title": work_title[$language],
        "work_emphasis": work_emphasis[$language],
    },
    "why_section": why_section {
        "eyebrow": eyebrow[$language],
        "line_1": line_1[$language],
        "line_2": line_2[$language],
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
        "eyebrow": eyebrow[$language],
        "line_1": line_1[$language],
        "line_2": line_2[$language],
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
    "staff_section": staff_section {
        "line_1": line_1[$language],
        "line_2": line_2[$language],
        "line_3": line_3[$language],
        "experience_label": experience_label[$language],
        "programs_label": programs_label[$language],
        "skills_label": skills_label[$language],
    },
    "certificates_section": certificates_section {
        "line_1": line_1[$language],
        "line_2": line_2[$language],
        "line_3": line_3[$language],
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
    },
    "clients": clients[] {
        _key,
        "name": coalesce(name[$language], name),
    },
    "voices_section": voices_section {
        "eyebrow": eyebrow[$language],
        "line_1": line_1[$language],
        "line_2": line_2[$language],
        "items": items[] {
            _key,
            rating,
            image,
            "name": name[$language],
            "role": role[$language],
            "quote": quote[$language],
        },
    },
    ${blogSectionQueryFragment},
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
    ${courseCardFields}
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
    "intro": intro[$language],
    "slug": slug.current,
    gallery_of_course,
    ${courseCardFields}
    ${coursePageFields}
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
*[_type == "portfolio-design"][0] {
    _id,
    "eyebrow": eyebrow[$language],
    "line_1": line_1[$language],
    "line_2": line_2[$language],
    "empty": empty[$language],
    "all_label": all_label[$language],
    "view_more": view_more[$language],
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
*[_type == "legal-page-design" && page == $page][0] {
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