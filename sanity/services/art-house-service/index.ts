export const HOME_DETALIS_QUERY = `
*[_type == "art-house-home"] {
    "our_websites": our_websites[] {
        _key,
        company_name,
        website_logo_front,
        website_logo_back,
        web_site_url,
        "words": words[$language],
    },
    "progress_section": progress_section[] {
        _key,
        quantity,
        isPlusSign,
        "title": title[$language],
    },
}`;

export const SITE_META_QUERY = `
*[_type == "art-house-home"] {
    ogTitle,
    ogImage,
    keywords,
    "ogDescription": ogDescription[$language],
}`;

export const SOCIAL_QUERY = `
*[_type == "art-house-contact-us"] {
    phone_numbers,
    social_links,
    "address": address[$language],
}`;

export const ABOUT_US_DETAILS_QUERY = `
*[_type == "art-house-about-us"] {
    "about_us_section": about_us_section {
        image,
        "about_us_content": about_us_content[$language],
    },
    "our_rating": our_rating[] {
        _key,
        user_image,
        "user_feedback": user_feedback[$language],
        "user_name": user_name[$language],
    },
}`;