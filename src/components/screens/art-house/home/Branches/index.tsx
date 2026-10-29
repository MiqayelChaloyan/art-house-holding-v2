'use client';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { options } from './options';

import Container from '@/src/components/components/container';

import Branch from '@/src/lib/ui/branch';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import styles from './styles.module.sass';


interface Props {
    data: BRANCH[];
};

const Branches = ({ data }: Readonly<Props>) => {
    const cards: JSX.Element[] =
        data?.map((item: BRANCH) =>
            <Branch key={item._key} item={item} />);

    const result: JSX.Element[] =
        cards?.map((card: JSX.Element) => (
            <SwiperSlide key={card.key}>
                {card}
            </SwiperSlide>
        ));

    return (
        <section id='branches' className={styles.section}>
            <Container className='container'>
                <div className={styles.cards}>
                    {cards}
                </div>
                <div className={styles.slider}>
                    <Swiper {...options}>
                        {result}
                    </Swiper>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Branches);