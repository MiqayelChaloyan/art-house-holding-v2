'use client'

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/src/store/modal_reducer';

import Main from './Main';
import About from './About';
import CookingCourses from './CookingCourses';
import News from './News';
import Progress from './Progress';
import Specialists from './Specialists';
import OurRating from './OurRating';


interface Props {
    data: HOME_DETALIS_QUERYResult;
};

const EducationalCenterHome = ({ data }: Readonly<Props>) => {
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
    )
}

export default React.memo(EducationalCenterHome);