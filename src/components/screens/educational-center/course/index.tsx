'use client'

import React, { useEffect } from 'react';

import About from './About';
import CourseProcess from './CourseProcess';
import StudentWork from './StudentWork';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/src/store/modal_reducer';

import PriceList from './PriceList';
import Main from './Main';


interface Props {
    course: COURSES_QUERYResult;
    socialData: CONTACT_US_QUERYResult;
    lessons: SELECT_OPTIONS_QUERYResult;
    lessonsArmenian: SELECT_OPTIONS_QUERYResult;
};

const Course = ({
    course,
    socialData,
    lessons,
    lessonsArmenian
}: Readonly<Props>) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(closeModal(false)), 1);
    }, [course, dispatch]);

    return (
        <>
            <Main course={course?.course_main} />
            <About
                course={course}
                socialData={socialData}
                lessons={lessons?.course_name}
                lessonsArmenian={lessonsArmenian?.course_name}
            />
            <CourseProcess course={course?.course_process} />
            <StudentWork course={course?.student_works} />
            <PriceList price_list={course?.price_list} />
        </>
    );
};

export default React.memo(Course);