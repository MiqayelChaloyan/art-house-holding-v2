// 'use client';

// import React, { useEffect, useRef, useState } from 'react';

// import { useTranslations } from 'next-intl';

// import {  StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';

// import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

// import Pagination from './Pagination';
// import Card from './Card';

// import RotatingLines from '@/src/lib/ui/rotatingLines';
// import { Arial } from '@/src/constants/font';
// import { Titles } from '@/src/constants';

// import cn from 'classnames';

// import styles from './styles.module.sass';


// interface Props {
//     data: WORKER[];
// };

// interface CarouselRefType {
//     swipeTo: (index: number) => void;
//     goBack: () => void;
//     goNext: (steps?: number) => void;
// };

// const OurTeam = ({ data }: Readonly<Props>) => {
//     const [initSlides, setInitSlides] = useState<boolean>(false);
//     const t = useTranslations('sections');
//     const ref = useRef<CarouselRefType | any | null>(null);

//     useEffect(() => {
//         setInitSlides(true);
//     }, []);

//     const [centerSlideDataIndex, setCenterSlideDataIndex] = useState(0);
//     const onCenterSlideDataIndexChange = (newIndex: number) => {
//         setCenterSlideDataIndex(newIndex);
//     };

//     const updatePosition = (index: number) => {
//         ref?.current?.swipeTo(index - centerSlideDataIndex);
//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.titles}>
//                 <div>
//                     <div className={cn(styles['title-line'], styles['back-line'])} />
//                     <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.ourTeam}</h2>
//                 </div>
//                 <div className={styles['bottom-title']}>
//                     <h1 className={cn(styles.title, Arial.className)}>{t('our-team')}</h1>
//                     <div className={cn(styles['title-line'], styles['bottom-line'])} />
//                 </div>
//             </div>
//             {initSlides ? (
//                 <div className={styles['our-team-container']}>
//                     <ResponsiveContainer
//                         carouselRef={ref}
//                         render={(parentWidth, carouselRef) => {
//                             let currentVisibleSlide = 5;
//                             if (parentWidth <= 1440) currentVisibleSlide = 5;
//                             if (parentWidth <= 1280) currentVisibleSlide = 3;

//                             return (
//                                 <StackedCarousel
//                                     ref={carouselRef}
//                                     slideComponent={Card}
//                                     slideWidth={parentWidth > 1500 ? 740 : 300}
//                                     carouselWidth={parentWidth}
//                                     data={data}
//                                     currentVisibleSlide={currentVisibleSlide}
//                                     maxVisibleSlide={5}
//                                     onActiveSlideChange={onCenterSlideDataIndexChange}
//                                     useGrabCursor
//                                     fadeDistance={0.3}
//                                     swipeSpeed={0.1}
//                                 />
//                             );
//                         }}
//                     />
//                     <>
//                         <div
//                             style={{ left: 10 }}
//                             className={styles['arrow-button-prev']}
//                             onClick={() => {
//                                 ref.current?.goBack();
//                             }}
//                         >
//                             <RiArrowLeftSLine size={34} />
//                         </div>
//                         <div
//                             style={{ right: 10 }}
//                             className={styles['arrow-button-next']}
//                             onClick={() => {
//                                 ref.current?.goNext(6);
//                             }}
//                         >
//                             <RiArrowRightSLine size={34} />
//                         </div>
//                     </>
//                     <Pagination
//                         updatePosition={updatePosition}
//                         centerSlideDataIndex={centerSlideDataIndex}
//                         data={data}
//                     />
//                 </div>
//             ) : (
//                 <div className={styles.loader}>
//                     <RotatingLines />
//                 </div>
//             )}
//         </div>
//     )
// };

// export default React.memo(OurTeam);




'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import {  StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';

import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import Pagination from './Pagination';
import Card from './Card';

import RotatingLines from '@/src/lib/ui/rotatingLines';
import { Arial } from '@/src/constants/font';
import { Titles } from '@/src/constants';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: WORKER[];
};

interface CarouselRefType {
    swipeTo: (index: number) => void;
    goBack: () => void;
    goNext: (steps?: number) => void;
};

const OurTeam = ({ data }: Readonly<Props>) => {
    const [initSlides, setInitSlides] = useState<boolean>(false);
    const t = useTranslations('sections');
    const ref = useRef<CarouselRefType | any | null>(null);

    useEffect(() => {
        setInitSlides(true);
    }, []);

    const [centerSlideDataIndex, setCenterSlideDataIndex] = useState(0);
    const onCenterSlideDataIndexChange = (newIndex: number) => {
        setCenterSlideDataIndex(newIndex);
    };

    const updatePosition = (index: number) => {
        ref?.current?.swipeTo(index - centerSlideDataIndex);
    };

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <div>
                    <div className={cn(styles['title-line'], styles['back-line'])} />
                    <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.ourTeam}</h2>
                </div>
                <div className={styles['bottom-title']}>
                    <h1 className={cn(styles.title, Arial.className)}>{t('our-team')}</h1>
                    <div className={cn(styles['title-line'], styles['bottom-line'])} />
                </div>
            </div>
            {initSlides ? (
                <div className={styles['our-team-container']}>
                    <ResponsiveContainer
                        carouselRef={ref}
                        render={(parentWidth, carouselRef) => {
                            // let currentVisibleSlide = 5;
                            // if (parentWidth <= 1440) currentVisibleSlide = 5;
                            // if (parentWidth <= 1280) currentVisibleSlide = 3;

                            return (
                                <StackedCarousel
                                    ref={carouselRef}
                                    slideComponent={Card}
                                    slideWidth={parentWidth > 1500 ? 740 : 300}
                                    carouselWidth={parentWidth}
                                    data={data}
                                    // currentVisibleSlide={currentVisibleSlide}
                                    maxVisibleSlide={5}
                                    onActiveSlideChange={onCenterSlideDataIndexChange}
                                    useGrabCursor
                                    fadeDistance={0.3}
                                    swipeSpeed={0.1}
                                />
                            );
                        }}
                    />
                    <>
                        <div
                            style={{ left: 10 }}
                            className={styles['arrow-button-prev']}
                            onClick={() => {
                                ref.current?.goBack();
                            }}
                        >
                            <RiArrowLeftSLine size={34} />
                        </div>
                        <div
                            style={{ right: 10 }}
                            className={styles['arrow-button-next']}
                            onClick={() => {
                                ref.current?.goNext(6);
                            }}
                        >
                            <RiArrowRightSLine size={34} />
                        </div>
                    </>
                    <Pagination
                        updatePosition={updatePosition}
                        centerSlideDataIndex={centerSlideDataIndex}
                        data={data}
                    />
                </div>
            ) : (
                <div className={styles.loader}>
                    <RotatingLines />
                </div>
            )}
        </div>
    )
};

export default React.memo(OurTeam);
