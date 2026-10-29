'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';

import { useTranslations } from 'next-intl';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import Testimonial from './Testimonial';
import { options, VISIBLE_DOTS } from './options';

import { ArianAMU } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  our_rating: OUR_RATING[];
};

const Testimonials = ({ our_rating }: Readonly<Props>) => {
  const t = useTranslations('sections');
  const b = useTranslations('buttons');

  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = our_rating?.length ?? 0;
  const hasControls = total > 1;

  const dotCount = Math.min(total, VISIBLE_DOTS);
  const firstDot = Math.min(
    Math.max(activeIndex - Math.floor(dotCount / 2), 0),
    Math.max(total - dotCount, 0),
  );

  return (
    <section className={styles.testimonials}>
      <h2 className={cn(styles.title, ArianAMU.className)}>
        {t('rating')}
      </h2>
      <div className={styles.testimonial}>
        <Swiper
          {...options}
          onSwiper={setSwiper}
          onSlideChange={(instance: SwiperInstance) => setActiveIndex(instance.realIndex)}
        >
          {our_rating?.map((review: OUR_RATING) => (
            <SwiperSlide key={review?._key}>
              <Testimonial review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
        {hasControls && (
          <>
            <button
              type='button'
              aria-label={b('next')}
              className={cn('swiper-button-next', styles['nav-btn'])}
            >
              <MdKeyboardArrowRight size={24} />
            </button>
            <button
              type='button'
              aria-label={b('back')}
              className={cn('swiper-button-prev', styles['nav-btn'])}
            >
              <MdKeyboardArrowLeft size={24} />
            </button>
            <div className={styles.dots}>
              {Array.from({ length: dotCount }, (_, offset) => {
                const index = firstDot + offset;

                return (
                  <button
                    key={index}
                    type='button'
                    aria-label={`${index + 1} / ${total}`}
                    aria-current={index === activeIndex}
                    className={cn(styles.dot, { [styles.active]: index === activeIndex })}
                    onClick={() => swiper?.slideToLoop(index)}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
