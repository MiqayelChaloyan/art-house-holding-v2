import { Navigation } from 'swiper/modules';
import { SwiperType } from '@/src/types/art-house';

export const VISIBLE_DOTS = 3;

export const options: SwiperType = {
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    autoHeight: true,
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    modules: [Navigation],
};
