import { Navigation, Autoplay, EffectCreative } from 'swiper/modules';

export const swiperOptions = {
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
        prev: {
            shadow: false,
            translate: ['-120%', 0, -500],
        },
        next: {
            shadow: false,
            translate: ['120%', 0, -500],
        },
    },
    modules: [Navigation, Autoplay, EffectCreative],
    loop: true,
    speed: 1000,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
};