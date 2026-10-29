'use client'

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Partner from './Partner';

import { Arial } from '@/src/constants/font';
import { Titles } from '@/src/constants';

import ArrowLeft from '@/src/lib/icons/language/ArrowLeft';
import ArrowRight from '@/src/lib/icons/language/ArrowRight';

import useWindowSize from '@/src/hooks/useWindowSize';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PARTNER_Result[];
};

interface SampleArrowProps {
    onClick?: () => void;
    fill: string;
};

const SampleNextArrow = ({ onClick, fill }: SampleArrowProps) => (
    <div className={cn(styles.arrow, styles.arrow_right)} onClick={onClick}>
        <ArrowRight width='18' height='50' fill={fill} />
    </div>
);

const SamplePrevArrow = ({ onClick, fill }: SampleArrowProps) => (
    <div className={cn(styles.arrow, styles.arrow_left)} onClick={onClick}>
        <ArrowLeft width='18' height='50' fill={fill} />
    </div>
);
const Partners = ({ data }: Readonly<Props>) => {
    const [fill, setFill] = useState<string>(colors.brown);
    const t = useTranslations('sections');
    const windowSize = useWindowSize();

    const slidesItems: JSX.Element[] = data?.map((partner: PARTNER_Result) =>
        <Partner
            key={partner._id}
            _id={partner._id}
            company_name={partner.company_name}
            cooperation={partner.cooperation}
            implemented_projects={partner.implemented_projects}
            logo={partner.logo}
        />
    );

    useEffect(() => {
        setFill(windowSize.width <= 1024 ? colors.white : colors.brown)
    }, [windowSize.width]);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 9,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
        cssEase: 'linear',
        nextArrow: <SampleNextArrow fill={fill} />,
        prevArrow: <SamplePrevArrow fill={fill} />,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ],
    };

    return (
        <section id='partners' className={styles.section}>
            <div className={styles.titles}>
                <div>
                    <div className={cn(styles['title-line'], styles['back-line'])} />
                    <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.ourPartners}</h2>
                </div>
                <div className={styles['bottom-title']}>
                    <h1 className={cn(styles.title, Arial.className)}>{t('our-partners')}</h1>
                    <div className={cn(styles['title-line'], styles['bottom-line'])} />
                </div>
            </div>
            <div className={styles.slider}>
                <Slider {...settings}>
                    {slidesItems}
                </Slider>
            </div>
        </section>
    );
};

export default React.memo(Partners);
