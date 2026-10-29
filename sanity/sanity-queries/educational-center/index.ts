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

interface PortableChildren {
    marks: any;
    text: string;
    _key: string;
    _type: string;
};

interface TEXT {
    children: PortableChildren[];
    markDefs: any;
    style: string;
    _key: string;
    _type: string;
};

interface MAIN_SLIDE {
    _key: string;
    image: Asset;
    title: string;
};

interface ABOUT {
    about_us_content: TEXT;
    about_us_image: Asset;
};

interface VIDEO {
    video_url: string;
    video_light: Asset;
    useUpload: boolean;
    videoFile: Asset;
};

interface LESSON {
    _key: string;
    subtitle: string;
    content: string;
    image_one: Asset;
    image_two: Asset;
};

interface SECTON {
    section_title: string;
    lessons: LESSON[];
};

interface PROGRESS {
    _key: string;
    title: string;
    quantity: number;
    isPlusSign: boolean;
};

interface SPECIALIST {
    _key: string;
    title: string;
    course_name: string;
    specialists_section_image: Asset;
    categories: { _ref: string, _type: 'reference' },   
    specialists_section_images: Asset[];
};

interface OUR_RATING {
    _key: string;
    user_name: string;
    user_image: Asset;
    user_feedback: string;
    our_rating_section_image: Asset;
    rating: string;
};

interface SOCIAL_LINK {
    _key: string;
    _type: string;
    social_link: string;
    social_name: string;
};

interface LESSON {
    slug: string | number;
    course_name: string;
};

interface COURSE_MAIN {
    _key: string;
    content: string;
    image: Asset;
    title: string;
};

interface STUDENT_WORK {
    alt: string;
    _key: string;
    asset: Asset;
    _type: string;
};

interface PRICE_LIST {
    _key: string;
    amount: number;
    course_title: string;
    duration: string;
    duration_of_class: number;
};

interface HOME_DETALIS_QUERYResult {
    main_section: MAIN_SLIDE[];
    about_us: ABOUT;
    cooking_courses: VIDEO | any;
    section: SECTON;
    progress_section: PROGRESS[];
    specialists_section: SPECIALIST[];
    our_rating_section: OUR_RATING[];
    blog_section?: BLOG_SECTION;
};

interface COURSES_QUERYResult {
    _id: string;
    course_name: string;
    student_works: STUDENT_WORK[];
    slug:  { current: string } | string | string[] ;
    course_main: COURSE_MAIN[];
    about_us_title: string;
    about_us_content: TEXT;
    course_process: {
        video: VIDEO;
        video_section_title?: string;
    };
    price_list: PRICE_LIST[];
    svg: Asset;
    keywords?: string[];
    ogDescription?: string;
    ogImage?: Asset;
};

interface CONTACT_US_QUERYResult {
    name: string;
    address: string;
    phone_number: string;
    email: string;
    social_links: SOCIAL_LINK[];
};

interface SELECT_OPTIONS_QUERYResult {
    _id: string;
    course_name: LESSON[];
};