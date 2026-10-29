export interface Content {
    content: TEXT;
    minimumHeight: number;
};

export interface ContentCourseType {
    content: TEXT;
    isReadMore: boolean;
    minimumHeight: number;
};

export interface ContentCourse {
    content: string;
    isReadMore: boolean;
    minimumHeight: number;
};

/* Form types */
export interface Form {
    full_name: string;
    email: string;
    phone: string;
    training_center: number;
    course_name: string;
};

export interface SlideItem {
    url: string;
    subtitle: string;
};

export interface Options {
    top: number;
    left: number;
    bottom: number;
    name: string;
    urlForImageBackground: string;
    urlImageBackgroundAlt: string;
    urlForImage: string;
    urlImageAlt: string;
    result: string;
    rating: string;
};