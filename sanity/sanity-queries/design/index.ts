interface AssetRef {
    _type: string;
    _ref: string;
};

interface Asset {
    _type: string;
    alt: string;
    asset: AssetRef;
};

interface Ref {
    _ref: string;
    _type: string;
};

interface MAIN_SLIDE {
    _key: string;
    company_name: string;
    title: string;
    image: Asset;
};

interface GALLERY {
    alt: string;
    _type: string;
    _key: string;
    asset: Asset;
};

interface WORK {
    _key: string;
    title: string;
    images: Asset[];
};

interface PORTFOLIO {
    _key: string;
    author: string;
    image: Asset;
    background_image: Asset;
    slug: string;
    title_images_array: WORK[];
};

interface ORDER {
    _key: string;
    author: string;
    image: Asset;
    background_image: Asset;
    slug: string;
    title_images_array: WORK[];
};

interface COURSE_PRICE_ITEM {
    _key: string;
    title?: string;
    subtitle?: string;
    duration?: string;
    amount?: string;
};

interface COURSE_TOPIC {
    _key: string;
    title?: string;
    description?: string;
};

interface COURSE_ABOUT_REASON {
    _key: string;
    title?: string;
    description?: string;
};

interface COURSE_ABOUT_SECTION {
    description?: string;
    reasons?: COURSE_ABOUT_REASON[];
};

interface COURSE_PRICE_SECTION {
    items?: COURSE_PRICE_ITEM[];
};

interface COURSE_WHY_ITEM {
    _key: string;
    title?: string;
    description?: string;
};

interface COURSE_WHY_SECTION {
    items?: COURSE_WHY_ITEM[];
};

interface COURSE_GROUP {
    _key: string;
    mode?: 'morning' | 'evening' | 'online' | 'offline';
    shift?: string;
    start_date?: string;
    schedule?: string;
    time?: string;
    duration?: string;
    price?: string;
};

interface COURSE_GROUPS_SECTION {
    groups?: COURSE_GROUP[];
};

interface COURSE_FAQ_ITEM {
    _key: string;
    question?: string;
    answer?: string;
};

interface COURSE_FAQ_SECTION {
    items?: COURSE_FAQ_ITEM[];
};

interface COURSE_TRAINERS_SECTION {
    items?: WORKER[];
};

interface COURSES_DESIGN_QUERYResult {
    _id: string;
    _key?: string;
    slug: string;
    course_name?: string;
    name: string;
    intro?: string;
    duration?: string;
    level?: string;
    card_description?: string;
    card_image?: Asset;
    conditions: string[];
    about_section?: COURSE_ABOUT_SECTION;
    gallery_of_course: GALLERY[];
    portfolios: PORTFOLIO[];
    orders: ORDER[];
    topics?: COURSE_TOPIC[];
    condition_items?: COURSE_TOPIC[];
    trainers_section?: COURSE_TRAINERS_SECTION;
    price_section?: COURSE_PRICE_SECTION;
    why_section?: COURSE_WHY_SECTION;
    groups_section?: COURSE_GROUPS_SECTION;
    faq_section?: COURSE_FAQ_SECTION;
    blog_posts?: BLOG_POST[];
    selected_work_section?: SELECTED_WORK_SECTION;
    keywords?: string[];
    ogDescription?: string;
    ogImage?: Asset;
};

interface COURSES_SECTION {
    eyebrow: string;
    line_1: string;
    line_2: string;
};

interface WHY_ITEM {
    _key: string;
    number: string;
    title: string;
    description: string;
};

interface WHY_SECTION {
    items: WHY_ITEM[];
};

interface HOME_COURSES {
    _key: string;
    name: string;
    course_name: string;
    about_course: string;
    card_description?: string;
    duration?: string;
    level?: string;
    slug?: string;
    gallery_of_course: GALLERY[];
    card_image?: Asset;
    categories: AssetRef;
};

interface PROJECT_ITEM {
    _key: string;
    title: string;
    category: string;
    year?: string;
    href?: string;
    image: Asset;
};

