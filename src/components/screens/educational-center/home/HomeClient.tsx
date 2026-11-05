'use client'

import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/src/store/modal_reducer';

import Main from './Main';
import About from './About';
import CookingCourses from './CookingCourses';
import News from './News';
import Progress from './Progress';

import HomeSectionFallback from './HomeSectionFallback';


const Specialists = dynamic(() => import('./Specialists'), {
    loading: () => <HomeSectionFallback />,
});

const OurRating = dynamic(() => import('./OurRating'), {
    loading: () => <HomeSectionFallback />,
});


interface Props {
    data: HOME_DETALIS_QUERYResult;
};

const HomeClient = ({ data }: Readonly<Props>) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeModal(false));
    }, [dispatch]);

    return (
        <>
            <Main data={data?.main_section} />
            <About data={data?.about_us} />
            <CookingCourses data={data?.cooking_courses} />
            <News data={data?.section} />
            <Progress data={data?.progress_section} />
            <Specialists data={data?.specialists_section} />
            <OurRating data={data?.our_rating_section} />
        </>
    );
};

export default React.memo(HomeClient);
