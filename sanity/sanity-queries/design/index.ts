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

interface PROGRESS {
    _key: string;
    title: string;
    quantity: number;
    isPlusSign: boolean;
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

interface PRICES {
    _key: string;
    course: string;
    group_lessons: number;
    personal_lessons: number;
    duration: string;
    hours_lessons: string;
};

interface PRICE_LIST_DESIGN_QUERYResult {
    _id: string;
    informatie: string;
    our_advantages: string[];
    price_list: PRICES[];
};

interface PORTFOLIOS {
    _id: string;
    image: Asset;
};

interface COURSES_DESIGN_QUERYResult {
    _id: string;
    _key?: string;
    slug: string;
    course_name?: string;
    name: string;
    conditions: string[];
    guides: string[];
    gallery_of_course: GALLERY[];
    portfolios: PORTFOLIO[];
    orders: ORDER[];
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
    eyebrow: string;
    line_1: string;
    line_2: string;
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

interface OUR_DAY {
    video: {
        video_url: string;
        video_light: Asset;
        useUpload: boolean;
        videoFile: Asset;
    }
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
    eyebrow: string;
    line_1: string;
    line_2: string;
    description: string;
    projects: PROJECT_ITEM[];
};

interface STAFF_SECTION {
    line_1: string;
    line_2: string;
    line_3: string;
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
    eyebrow: string;
    line_1: string;
    line_2: string;
    items: VOICE_ITEM[];
};

interface CERTIFICATES_SECTION {
    line_1: string;
    line_2: string;
    line_3: string;
    certificate?: Asset;
    diploma?: Asset;
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
};

interface SOCIAL_LINK {
    _key: string;
    _type: string;
    social_link: string;
    social_name: string;
};

interface LESSON {
    slug: number | string;
    course_name: string;
};

interface ORDER_Result {
    slug: string;
    order_name: string;
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
    stats: STUDIO_STAT[];
    slides: STUDIO_SLIDE[];
};

interface CLIENT_ITEM {
    _key: string;
    name?: string;
    logo: Asset;
};

interface HOME_DETALIS_DESIGN_QUERYResult {
    _id: string;
    main_section: MAIN_SLIDE[];
    studio_section?: STUDIO_SECTION;
    courses_section?: COURSES_SECTION;
    why_section?: WHY_SECTION;
    projects_section?: PROJECTS_SECTION;
    staff_section?: STAFF_SECTION;
    certificates_section?: CERTIFICATES_SECTION;
    voices_section?: VOICES_SECTION;
    courses: HOME_COURSES[];
    progress_section: PROGRESS[];
    our_day: OUR_DAY;
    workers: WORKER[];
    clients?: CLIENT_ITEM[];
    blog_section?: BLOG_SECTION;
};

interface CONTACT_US_DESIGN_QUERYResult {
    name: string;
    address: string;
    email: string;
    hours?: string;
    phone_numbers: string[];
    social_links: SOCIAL_LINK[];
};

interface SELECT_OPTIONS_DESIGN_QUERYResult {
    _id: string;
    course_name: LESSON[];
    order_name: ORDER[];
};

interface COURSE {
    _id: string;
    name: string;
    slug: string;
    course_name: string;
    hours_lessons: string;
    _key: string | any;
    group_lessons: number;
    personal_lessons: number;
    course: string;
    duration: string;
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