import { EffectCreative, Pagination } from 'swiper/modules';

interface Style {
    [key: string]: string,
};

const style: Style = {
    '--swiper-pagination-color': '#F9CC48',
    '--swiper-pagination-bullet-inactive-color': "#006ED2",
    '--swiper-pagination-bullet-inactive-opacity': '1',
    '--swiper-pagination-bullet-size': '10px',
    '--swiper-pagination-bullet-horizontal-gap': '5px'
};

const settings = {
    grabCursor: true,
    effect: 'creative',
    style: style,
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            translate: ['100%', 0, 0],
        },
    },
    pagination: {
        clickable: true,
    },
    modules: [EffectCreative, Pagination]
};

export default settings;