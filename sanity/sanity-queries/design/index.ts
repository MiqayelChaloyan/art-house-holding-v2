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

interface HOME_COURSES {
    _key: string;
    name: string;
    title: string;
    course_name: string;
    about_course: string;
    gallery_of_course: GALLERY[];
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

interface WORKER {
    _key: string;
    worker: string;
    profession: string;
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

interface HOME_DETALIS_DESIGN_QUERYResult {
    _id: string;
    main_section: MAIN_SLIDE[];
    courses: HOME_COURSES[];
    progress_section: PROGRESS[];
    our_day: OUR_DAY;
    workers: WORKER[];
    blog_section?: BLOG_SECTION;
};

interface CONTACT_US_DESIGN_QUERYResult {
    name: string;
    address: string;
    email: string;
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