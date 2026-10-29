interface Asset {
    alt: string;
    _ref: string;
    _type: string;
};

interface Image {
    asset: Asset;
    _type: string;
    alt: string;
};

interface Ref {
    _type: string;
    _ref: string;
};

export interface ImageType {
    _type: string;
    alt: string;
    _key: string;
    asset: Asset;
};

export interface PARTNER {
    cooperation: string;
    implemented_projects: string;
    _id: string;
    slug: string;
    logo: Image;
    company_name: string;
};

export interface DAILY_LIFE_VIDEO {
    _key: string,
    video: Video,
    news: string,
    languages: Ref,
};

export interface Video {
    video_url: string;
    video_light: Asset;
    useUpload: boolean;
    videoFile: Asset;
    alt: string;
};

export interface VIDEO {
    video: Video;
    _key: string;
    _type: string;
};

export interface DAILY_LIFE_IMAGE {
    _key: string;
    asset: Asset;
    slug: Slug;
    _type: string;
    alt: string;
};

export interface LANGUAGE {
    path: Image;
    page: string;
};

export interface ABOUT {
    image: Image;
    text: Text[];
};

export interface ImageType {
    asset: Asset;
    _type: string;
    _key: string;
    alt: string;
};

export interface Quiz {
    _id: string;
    name: string;
    question_logo: Image;
    slug: string;
    questions: Question[];
};

interface Question {
    question: string;
    slug: string;
    options: string[];
    answer: string;
};

interface Text {
    markDefs: any[];
    children: Child[];
    _type: string;
    style: string;
    _key: string;
};

interface Child {
    _type: string;
    marks: any[];
    text: string;
    _key: string;
};

interface Slug {
    current: string;
    _type: string;
};

/* REDUX STATE TYPES */
export interface ReduxType {
    questions: Questions;
    modal: Modal;
    player: Player;
    loader: Loader;
};

interface Loader {
    isLoader: boolean;
};

interface Player {
    isPlay: boolean;
    path: string;
};

interface Modal {
    isOpen: boolean;
};

interface Questions {
    quiz: any[];
    trace: number;
    score: number;
    answer: any[];
    isLoading: boolean;
    isViewAnswer: boolean;
};

/* Form types */
export interface FormLarge {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    training_center: number;
    course_name: string;
    week_number_of_lessons: string;
    course_type: string;
};

export interface FormSmall {
    full_name: string;
    email: string;
    phone: string;
    course_name: string;
};

export interface socialNetwork {
    gmail: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    instagram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    facebook: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
};
