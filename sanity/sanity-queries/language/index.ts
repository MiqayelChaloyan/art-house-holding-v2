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

interface Slug {
    current: string;
    _type: string;
};

interface PortableChildren {
    marks: any;
    text: string;
    _key: string;
    _type: string;
};

interface TEACHER {
    _key: string;
    fullName: string;
    teacher_image: Asset;
};

interface VIDEO {
    video_url: string;
    video_light: Asset;
    useUpload: boolean;
    videoFile: Asset;
};

interface TEXT {
    children: PortableChildren[];
    markDefs: any;
    style: string;
    _key: string;
    _type: string;
};

interface COURSE_IMAGES {
    _key: string;
    alt: string;
    asset: Asset;
    _type: string;
};

interface LANGUAGE {
    _id: string;
    course_process: { video: VIDEO };
    during_courses_images: COURSE_IMAGES[];
    image: Asset;
    name: string;
    slug: Slug;
    teachers: TEACHER[];
    text: TEXT[];
    ogImage?: Asset;
    ogDescription?: string;
    keywords?: string[];
};

interface HOME_DETALIS_LANGUAGE_QUERYResult {
    _id: string;
    about_us: {
        content: {
            markDefs: any,
            children: PortableChildren[],
            _type: string;
            style: string;
            _key: string;
        },
        about_us_images: [{
            map: any;
            _type: string;
            alt: string;
            _key: string;
            asset: Asset;
        }],
        about_our_daily: {
            [x: string]: any; video: VIDEO
        }
    };
    our_daily_life: {
        about_our_daily: [{
            news: string;
            languages: Asset;
            video: VIDEO;
        }]
        our_daily_life_images: Asset[];
    };
    blog_section?: BLOG_SECTION;
};

interface ABOUT_LANGUAGE_QUERYResult {
    name: string;
    during_courses_images: Asset[];
    text(text: string): string;
    _id: string;
    image: Asset;
    slug: Slug;
};

interface QUIZ_QUERYResult {
    _id: string;
    name: string;
    slug: string;
    question_logo: Asset;
    questions: {
        question: string;
        slug: string;
        options: string[];
        answer: string;
    }
};

interface DISCOUNTS_LANGUAGE {
    discounts_list: any;
    _key: string;
    slug: string;
    procent: number;
    image: Asset;
    about_discount: string;
};

interface DISCOUNTS_QUERYResult {
    _id: string;
    discounts_list: DISCOUNTS_LANGUAGE[];
};

interface PRICE_LIST {
    _key: string;
    teaching_language: string;
    group_lessons: string | number;
    private_lessons: {
        three_week: string | number;
        two_week: string | number;
    },
};

interface ENGLISH_COURSE {
    _key: string;
    language_type: string;
    duration: string;
    private_lessons: string | number;
};

interface PRIVATE_LESSONS {
    _key: string;
    teaching_language: string
    private_lessons: {
        three_week: string | number;
        two_week: string | number;
    };
};

interface PRICE_LIST_LANGUAGE_QUERYResult {
    _id: string;
    price_list: PRICE_LIST[];
    private_lessons: PRIVATE_LESSONS[];
    english_courses: ENGLISH_COURSE[];
};

interface SELECT_OPTIONS_LANGUAGE_QUERYResult {
    course_name: string;
    slug: string | number;
};

interface COURSE_TYPE {
    course_type: string;
    slug: string | number;
};

interface WEEK_NUMBER_LESSONS {
    week_number_of_lessons: string;
    slug: string | number;
};

interface COURSES {
    course_name: SELECT_OPTIONS_LANGUAGE_QUERYResult[];
};

interface FORM {
    _id: string;
    course_name: SELECT_OPTIONS_LANGUAGE_QUERYResult[];
    course_type: COURSE_TYPE[];
    week_number_of_lessons: WEEK_NUMBER_LESSONS[];
};

interface SOCIAL_LINK {
    _key: string;
    _type: string;
    social_link: string;
    social_name: string;
};

interface CONTACT_US_LANGUAGE_QUERYResult {
    name: string;
    address: string;
    phone_number: string;
    social_links: SOCIAL_LINK[];
};
