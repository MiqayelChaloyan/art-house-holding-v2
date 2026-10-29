interface PortableChildren {
    marks: any;
    text: string;
    _key: string;
    _type: string;
};

export interface TEXT {
    children: PortableChildren[];
    markDefs: any;
    style: string;
    _key: string;
    _type: string;
};

export interface Asset {
    _ref: string;
    _type: string;
};

export interface Image {
    asset: Asset;
    _type: string;
    alt: string;
};

export interface Ref {
    _type: string;
    _ref: string;
};

export type ImagePath = {
    src: string;
    width: number;
    height: number;

} | any;

export type ContactUsResponse = { status: number } | { error: string } | any;
export type ResponseType = { status: number } | { error: string } | any;

export interface Site {
    ogTitle: string;
    ogImage: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        }
    },
    ogDescription: string;
    keywords: string[];
};

export interface socialNetwork {
    facebook: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    instagram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    gmail: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    linkedin: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    x: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    tiktok: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    telegram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    youtube: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    pinterest: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    whatsapp: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    viber: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
};

interface ToolbarDisplay {
    left: string[];
    middle: string[];
    right: string[];
};

interface Toolbar {
    display: ToolbarDisplay;
};

interface Images {
    zoom: boolean;
};

export interface Options {
    compact: boolean;
    hideScrollbar: boolean;
    Toolbar: Toolbar;
    Images: Images;
};