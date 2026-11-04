export interface SlideItem {
    url: string;
    company_name: string;
    title: string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
};

export interface AssetRef {
    _ref: string,
    _type: string,
}

export interface Gallery {
    _type: string,
    alt: string,
    _key: string,
    asset: AssetRef
}
