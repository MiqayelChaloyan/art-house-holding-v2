const ImagePaths = {
    ART_HOUSE_HOLDING: {
        watchURL: require('../../public/assets/images/art-house/watch.png'),
        logoURL: require('../../public/assets/images/art-house/artHouseLogo.png'),
        flashLightURL: require('../../public/assets/images/art-house/flashLight.png')
    },
    LANGUAGE: {
        manURL: require('../../public/assets/images/language/man.png'),
        womanURL: require('../../public/assets/images/language/woman.png'),
    },
    DESIGN: {
        logoURL: require('../../public/assets/images/design/logo.png'),
        headerLogoURL: require('../../public/assets/images/design/header-logo.png'),
        staplerURL: require('../../public/assets/images/design/stapler.png'),
        enURL: require('../../public/assets/images/design/en.png'),
        amURL: require('../../public/assets/images/design/am.png'),
        ruURL: require('../../public/assets/images/design/ru.png'),
    },
};

const TRAINING_CENTERS = {
    design_school: 48,
    educational_school: 46,
    language_school: 44,
};

const TRAINING_CENTERS_NAMES = [
    { name: 'Design School', id: 48 },
    { name: 'Art House Educational Center', id: 46 },
    { name: 'Art House Language Center', id: 44 },
];

const Titles = {
    ourDay: 'OUR DAY',
    ourTeam: 'OUR TEAM',
    ourPartners: 'OUR PARTNERS',
    courses: 'COURSES',
    portfolios: 'PORTFOLIOS',
    portfolio: 'PORTFOLIO',
    orders: 'ORDERS',
    priceList: 'PRICE LIST',
    promotions: 'PROMOTIONS',
    contactUs: 'CONTACT US',
};

const defaultKeywords = ['it-m', 'courses'];

export {
    ImagePaths,
    TRAINING_CENTERS,
    TRAINING_CENTERS_NAMES,
    Titles,
    defaultKeywords
};