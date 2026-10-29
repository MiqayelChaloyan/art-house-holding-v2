interface AssetRef {
    _type: string;
    _ref: string;
};

interface Asset {
    _type: string;
    alt: string;
    asset: AssetRef;
};

interface PARTNER_Result {
    _id: string;
    company_name: string;
    cooperation: string;
    implemented_projects: string;
    logo: Asset;
};