interface PROJECTS_SECTION {
    description: string;
    projects: PROJECT_ITEM[];
};

interface SELECTED_WORK_PORTFOLIO_PICK {
    _key: string;
    portfolio_key?: string;
    courseSlug?: string;
    courseLabel?: string;
    portfolio?: {
        _key: string;
        image?: Asset;
        author?: string;
        title?: string;
    };
};

interface SELECTED_WORK_SECTION {
    description?: string;
    portfolio_picks?: SELECTED_WORK_PORTFOLIO_PICK[];
};

interface VOICE_ITEM {
    _key: string;
    name: string;
    role: string;
    quote: string;
    rating?: number;
    image: Asset;
};

interface VOICES_SECTION {
    items: VOICE_ITEM[];
};

interface CERTIFICATES_SECTION {
    images?: { _key: string; image: Asset }[];
};

interface WORKER {
    _key: string;
    worker: string;
    profession: string;
    experience?: string;
    bio?: string;
    programs?: string[];
    skills?: string[];
    behance_url?: string;
    worker_image: Asset;
    courses?: string[];
};

interface SOCIAL_LINK {
    _key: string;
    _type: string;
    social_link: string;
    social_name: string;
};

interface MAP_LINK {
    _key: string;
    name: string;
    link: string;
    image?: Asset;
};

interface LESSON {
    slug: number | string;
    course_name: string;
};

interface STUDIO_STAT {
    _key: string;
    value: string;
    title: string;
};

interface STUDIO_SLIDE {
    _key: string;
    image: Asset;
};

interface STUDIO_SECTION {
    eyebrow: string;
    line_1: string;
    line_2: string;
    line_3: string;
    line_4: string;
    description: string;
    explore_label?: string;
    portfolio_label?: string;
    stats: STUDIO_STAT[];
    slides: STUDIO_SLIDE[];
};

interface CLIENT_ITEM {
    _key: string;
    name?: string;
};

interface HOME_DETALIS_DESIGN_QUERYResult {
    _id: string;
    main_section: MAIN_SLIDE[];
    studio_section?: STUDIO_SECTION;
    courses_section?: COURSES_SECTION;
    why_section?: WHY_SECTION;
    projects_section?: PROJECTS_SECTION;
    certificates_section?: CERTIFICATES_SECTION;
    voices_section?: VOICES_SECTION;
    courses: HOME_COURSES[];
    workers: WORKER[];
    clients?: CLIENT_ITEM[];
    blog_section?: BLOG_SECTION;
};

interface CONTACT_US_DESIGN_QUERYResult {
    address: string;
    email: string;
    phone_numbers: string[];
    social_links: SOCIAL_LINK[];
    logo?: Asset;
    eyebrow?: string;
    line_1?: string;
    line_2?: string;
    form_title?: string;
    hours?: string;
    brand_line_1?: string;
    brand_line_2?: string;
    tagline?: string;
    map_links?: MAP_LINK[];
};

interface SELECT_OPTIONS_DESIGN_QUERYResult {
    _id: string;
    course_name: LESSON[];
};

type LEGAL_PAGE_SLUG = 'privacy' | 'terms' | 'imprint';

interface LEGAL_SECTION {
    _key: string;
    heading: string;
    body: string;
};

interface ABOUT_PAGE_SECTION {
    _key: string;
    heading: string;
    body: string;
};

interface ABOUT_PAGE_DESIGN_QUERYResult {
    _id: string;
    eyebrow: string;
    line_1: string;
    line_2: string;
    intro: string;
    image?: Asset;
    sections: ABOUT_PAGE_SECTION[];
};

interface LEGAL_PAGE_DESIGN_QUERYResult {
    _id: string;
    page: LEGAL_PAGE_SLUG;
    eyebrow: string;
    line_1: string;
    line_2: string;
    lead: string;
    updated_at?: string;
    sections: LEGAL_SECTION[];
};