interface AssetRef {
    _type: string;
    _ref: string;
};

interface Asset {
    _type: string;
    alt: string;
    asset: AssetRef;
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

interface BRANCH {
    _key: string;
    company_name: string;
    words: string;
    website_logo_front: Asset;
    website_logo_back: Asset;
    web_site_url: string;
};

interface PROGRESS {
    _key: string;
    title: string;
    quantity: number;
    isPlusSign: boolean;
};

interface HOME_DETALIS_QUERYResult {
    our_websites: BRANCH[];
    progress_section: PROGRESS[];
};

interface SOCIAL_LINK {
    _key: string;
    _type: string;
    social_link: string;
    social_name: string;
};

interface SOCIAL_QUERYResult {
    address: string;
    phone_numbers: string[];
    social_links: SOCIAL_LINK[];
};

interface ABOUT_US {
    about_us_content: TEXT;
    image: Asset;
};

interface OUR_RATING {
    _key: string;
    user_name: string;
    user_image: Asset;
    user_feedback: string;
};

interface ABOUT_US_DETAILS_Result {
    about_us_section: ABOUT_US;
    our_rating: OUR_RATING[];
};