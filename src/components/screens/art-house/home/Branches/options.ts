import { EffectCoverflow, Pagination } from 'swiper/modules';
import { SwiperTypes } from '@/src/types/art-house';

import './styles.css';

export const options: SwiperTypes = {
    effect: 'coverflow',
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: true,
    modules: [EffectCoverflow, Pagination],
    className: 'mySwiper',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    }
};