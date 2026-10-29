'use client'

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';

import Rating from './Ratings';
import MobileCards from './MobileCards';

import { Inter } from '@/src/constants/font';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: OUR_RATING[];
};

const OurRating = ({ data }: Readonly<Props>) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const t = useTranslations('sections');

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        centerMode: true,
        cssEase: 'ease-out',
        arrows: false,
        beforeChange: (_: unknown, next: number) => setSlideIndex(next),
    };

    return (
        <section id='our-rating' className={styles.container}>
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('rating')}
                </h1>
                <div className={styles.feedbacks}>
                    <div className={styles.row}>
                        <Rating data={data} />
                    </div>
                </div>
                <div className={styles.mobile_cards}>
                    <Slider {...settings} className={styles.slider}>
                        {MobileCards(data, slideIndex)}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(OurRating);